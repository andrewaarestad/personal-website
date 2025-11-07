import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HomepageContactInfo } from "../homepage-contact-info";

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("HomepageContactInfo", () => {
  let observeMock: ReturnType<typeof vi.fn>;
  let unobserveMock: ReturnType<typeof vi.fn>;
  let intersectionObserverMock: any;

  beforeEach(() => {
    // Mock IntersectionObserver
    observeMock = vi.fn();
    unobserveMock = vi.fn();

    intersectionObserverMock = vi.fn(function (
      this: any,
      callback: IntersectionObserverCallback,
      options?: IntersectionObserverInit
    ) {
      this.observe = observeMock;
      this.unobserve = unobserveMock;
      this.disconnect = vi.fn();

      // Store callback for potential testing
      this.callback = callback;
      this.options = options;
    });

    global.IntersectionObserver =
      intersectionObserverMock as any as typeof IntersectionObserver;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Component structure", () => {
    it("renders as a semantic section element", () => {
      const { container } = render(<HomepageContactInfo />);

      const section = container.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("renders section heading", () => {
      render(<HomepageContactInfo />);

      const heading = screen.getByRole("heading", { name: /get in touch/i });
      expect(heading).toBeInTheDocument();
    });
  });

  describe("Contact links", () => {
    it("renders exactly 4 contact links", () => {
      render(<HomepageContactInfo />);

      // Find all links
      const links = screen.getAllByRole("link");
      expect(links).toHaveLength(4);
    });

    it("renders GitHub link", () => {
      render(<HomepageContactInfo />);

      const githubLink = screen.getByRole("link", { name: /github/i });
      expect(githubLink).toBeInTheDocument();
    });

    it("renders LinkedIn link", () => {
      render(<HomepageContactInfo />);

      const linkedinLink = screen.getByRole("link", { name: /linkedin/i });
      expect(linkedinLink).toBeInTheDocument();
    });

    it("renders Medium link", () => {
      render(<HomepageContactInfo />);

      const mediumLink = screen.getByRole("link", { name: /medium/i });
      expect(mediumLink).toBeInTheDocument();
    });

    it("renders Email link", () => {
      render(<HomepageContactInfo />);

      const emailLink = screen.getByRole("link", { name: /email/i });
      expect(emailLink).toBeInTheDocument();
    });
  });

  describe("Link attributes for external links", () => {
    it("GitHub link has target='_blank' attribute", () => {
      render(<HomepageContactInfo />);

      const githubLink = screen.getByRole("link", {
        name: /github/i,
      }) as HTMLAnchorElement;
      expect(githubLink).toHaveAttribute("target", "_blank");
    });

    it("GitHub link has rel='noopener noreferrer' attribute", () => {
      render(<HomepageContactInfo />);

      const githubLink = screen.getByRole("link", {
        name: /github/i,
      }) as HTMLAnchorElement;
      expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("LinkedIn link has target='_blank' attribute", () => {
      render(<HomepageContactInfo />);

      const linkedinLink = screen.getByRole("link", {
        name: /linkedin/i,
      }) as HTMLAnchorElement;
      expect(linkedinLink).toHaveAttribute("target", "_blank");
    });

    it("Medium link has target='_blank' attribute", () => {
      render(<HomepageContactInfo />);

      const mediumLink = screen.getByRole("link", {
        name: /medium/i,
      }) as HTMLAnchorElement;
      expect(mediumLink).toHaveAttribute("target", "_blank");
    });

    it("Email link does NOT have target='_blank' attribute", () => {
      render(<HomepageContactInfo />);

      const emailLink = screen.getByRole("link", {
        name: /email/i,
      }) as HTMLAnchorElement;
      expect(emailLink).not.toHaveAttribute("target", "_blank");
    });

    it("Email link does NOT have rel attribute", () => {
      render(<HomepageContactInfo />);

      const emailLink = screen.getByRole("link", {
        name: /email/i,
      }) as HTMLAnchorElement;
      expect(emailLink).not.toHaveAttribute("rel");
    });
  });

  describe("IntersectionObserver lifecycle", () => {
    it("creates IntersectionObserver instances for contact cards", () => {
      render(<HomepageContactInfo />);

      // Should create 4 observers (one for each contact card)
      expect(intersectionObserverMock).toHaveBeenCalled();
      expect(intersectionObserverMock.mock.calls.length).toBeGreaterThanOrEqual(
        1
      );
    });

    it("IntersectionObserver is created with correct options", () => {
      render(<HomepageContactInfo />);

      // Check that at least one observer was created with expected options
      const firstCall = intersectionObserverMock.mock.calls[0];
      expect(firstCall).toBeDefined();

      // The second argument should be the options
      const options = firstCall[1];
      expect(options).toHaveProperty("threshold");
      expect(options.threshold).toBe(0.3);
    });

    it("observes elements when rendered", () => {
      render(<HomepageContactInfo />);

      // Each contact card should call observe
      expect(observeMock).toHaveBeenCalled();
    });
  });

  describe("Link URLs (structural test, not exact values)", () => {
    it("GitHub link has href attribute", () => {
      render(<HomepageContactInfo />);

      const githubLink = screen.getByRole("link", {
        name: /github/i,
      }) as HTMLAnchorElement;
      expect(githubLink).toHaveAttribute("href");
      expect(githubLink.getAttribute("href")).toContain("github.com");
    });

    it("LinkedIn link has href attribute", () => {
      render(<HomepageContactInfo />);

      const linkedinLink = screen.getByRole("link", {
        name: /linkedin/i,
      }) as HTMLAnchorElement;
      expect(linkedinLink).toHaveAttribute("href");
      expect(linkedinLink.getAttribute("href")).toContain("linkedin.com");
    });

    it("Medium link has href attribute", () => {
      render(<HomepageContactInfo />);

      const mediumLink = screen.getByRole("link", {
        name: /medium/i,
      }) as HTMLAnchorElement;
      expect(mediumLink).toHaveAttribute("href");
      expect(mediumLink.getAttribute("href")).toContain("medium.com");
    });

    it("Email link has mailto href", () => {
      render(<HomepageContactInfo />);

      const emailLink = screen.getByRole("link", {
        name: /email/i,
      }) as HTMLAnchorElement;
      expect(emailLink).toHaveAttribute("href");
      expect(emailLink.getAttribute("href")).toMatch(/^mailto:/);
    });
  });
});
