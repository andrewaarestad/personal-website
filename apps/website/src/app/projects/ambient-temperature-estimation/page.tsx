import type { Metadata } from "next";
import {
  PostLayout,
  H1Section,
  H2Section,
  TextSection,
  ImageSection,
} from "@/components/post-layout";
import { GitHubButton } from "@/components/ui/github-button";

export const metadata: Metadata = {
  title: "Ambient Temperature Estimation - Andrew Aarestad",
  description:
    "A physics-based thermal estimator that recovers ambient temperature from device temperature alone, calibrated in Python and deployed in C++ to edge devices.",
};

const REPO_URL = "https://github.com/parameter-estimation/ambient-temperature-estimation";

export default function AmbientTemperatureEstimationPage() {
  return (
    <PostLayout>
      {[
        <div key="title" className="mb-8">
          <H1Section text="Ambient Temperature Estimation" />
        </div>,

        <TextSection
          key="intro"
          text={`A collaboration with Ben Jordan on a small but
            stubborn problem: many embedded devices need to know
            the ambient temperature around them, but the only
            thermistor they have on board reads the device's own
            temperature — which, because the device is running,
            is not the same thing. We built a physics-based
            estimator that recovers ambient temperature from
            device temperature alone, calibrated in Python
            against logged traces and deployed in portable C++
            to the target.`}
        />,

        <div key="github-top" className="text-center">
          <GitHubButton text="View on GitHub" url={REPO_URL} />
        </div>,

        <H2Section key="problem-heading" text="The Problem" />,

        <TextSection
          key="problem"
          text={`Any active device dissipates some amount of
            power as heat, so its internal temperature sits
            above ambient by an amount that depends on the
            device's thermal coupling to its environment and how
            hard it's working. For applications that need
            ambient — compensation for another sensor,
            environmental telemetry, a control loop on a heater
            or cooler — that offset is exactly the signal you'd
            like to subtract out, but you can't measure it
            directly on-target without adding a second,
            thermally isolated sensor.

            The constraint that shaped the design is that
            calibration data is cheap to collect in the lab,
            where you can instrument both the device and the
            chamber, but on the deployed device you only ever
            see one channel. So the model has to be fittable
            against paired device-and-ambient traces and
            runnable, with those fit parameters frozen, against
            device temperature alone.`}
        />,

        <H2Section key="model-heading" text="The Model" />,

        <TextSection key="model-intro">
          <p className="text-body-lg text-text-secondary leading-relaxed">
            We use a single-state lumped thermal model — the device is treated as one thermal mass
            coupled to ambient through a single heat-transfer coefficient <em>h</em>, with a
            constant input term <em>q</em> that absorbs steady-state self-heating:
          </p>
          <pre className="my-6 overflow-x-auto rounded-md bg-surface border border-border-light p-4 text-body text-text-primary font-mono">
            {"dT_dev/dt = h · (T_amb − T_dev) + q"}
          </pre>
          <p className="text-body-lg text-text-secondary leading-relaxed">
            That's it for the physics. <em>h</em> has units of inverse time and sets how quickly the
            device equilibrates with ambient; <em>q</em> has units of temperature over time and
            captures the heat the device is adding to itself. Both are device-specific but, for a
            given device geometry and duty cycle, roughly stationary — which is what makes the
            calibrate-once approach work.
          </p>
          <p className="text-body-lg text-text-secondary leading-relaxed">
            The optimizer has two modes. In <em>train</em> mode it fits <em>h</em>, <em>q</em>, and
            the initial device temperature against a paired device-and-ambient trace. In{" "}
            <em>predict</em> mode <em>h</em> and <em>q</em> are fixed from a prior fit, and the
            optimizer recovers the ambient trajectory from a device-temperature time series alone.
            The closed-form solution is derived symbolically in a SymPy notebook in the repo, which
            is what makes the predict-mode inversion tractable.
          </p>
        </TextSection>,

        <H2Section key="approach-heading" text="The Approach" />,

        <TextSection
          key="approach"
          text={`The numerical core is C++17. ODE integration is
            handled by Boost.Odeint's adaptive Runge–Kutta
            Dormand–Prince 5 stepper, which gives us
            error-controlled steps over calibration traces that
            mix fast device transients with slow ambient drift
            without us having to pick a fixed step size.
            Parameter fitting uses NLopt's Nelder–Mead simplex
            with a relative tolerance of 1e-8. Nelder–Mead is
            derivative-free, which matters here: the objective is
            the RMSE of an ODE solve, and while the closed-form
            solution makes an analytic gradient possible in
            principle, the simplex converges fast enough on a
            problem this small that the Jacobian machinery isn't
            worth its weight.

            The lab-side binding is a CPython extension built
            directly against Python.h and the NumPy C-API — no
            pybind11, no Cython — that compiles the same C++
            sources used on-target into a shared library
            loadable from a notebook. Calibration runs in
            Jupyter against logged CSVs; the resulting
            coefficients are handed to the embedded build, which
            calls the identical C++ optimizer in predict mode on
            the device.`}
        />,

        <ImageSection
          key="calibration-image"
          imageUrl="/img/ambient_calibration.png"
          alt="Out-of-sample prediction on a real logged trace: device temperature in blue, measured ambient in orange, and the model's recovered ambient temperature in green tracking the orange curve closely."
        />,

        <TextSection
          key="result-caption"
          text={`Out-of-sample run on a real logged trace: the
            model recovers ambient temperature (green) from the
            device temperature alone (blue), validated against
            the measured ambient (orange) that the predictor
            never sees.`}
        />,

        <H2Section key="design-heading" text="On the lab/edge split" />,

        <TextSection
          key="design"
          text={`The piece that took the longest to get right
            wasn't the model — it was the boundary between
            calibration and inference. The usual failure mode in
            this kind of project is a Python prototype that fits
            beautifully in a notebook and then has to be
            translated into firmware, where the rewrite quietly
            introduces a sign error or an off-by-one in the
            integrator that no one notices until the device is
            in the field. Compiling the same C++ optimizer into
            both the Python extension and the embedded build
            removes the translation step entirely; the only
            thing that crosses the boundary is two floating-point
            numbers.

            A black-box regressor could probably match the
            in-distribution accuracy here, but it would need
            retraining for every new device geometry and a way
            to ship those weights to the target. A two-parameter
            physical model just needs a fresh fit. The trade-off
            is that the lumped single-state assumption breaks
            down for devices with multiple thermal masses on
            meaningfully different time constants — a heatsinked
            board with a separate display module, for instance —
            and there the right answer is more states, not a
            different optimizer.`}
        />,

        <div key="github-bottom" className="text-center">
          <GitHubButton text="View on GitHub" url={REPO_URL} />
        </div>,
      ]}
    </PostLayout>
  );
}
