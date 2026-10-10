/** Quadratic ease-out, matching TWEEN.Easing.Quadratic.Out used by the original. */
export const easeOutQuad = (t: number) => t * (2 - t);

interface ActiveTween {
  from: number;
  to: number;
  duration: number;
  start: number | null;
  onUpdate: (value: number) => void;
  resolve: () => void;
}

/**
 * Minimal tween runner (replaces @tweenjs/tween.js). It owns no animation loop of its
 * own: the caller drives it from an existing requestAnimationFrame loop via `update()`,
 * so cancelling that loop stops every tween too.
 */
export class TweenRunner {
  private tweens = new Set<ActiveTween>();

  /** Animate a number from `from` to `to`; resolves when finished (or cancelled). */
  run(from: number, to: number, durationMs: number, onUpdate: (value: number) => void) {
    return new Promise<void>((resolve) => {
      if (durationMs <= 0 || from === to) {
        onUpdate(to);
        resolve();
        return;
      }
      this.tweens.add({ from, to, duration: durationMs, start: null, onUpdate, resolve });
    });
  }

  update(now: number) {
    for (const tween of this.tweens) {
      if (tween.start === null) tween.start = now;
      const t = Math.min(1, (now - tween.start) / tween.duration);
      tween.onUpdate(tween.from + (tween.to - tween.from) * easeOutQuad(t));
      if (t >= 1) {
        this.tweens.delete(tween);
        tween.resolve();
      }
    }
  }

  /** Resolve every pending tween without running its remaining frames. */
  cancelAll() {
    for (const tween of this.tweens) tween.resolve();
    this.tweens.clear();
  }
}
