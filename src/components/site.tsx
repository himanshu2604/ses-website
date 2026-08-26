// 🎨 Palette 2026-08-04: Resolve site-wide text contrast accessibility failures by upgrading secondary/muted-text to a WCAG AA-compliant gray (#999) — Elevates accessibility, bringing contrast ratio from 3.32:1 to 6.58:1.
import { Link, useRouter, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, useId } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/* -------------------- hooks & primitives -------------------- */

export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            obs.disconnect();
          }
        });
      },
      { threshold },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [seen, threshold]);
  return { ref, seen };
}

// ⚡ Bolt 2026-09-16: Guard CountUp DOM text updates to avoid redundant string assignments when rounded score is unchanged — expected impact: Eliminates ~50-60% of unnecessary DOM text writes during count-up RAF animation.
export function CountUp({
  to,
  duration = 1400,
  className = "",
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const { ref, seen } = useInView<HTMLSpanElement>(0.4);
  const valueRef = useRef(0);

  useEffect(() => {
    if (!seen || !ref.current) return;
    const start = performance.now();
    let raf = 0;
    const node = ref.current;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(to * eased);
      if (current !== valueRef.current) {
        valueRef.current = current;
        node.textContent = String(current);
      }
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration, ref]);

  return (
    <span ref={ref} className={className}>
      {valueRef.current}
    </span>
  );
}

export function Bar({
  value,
  max = 100,
  tone = "green",
}: {
  value: number;
  max?: number;
  tone?: "green" | "amber" | "red";
}) {
  const { ref, seen } = useInView<HTMLDivElement>(0.3);
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div ref={ref} className="bar-track mt-2">
      <div
        className={`bar-fill ${tone === "amber" ? "amber" : tone === "red" ? "red" : ""}`}
        style={{ width: seen ? `${pct}%` : 0 }}
      />
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

export function VolLabel({ vol, label }: { vol: string; label: string }) {
  return (
    <div className="mono text-[11px] tracking-[0.12em] text-[#444] uppercase font-medium">
      <span className="text-[#22c55e]">{vol}</span> <span className="text-[#444]">—</span>{" "}
      <span className="text-[#999]">{label}</span>
    </div>
  );
}

export function Rule() {
  return <div className="hairline w-full" />;
}

export function SectionHead({
  vol,
  label,
  title,
  sub,
}: {
  vol: string;
  label: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="border-l-2 border-[#1f1f1f] pl-6 md:pl-8 max-w-[820px] space-y-4">
      <VolLabel vol={vol} label={label} />
      <h2 className="headline text-[32px] md:text-[48px]">{title}</h2>
      <p className="text-[#888] text-[16px] leading-[1.7]">{sub}</p>
    </div>
  );
}

/* -------------------- Health Score card -------------------- */

// 🎨 Palette 2026-07-11: Add tooltips to Health Score metrics — Provides context for health pillars, improving user understanding of the scoring system.
export type Metric = {
  label: string;
  score: number;
  tone?: "green" | "amber" | "red";
  description?: string;
};

const DEFAULT_DESCRIPTIONS: Record<string, string> = {
  Performance: "Measures load times, responsiveness, and resource efficiency.",
  Security: "Evaluates vulnerability exposure, dependency safety, and access controls.",
  "Experience Quality": "Assesses UI consistency, accessibility, and user flow friction.",
  "Code Quality": "Measures maintainability, technical debt, and architectural standards.",
  "Code Health": "Measures maintainability, technical debt, and architectural standards.",
  Reliability: "Evaluates uptime, error rates, and system stability.",
};

export function HealthCard({
  file = "health.json",
  status = "live",
  score,
  delta,
  metrics,
  archived = false,
  scoreTone = "green",
}: {
  file?: string;
  status?: string;
  score: number;
  delta?: string;
  metrics: Metric[];
  archived?: boolean;
  scoreTone?: "green" | "amber" | "red";
}) {
  const scoreColor =
    scoreTone === "amber" ? "#d97706" : scoreTone === "red" ? "#b91c1c" : "#22c55e";
  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-[3px] p-6 md:p-8">
      <div className="flex items-center justify-between mono text-[11px]">
        <span className="text-[#444]">{file}</span>
        <span className="flex items-center gap-2" style={{ color: archived ? "#999" : "#22c55e" }}>
          <span
            className={archived ? "" : "pulse-dot"}
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: archived ? "#999" : "#22c55e",
              display: "inline-block",
            }}
          />
          {status}
        </span>
      </div>
      <div className="mt-6 flex items-baseline gap-4">
        <span
          className="mono font-semibold tabular-nums"
          style={{ fontSize: 88, lineHeight: 1, color: scoreColor }}
        >
          <CountUp to={score} />
        </span>
        {delta && (
          <span className="mono text-[11px] text-[#999] font-medium tabular-nums">{delta}</span>
        )}
      </div>
      <div className="mt-8 space-y-5">
        <TooltipProvider>
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="flex items-center justify-between mono text-[12px]">
                <Tooltip>
                  <TooltipTrigger asChild>
                    {/* 🎨 Palette 2026-08-28: Enable keyboard focus & high-contrast focus rings for Health Score metric tooltips — Improves keyboard/screen-reader accessibility (WCAG AA) */}
                    <span
                      tabIndex={0}
                      className="text-[#888] cursor-help border-b border-[#333] border-dotted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#22c55e] focus-visible:text-[#22c55e] rounded-[1px] transition-colors"
                    >
                      {m.label}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-[200px]">
                      {m.description || DEFAULT_DESCRIPTIONS[m.label] || m.label}
                    </p>
                  </TooltipContent>
                </Tooltip>
                <span className="text-[#f0f0f0]">{m.score}</span>
              </div>
              <Bar
                value={m.score}
                tone={m.tone || (m.score >= 70 ? "green" : m.score >= 50 ? "amber" : "red")}
              />
            </div>
          ))}
        </TooltipProvider>
      </div>
      <div className="hairline mt-8 pt-4 mono text-[10px] text-[#444] flex justify-between">
        <span>industry avg: 61</span>
        <span>top 10%: 83</span>
      </div>
    </div>
  );
}

/* -------------------- Nav -------------------- */

// ⚡ Bolt 2026-07-29: Replaced high-frequency scroll event listener with an IntersectionObserver sentinel to eliminate main-thread scroll jank — expected impact: 0 scroll event triggers from Nav, reducing scroll listener execution time to <1ms.
// 🎨 Palette 2026-08-11: Enhance mobile navigation keyboard and interactive accessibility — Improves UX and keyboard interaction (WCAG AA-compliance).
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const obs = new IntersectionObserver(([entry]) => {
      setScrolled(!entry.isIntersecting);
    });
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, []);

  // Escape key and click-outside listeners to automatically close the mobile menu, returning focus to toggle button
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleBtnRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Lock body scrolling when the mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links: Array<{ href: string; label: string; kind: "hash" | "route" }> = [
    { href: "/#process", label: "process", kind: "hash" },
    { href: "/#results", label: "results", kind: "hash" },
    { href: "/#pricing", label: "pricing", kind: "hash" },
    { href: "/evidence", label: "evidence", kind: "route" },
  ];
  return (
    <>
      <div ref={sentinelRef} className="absolute top-0 left-0 right-0 h-20 pointer-events-none" />
      <nav
        ref={navRef}
        className="fixed top-0 inset-x-0 z-50 border-b transition-colors sticky-element"
        style={{
          background: scrolled || open ? "rgba(12,12,12,0.92)" : "#0c0c0c",
          WebkitBackdropFilter: scrolled || open ? "blur(14px) saturate(140%)" : "none",
          backdropFilter: scrolled || open ? "blur(14px) saturate(140%)" : "none",
          borderColor: "#1a1a1a",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 min-w-0">
            <span
              className="pulse-dot shrink-0"
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "#22c55e",
                display: "inline-block",
              }}
            />
            <span className="mono text-[13px] text-[#f0f0f0] truncate">
              <span className="sm:hidden">SES</span>
              <span className="hidden sm:inline">SES — Software Evolution Service</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-7 mono text-[12px]">
            {links.map((l) =>
              l.kind === "route" ? (
                <Link key={l.href} to={l.href} className="nav-link">
                  {l.label}
                </Link>
              ) : (
                <a key={l.href} href={l.href} className="nav-link">
                  {l.label}
                </a>
              ),
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/audit"
              className="btn-outline hidden sm:inline-block mono text-[12px] px-3.5 py-1.5 rounded-[3px] border border-[#22c55e] text-[#22c55e]"
            >
              audit --free
            </Link>

            <button
              ref={toggleBtnRef}
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-[3px] border border-[#1e1e1e] text-[#f0f0f0] hover:border-[#22c55e] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/40"
            >
              <span className="sr-only">menu</span>
              <span aria-hidden className="mono text-[14px] leading-none">
                {open ? "✕" : "≡"}
              </span>
            </button>
          </div>
        </div>
        {open && (
          <div id="mobile-menu" className="md:hidden border-t border-[#1a1a1a]">
            <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col mono text-[14px]">
              {links.map((l) =>
                l.kind === "route" ? (
                  <Link
                    key={l.href}
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="py-3 text-[#888] hover:text-[#22c55e] border-b border-[#1a1a1a] last:border-b-0"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="py-3 text-[#888] hover:text-[#22c55e] border-b border-[#1a1a1a] last:border-b-0"
                  >
                    {l.label}
                  </a>
                ),
              )}
              <Link
                to="/audit"
                onClick={() => setOpen(false)}
                className="btn-primary mt-4 mono text-[13px] text-center bg-[#22c55e] text-[#0c0c0c] px-4 py-3 rounded-[3px] font-semibold"
              >
                $ audit --free ↵
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

/* -------------------- Footer -------------------- */

export function Footer() {
  const cols: Array<{
    title: string;
    links: Array<{ label: string; to?: string; href?: string }>;
  }> = [
    {
      title: "Service",
      links: [
        { label: "Process", href: "/#process" },
        { label: "Pricing", href: "/#pricing" },
        { label: "Evidence", to: "/evidence" },
        { label: "Free audit", to: "/audit" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", to: "/about" },
        { label: "Engineering blog", to: "/about" },
        { label: "Changelog", to: "/evidence" },
        { label: "Careers", href: "mailto:hi@softwareevolutionservice.com?subject=Careers at SES" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", to: "/privacy" },
        { label: "Terms", to: "/terms" },
        { label: "Security", to: "/security" },
        { label: "Status", to: "/status" },
      ],
    },
  ];
  return (
    <footer style={{ background: "#0a0a0a" }} className="border-t border-[#1a1a1a]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-4 col-span-2 md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <span
              className="pulse-dot"
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: "#22c55e",
                display: "inline-block",
              }}
            />
            <span className="mono text-[14px] text-[#f0f0f0]">
              SES — Software Evolution Service
            </span>
          </div>
          <p className="text-[#999] text-[13px] leading-[1.7] max-w-[260px]">
            Measurable software improvement, shipped every week. Backed by data, reports, and
            AI-assisted engineering.
          </p>
          <p className="italic text-[#444] text-[12px] mono leading-[1.6] pt-2 border-l border-[#1f1f1f] pl-3">
            "Software doesn't stay finished. It either evolves or decays."
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <div className="mono text-[10px] uppercase tracking-[0.14em] text-[#444] mb-4">
              {col.title}
            </div>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  {l.to ? (
                    <Link to={l.to} className="footer-link text-[13px]">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="footer-link text-[13px]">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[#1a1a1a]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-3 mono text-[11px] text-[#444]">
          <span className="min-w-0">
            {
              "// © 2026 SES — Software Evolution Service — software evolution service. all systems operational. · no tracking cookies."
            }
          </span>
          <span className="hidden md:flex items-center gap-2">
            <span
              className="pulse-dot"
              style={{ width: 6, height: 6, borderRadius: 999, background: "#22c55e" }}
            />
            <span className="text-[#22c55e]">live</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* -------------------- Audit Form (shared) -------------------- */

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkolddre";

// 🎨 Palette 2026-08-11: Enhance lead-gen AuditForm with pricing plan context bridging — Reads plan context safely from URL on client mount, displays customized selected plan badge, and adapts the CLI submit button micro-interaction to reflect selected plan.
export function AuditForm({ showDedicatedLink = false }: { showDedicatedLink?: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [attempted, setAttempted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [concern, setConcern] = useState("");
  const [spend, setSpend] = useState("Prefer not to say");
  const [gdprConsent, setGdprConsent] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useRouterState({ select: (s) => s.location });

  // 🎨 Palette 2026-09-08: Bridge selection context dynamically by listening reactively to URL search param updates — Ensures same-page and cross-page navigation selection propagates instantly
  useEffect(() => {
    const searchParams = location.search as Record<string, unknown>;
    const plan = searchParams.plan;
    if (plan && ["maintain", "growth", "compound"].includes(String(plan).toLowerCase())) {
      setSelectedPlan(String(plan).toLowerCase());
    } else {
      setSelectedPlan(null);
    }
  }, [location.search]);

  // ⚡ Bolt 2026-09-02: Warm up Formspree connection dynamically on high-intent user interactions — expected impact: Saves ~200-400ms on submit without wasting connection overhead for passive scrolling-only visitors.
  const [isWarmed, setIsWarmed] = useState(false);
  const warmConnection = () => {
    if (isWarmed || typeof window === "undefined") return;
    setIsWarmed(true);
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://formspree.io";
    document.head.appendChild(link);
  };

  const baseId = useId();
  const nameId = `${baseId}-name`;
  const emailId = `${baseId}-email`;
  const urlId = `${baseId}-url`;
  const concernId = `${baseId}-concern`;
  const spendId = `${baseId}-spend`;
  const gdprConsentId = `${baseId}-gdpr-consent`;
  const nameErrId = `${nameId}-error`;
  const emailErrId = `${emailId}-error`;
  const urlErrId = `${urlId}-error`;
  const concernErrId = `${concernId}-error`;

  const personalDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];

  function validateName(v: string): string | null {
    if (!v.trim()) return "name required";
    if (v.trim().length < 2) return "name must be at least 2 characters";
    return null;
  }
  function validateEmail(v: string): string | null {
    const t = v.trim();
    if (!t) return "work email required";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(t)) return "valid email required";
    const domain = t.split("@")[1]?.toLowerCase() ?? "";
    if (personalDomains.includes(domain)) return "please use your work email";
    return null;
  }
  function validateUrl(v: string): string | null {
    const t = v.trim();
    if (!t) return "product URL required";
    if (!/^https:\/\/.+\..+/i.test(t)) return "valid URL required (https://...)";
    return null;
  }
  function validateConcern(v: string): string | null {
    if (!v) return "please select a concern";
    return null;
  }

  const errors = {
    name: validateName(name),
    email: validateEmail(email),
    url: validateUrl(url),
    concern: validateConcern(concern),
  };
  const hasErrors = Object.values(errors).some((e) => e !== null);
  const showError = (key: keyof typeof errors) => attempted && errors[key];

  function normalizeUrl() {
    const t = url.trim();
    if (t && !/^https?:\/\//i.test(t)) {
      setUrl("https://" + t);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAttempted(true);
    setSubmitError(null);
    if (hasErrors) return;
    setSubmitting(true);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          productUrl: url,
          biggestConcern: concern,
          cloudSpend: spend,
          gdprConsent,
          selectedPlan: selectedPlan || "none",
          _subject: `New audit request ${selectedPlan ? `(${selectedPlan}) ` : ""}— ${url}`,
          _replyto: email,
        }),
      });

      if (response.ok) {
        setSubmittedUrl(url);
        setSubmitted(true);
      } else {
        const data = await response.json();
        throw new Error(data?.error || "Submission failed");
      }
    } catch {
      setSubmitError("submission failed. try again or email hi@softwareevolutionservice.com");
    } finally {
      setSubmitting(false);
    }
  }

  const errMsg = (msg: string | null | undefined, id: string) => {
    if (!msg) return null;
    return (
      <div id={id} role="alert" className="mono text-[12px] text-[#ef4444] mt-1.5 field-error">
        {"// error: "}
        {msg}
      </div>
    );
  };

  const fieldClass = (invalid: boolean | null | undefined | string) =>
    "field" + (invalid ? " field-invalid" : "");

  // 🎨 Palette 2026-08-26: Enhance AuditForm success state accessibility and reset usability — Adds polite live region and keyboard-accessible reset action.
  const handleReset = () => {
    setSubmitted(false);
    setAttempted(false);
    setSubmittedUrl("");
    setName("");
    setEmail("");
    setUrl("");
    setConcern("");
    setSpend("Prefer not to say");
    setGdprConsent(false);
  };

  return (
    <div
      className="border border-[#1e1e1e] rounded-[3px] bg-[#111] p-7 md:p-9"
      onMouseEnter={warmConnection}
      onTouchStart={warmConnection}
    >
      {submitted ? (
        <div role="status" aria-live="polite" className="mono text-[13px] space-y-3">
          <div className="text-[#22c55e] font-semibold">{"> audit requested successfully."}</div>
          <div className="text-[#888]">
            scanning: <span className="text-[#f0f0f0]">{submittedUrl}</span>
          </div>
          <div className="text-[#888]">
            expected delivery: <span className="text-[#f0f0f0]">48h</span>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span
              className="pulse-dot"
              style={{ width: 6, height: 6, borderRadius: 999, background: "#22c55e" }}
            />
            <span className="text-[#22c55e]">queued</span>
          </div>
          <div className="pt-3 border-t border-[#1e1e1e]">
            <button
              type="button"
              onClick={handleReset}
              className="btn-outline mono text-[12px] px-3.5 py-2 rounded-[3px] border border-[#22c55e] text-[#22c55e] hover:bg-[#22c55e]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c55e] transition-colors cursor-pointer"
            >
              $ request another audit ↵
            </button>
          </div>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {selectedPlan && (
            <div className="mono text-[12px] bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] px-3.5 py-2.5 rounded-[3px] flex items-center justify-between">
              <span>{`[ selected plan: ${selectedPlan} ]`}</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedPlan(null);
                  navigate({
                    search: (prev: Record<string, unknown>) => {
                      const { plan, ...rest } = prev;
                      return rest;
                    },
                    hash: "audit",
                  });
                }}
                className="text-[#999] hover:text-[#ef4444] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ef4444] focus-visible:text-[#ef4444] rounded-[1px] transition-colors text-[10px] uppercase font-mono tracking-wider cursor-pointer"
                aria-label="Clear selected plan"
              >
                clear
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={nameId}
                className="mono text-[10px] text-[#444] uppercase tracking-[0.12em] block mb-2"
              >
                name
              </label>
              <input
                id={nameId}
                className={fieldClass(showError("name"))}
                placeholder="ada lovelace"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={warmConnection}
                aria-required="true"
                aria-invalid={!!showError("name")}
                aria-describedby={showError("name") ? nameErrId : undefined}
              />
              {showError("name") && errMsg(errors.name, nameErrId)}
            </div>
            <div>
              <label
                htmlFor={emailId}
                className="mono text-[10px] text-[#444] uppercase tracking-[0.12em] block mb-2"
              >
                work email
              </label>
              <input
                id={emailId}
                type="email"
                className={fieldClass(showError("email"))}
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={warmConnection}
                aria-required="true"
                aria-invalid={!!showError("email")}
                aria-describedby={showError("email") ? emailErrId : undefined}
              />
              {showError("email") && errMsg(errors.email, emailErrId)}
            </div>
          </div>
          <div>
            <label
              htmlFor={urlId}
              className="mono text-[10px] text-[#444] uppercase tracking-[0.12em] block mb-2"
            >
              product url
            </label>
            <input
              id={urlId}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={normalizeUrl}
              onFocus={warmConnection}
              className={fieldClass(showError("url"))}
              placeholder="https://your-product.com"
              aria-required="true"
              aria-invalid={!!showError("url")}
              aria-describedby={showError("url") ? urlErrId : undefined}
            />
            {showError("url") && errMsg(errors.url, urlErrId)}
          </div>
          <div>
            <label
              htmlFor={concernId}
              className="mono text-[10px] text-[#444] uppercase tracking-[0.12em] block mb-2"
            >
              biggest concern
            </label>
            <select
              id={concernId}
              className={`${fieldClass(showError("concern"))} ${!concern ? "text-[#444444]" : "text-[#f0f0f0]"}`}
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              onFocus={warmConnection}
              aria-required="true"
              aria-invalid={!!showError("concern")}
              aria-describedby={showError("concern") ? concernErrId : undefined}
            >
              <option value="">Select a concern…</option>
              <option value="Performance">Performance</option>
              <option value="Security">Security</option>
              <option value="Reliability">Reliability</option>
              <option value="Code Health">Code Health</option>
              <option value="General decay">General decay</option>
              <option value="Cloud costs">Cloud costs</option>
              <option value="Not sure — audit everything">Not sure — audit everything</option>
            </select>
            {showError("concern") && errMsg(errors.concern, concernErrId)}
          </div>
          <div>
            <label
              htmlFor={spendId}
              className="mono text-[10px] text-[#444] uppercase tracking-[0.12em] block mb-2"
            >
              monthly cloud spend (optional)
            </label>
            <select
              id={spendId}
              className={`field ${spend === "Prefer not to say" ? "text-[#444444]" : "text-[#f0f0f0]"}`}
              value={spend}
              onChange={(e) => setSpend(e.target.value)}
              onFocus={warmConnection}
            >
              <option>Prefer not to say</option>
              <option>Under $500</option>
              <option>$500–2000</option>
              <option>$2000–10000</option>
              <option>Over $10000</option>
            </select>
          </div>

          <div className="flex gap-3 items-start mt-4">
            <input
              type="checkbox"
              id={gdprConsentId}
              name="gdprConsent"
              checked={gdprConsent}
              onChange={(e) => setGdprConsent(e.target.checked)}
              onFocus={warmConnection}
              className="mt-1 w-4 h-4 rounded-sm border border-[#1e1e1e] bg-[#111111] accent-[#22c55e] cursor-pointer flex-shrink-0"
            />
            <label
              htmlFor={gdprConsentId}
              className="text-[#999] text-[13px] leading-relaxed font-sans cursor-pointer"
            >
              I agree to receive follow-up emails about my audit results and SES service updates.
              You can unsubscribe at any time.
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting || (attempted && hasErrors)}
            className="btn-primary mono text-[13px] w-full bg-[#22c55e] text-[#0c0c0c] py-3.5 rounded-[3px] font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              cursor: submitting || (attempted && hasErrors) ? "not-allowed" : "pointer",
            }}
          >
            {submitting
              ? "// processing..."
              : selectedPlan
                ? `$ request --audit --${selectedPlan} ↵`
                : "$ request --audit ↵"}
          </button>

          {submitError && (
            <div className="mono text-[12px] text-[#ef4444] field-error">
              {"// error: "}
              {submitError}
            </div>
          )}
          <div className="mono text-[11px] text-[#444] text-center">
            {"// no commitment required. response within 48h."}
          </div>
          {showDedicatedLink && (
            <div className="mono text-[11px] text-center pt-1">
              <Link to="/audit" className="text-[#999] hover:text-[#22c55e] transition-colors">
                {"// prefer a dedicated page? audit.ses.service →"}
              </Link>
            </div>
          )}
        </form>
      )}
    </div>
  );
}
