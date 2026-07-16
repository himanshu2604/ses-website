import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useId } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Nav,
  Footer,
  HealthCard,
  Eyebrow,
  VolLabel,
  SectionHead,
  CountUp,
  Bar,
  AuditForm,
} from "@/components/site";

function useIsLgUp() {
  const [isLg, setIsLg] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const on = () => setIsLg(mql.matches);
    on();
    mql.addEventListener("change", on);
    return () => mql.removeEventListener("change", on);
  }, []);
  return isLg;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SES — Software Evolution Service | Weekly AI-Assisted Software Improvement" },
      {
        name: "description",
        content:
          "Software decays without active maintenance. SES ships measurable improvements to your product every week — performance, security, and code quality. Backed by data, not promises.",
      },
      { property: "og:title", content: "SES — Software Evolution Service" },
      {
        property: "og:description",
        content:
          "Your software is getting worse every week. We fix that. Weekly AI-assisted improvements, measured by your Health Score.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://softwareevolutionservice.com" },
      { property: "og:image", content: "https://softwareevolutionservice.com/og.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SES — Software Evolution Service" },
      {
        name: "twitter:description",
        content:
          "Your software is getting worse every week. We fix that. Weekly AI-assisted improvements, measured by your Health Score.",
      },
      { name: "twitter:image", content: "https://softwareevolutionservice.com/og.svg" },
    ],
    links: [{ rel: "canonical", href: "https://softwareevolutionservice.com" }],
  }),
  component: Index,
});

/* -------------------- Hero -------------------- */

function Hero() {
  return (
    <section id="top" className="relative pt-28 pb-16 md:pt-36 md:pb-30 border-b border-[#1a1a1a]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-14 items-start">
        <div className="border-l-2 border-[#1f1f1f] pl-6 md:pl-8 space-y-7">
          <Eyebrow>{"// SOFTWARE EVOLUTION SERVICE"}</Eyebrow>
          <div className="space-y-3">
            <VolLabel vol="VOL. I" label="THE PROBLEM" />
            <h1 className="headline text-[40px] md:text-[60px] leading-[1.02]">
              Your software is getting worse every week.
            </h1>
          </div>
          <div className="space-y-3">
            <VolLabel vol="VOL. II" label="THE SERVICE" />
            <p className="text-[#888] text-[16px] md:text-[17px] leading-[1.7] max-w-[520px]">
              Every week we make measurable improvements to your product's performance, security,
              reliability, and code health — backed by data, reports, and AI-assisted engineering.
            </p>
          </div>
          <div className="pt-2 italic text-[#666] text-[14px] mono border-l border-[#22c55e] pl-4">
            "Software doesn't stay finished. It either evolves or decays."
          </div>
          <div className="flex items-center gap-5 pt-2 flex-wrap">
            <a
              href="#audit"
              className="btn-primary mono text-[13px] bg-[#22c55e] text-[#0c0c0c] px-5 py-3 rounded-[3px] font-semibold"
            >
              $ audit --free ↵
            </a>
            <a href="#results" className="nav-link mono text-[13px]">
              see results →
            </a>
          </div>
        </div>

        <div className="lg:pl-6">
          <HealthCard
            score={73}
            delta="↑ +28 since baseline"
            metrics={[
              { label: "Performance", score: 67 },
              { label: "Security", score: 51, tone: "amber" },
              { label: "Reliability", score: 71 },
              { label: "Code Health", score: 64 },
            ]}
          />
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[#1e1e1e] rounded-[3px] divide-y md:divide-y-0 md:divide-x divide-[#1e1e1e]">
          {[
            { num: "11", label: "improvements deployed this week" },
            { num: "$214", label: "cloud costs saved this month" },
            { num: "top 32%", label: "in your industry" },
          ].map((s) => (
            <div key={s.label} className="p-6 md:p-8 border-l-2 border-[#1f1f1f]">
              <div className="mono font-semibold tabular-nums text-[#22c55e] text-[32px] md:text-[40px] leading-none">
                {s.num}
              </div>
              <div className="mono text-[11px] text-[#666] mt-3 uppercase tracking-[0.12em]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Problem / Decay timeline -------------------- */

function Problem() {
  const stages = [
    {
      when: "Week 0",
      score: 88,
      label: "Launch",
      desc: "Clean codebase, current dependencies, fast.",
      tone: "green" as const,
    },
    {
      when: "Month 3",
      score: 76,
      label: "Drift",
      desc: "Patches stack up. Edge cases multiply.",
      tone: "green" as const,
    },
    {
      when: "Month 9",
      score: 61,
      label: "Rot",
      desc: "Deps go stale. Latency creeps upward.",
      tone: "amber" as const,
    },
    {
      when: "Year 1",
      score: 44,
      label: "Risk",
      desc: "CVEs unaddressed. Incidents recur.",
      tone: "amber" as const,
    },
    {
      when: "Year 2",
      score: 28,
      label: "Liability",
      desc: "Rewrites get proposed. Velocity stalls.",
      tone: "red" as const,
    },
  ];
  return (
    <section className="py-16 md:py-30 border-b border-[#1a1a1a]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 space-y-14">
        <SectionHead
          vol="VOL. III"
          label="THE PROBLEM"
          title="What happens after delivery"
          sub="Software is never finished — it decays. Without active maintenance, every shipped product loses health on a predictable curve."
        />

        <div className="border border-[#1e1e1e] rounded-[3px] p-6 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-[#1e1e1e]">
            {stages.map((s, i) => {
              const color =
                s.tone === "green" ? "#22c55e" : s.tone === "amber" ? "#d97706" : "#b91c1c";
              return (
                <div key={s.label} className="bg-[#111] p-6 flex flex-col gap-4">
                  <div className="mono text-[10px] tracking-[0.12em] uppercase text-[#444]">
                    {s.when}
                  </div>
                  <div
                    className="mono font-semibold tabular-nums text-[44px] leading-none"
                    style={{ color }}
                  >
                    <CountUp to={s.score} duration={1200 + i * 120} />
                  </div>
                  <Bar value={s.score} tone={s.tone} />
                  <div>
                    <div className="text-[#f0f0f0] text-[15px] font-semibold">{s.label}</div>
                    <div className="text-[#666] text-[13px] leading-[1.6] mt-1.5">{s.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Workflow -------------------- */

function TerminalBlock({ lines }: { lines: string[] }) {
  return (
    <div className="mt-5 border border-[#1e1e1e] rounded-[3px] bg-[#111] p-4 mono text-[12px] leading-[1.7]">
      {lines.map((line, i) => {
        const isCommand = line.startsWith("$ ");
        return (
          <div key={i} className={isCommand ? "text-[#22c55e]" : "text-[#666]"}>
            {line}
          </div>
        );
      })}
    </div>
  );
}

// ⚡ Bolt 2025-05-14: Optimized Workflow scroll tracking by moving progress state to a CSS variable — expected impact: Reduced main-thread work and improved scroll performance.
function Workflow() {
  const steps = [
    {
      n: "01",
      cmd: "$ ses scan --deep",
      title: "Scan",
      sub: "Automated audit",
      desc: "Every Monday we run a deep scan across performance, security, dependencies, and code health. Output: fresh health score + ranked list of regressions.",
      bullets: ["Lighthouse + load profiling", "CVE & dependency diff", "Static analysis pass"],
      output: [
        "$ ses scan --deep",
        "> scanning 14 services...",
        "> performance: 3 regressions found",
        "> security: 2 CVEs flagged (1 critical)",
        "> code quality: 8 stale dependencies",
        "> scan complete — 6.2s",
      ],
      fact: "The average production codebase accumulates a new dependency vulnerability roughly every nine days without active monitoring.",
      pipeline: ["GitHub"],
    },
    {
      n: "02",
      cmd: "$ ses prioritize",
      title: "Prioritize",
      sub: "AI-ranked findings",
      desc: "AI ranks findings by impact. Operator selects top items for the week's loop.",
      bullets: [],
      output: [
        "$ ses prioritize",
        "> ranking 13 findings by impact x effort",
        "> top 4 selected for this week's loop",
        "> est. health score impact: +6 to +9 points",
      ],
      fact: "Teams that triage by impact-vs-effort consistently ship more fixes per sprint than teams working tickets in reported order.",
      pipeline: ["Jules Agents"],
    },
    {
      n: "03",
      cmd: "$ ses engineer",
      title: "Engineer",
      sub: "PRs with evidence",
      desc: "AI generates pull requests with full evidence attached — benchmarks, traces, before/after.",
      bullets: [],
      output: [
        "$ ses engineer",
        '> PR #482 opened: "Add connection pooling to /api/orders"',
        '> PR #483 opened: "Patch CVE-2026-1142 in auth middleware"',
        "> evidence attached: benchmarks, traces, diff summary",
      ],
      fact: "PRs that ship with before/after evidence attached get reviewed and merged noticeably faster than PRs with description text alone.",
      pipeline: ["Pull Requests"],
    },
    {
      n: "04",
      cmd: "$ ses verify",
      title: "Verify",
      sub: "Tests + staging + review",
      desc: "Tests run, staging deploy, human review before production merge.",
      bullets: [],
      output: [
        "$ ses verify",
        "> running test suite... 412/412 passed",
        "> staging deploy successful",
        "> awaiting human review — 1 reviewer assigned",
      ],
      fact: "Most production incidents trace back to changes that skipped staging validation — not to missing tests.",
      pipeline: ["Review", "Deploy"],
    },
    {
      n: "05",
      cmd: "$ ses report",
      title: "Report",
      sub: "Changelog + score update",
      desc: "Changelog generated, Health Score updated, client notified.",
      bullets: [],
      output: [
        "$ ses report",
        "> changelog generated (4 entries)",
        "> health score updated: 73 → 79",
        "> client notified — report sent",
      ],
      fact: "Clients who can watch their Health Score trend over time are far less likely to churn than those who only receive a monthly PDF.",
      pipeline: ["Health Score", "Monthly Report"],
    },
  ];

  const pipelineStages = [
    "GitHub",
    "Jules Agents",
    "Pull Requests",
    "Review",
    "Deploy",
    "Health Score",
    "Monthly Report",
  ];

  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [active, setActive] = useState(0);
  const isLgUp = useIsLgUp();
  const isMobile = useIsMobile();
  const isTablet = !isMobile && !isLgUp;
  // Pinning / active-state animation only runs on true desktop (lg+)
  const compact = !isLgUp;

  useEffect(() => {
    if (!isLgUp) return;
    const visibility = new Map<number, number>();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number((e.target as HTMLElement).dataset.idx);
          visibility.set(idx, e.intersectionRatio);
        });
        let best = 0;
        let bestRatio = -1;
        visibility.forEach((r, idx) => {
          if (r > bestRatio) {
            bestRatio = r;
            best = idx;
          }
        });
        if (bestRatio > 0) setActive(best);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    stepRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [isLgUp]);

  const activeSet = new Set(steps[active].pipeline);
  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
  const easeIn = "cubic-bezier(0.4, 0, 1, 1)";

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;
    const section = sectionRef.current;
    const onScroll = () => {
      if (ticking || !section) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const denom = sectionHeight - viewportHeight;
        const progress = denom > 0 ? (scrollY - sectionTop) / denom : 0;
        const fill = Math.max(0, Math.min(1, progress)) * 100;
        section.style.setProperty("--section-fill", `${fill}%`);
        ticking = false;
      });
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            window.addEventListener("scroll", onScroll, { passive: true });
            window.addEventListener("resize", onScroll, { passive: true });
            onScroll();
          } else {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
          }
        });
      },
      { rootMargin: "20% 0px" },
    );

    if (section) obs.observe(section);

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-16 md:py-30 border-b border-[#1a1a1a]"
    >
      {/* Mobile section-level scroll tracker (≤768px) */}
      <div className="md:hidden absolute left-0 top-0 bottom-0 w-[3px] bg-[#1e1e1e] pointer-events-none">
        <div
          className="w-full bg-[#22c55e]"
          style={{ height: "var(--section-fill, 0%)", willChange: "height" }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 space-y-14">
        <SectionHead
          vol="VOL. IV"
          label="THE LOOP"
          title="What happens every week"
          sub="A repeatable five-stage loop. Same cadence, every week, measured against your live product."
        />

        {/* Mobile: wrapped chip pipeline above stacked steps */}
        {isMobile && (
          <div className="border border-[#1e1e1e] rounded-[3px] p-4 -mx-1">
            <div className="eyebrow mb-3">// pipeline</div>
            <div className="flex flex-wrap -m-[3px]">
              {pipelineStages.map((p) => (
                <span
                  key={p}
                  className="mono text-[12px] text-[#22c55e] bg-[#111] border border-[#1e1e1e] rounded-[3px] px-2.5 py-1 m-[3px]"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}

        <div
          className={isMobile ? "" : "grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-start"}
        >
          {/* Left: steps */}
          <div
            className={
              isMobile ? "space-y-4" : "space-y-px bg-[#1e1e1e] lg:bg-transparent lg:space-y-0"
            }
          >
            {steps.map((s, i) => {
              const isActive = isLgUp && i === active;
              const direction = isLgUp ? (i < active ? -1 : i > active ? 1 : 0) : 0;
              // On mobile: no per-card border — the section-level tracker on the far left is enough.
              // On tablet: all cards fully visible, no active dimming, no green border cycling.
              // On desktop: active state drives opacity + a scaleX green rail.
              const showDesktopRail = isLgUp;
              const contentOpacity = isLgUp ? (isActive ? 1 : 0) : 1;
              const contentTransform = isLgUp
                ? isActive
                  ? "translateY(0)"
                  : `translateY(${direction < 0 ? -12 : 12}px)`
                : "none";
              const headTransform = isLgUp
                ? isActive
                  ? "translateY(0)"
                  : `translateY(${direction < 0 ? -6 : 6}px)`
                : "none";
              const contentPointer: "auto" | "none" = isLgUp
                ? isActive
                  ? "auto"
                  : "none"
                : "auto";
              return (
                <div
                  key={s.n}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  data-idx={i}
                  className={
                    isMobile
                      ? "bg-[#111] rounded-[3px] relative overflow-hidden"
                      : "bg-[#111] p-6 md:p-8 lg:bg-transparent lg:min-h-screen lg:flex lg:items-center lg:p-0 lg:py-[20vh] relative"
                  }
                  style={{
                    borderLeft: isMobile || isTablet ? "2px solid transparent" : undefined,
                  }}
                >
                  {/* Desktop active-step green rail (transform-only animation) */}
                  {showDesktopRail && (
                    <span
                      aria-hidden
                      className="hidden lg:block absolute left-0 top-0 bottom-0 w-[2px] bg-[#22c55e] origin-left"
                      style={{
                        transform: isActive ? "scaleX(1)" : "scaleX(0)",
                        opacity: isActive ? 1 : 0,
                        transition: `transform 150ms ${ease}, opacity 150ms ${ease}`,
                        willChange: "transform, opacity",
                      }}
                    />
                  )}
                  <div className="grid grid-cols-[56px_1fr] md:grid-cols-[80px_1fr] gap-4 md:gap-6 max-md:p-5 lg:pl-8 lg:max-w-[700px]">
                    <div
                      className="mono text-[28px] tabular-nums"
                      style={{
                        color: isMobile
                          ? "#666"
                          : isTablet
                            ? "#666"
                            : isActive
                              ? "#f0f0f0"
                              : "#333",
                        fontWeight: isLgUp && isActive ? 700 : 400,
                        transform: headTransform,
                        opacity: contentOpacity,
                        transition: isLgUp
                          ? isActive
                            ? `color 250ms ${ease}, font-weight 250ms ${ease}, opacity 300ms ${ease} 50ms, transform 300ms ${ease} 50ms`
                            : `color 250ms ${ease}, font-weight 250ms ${ease}, opacity 200ms ${easeIn}, transform 200ms ${easeIn}`
                          : `color 400ms ${ease}`,
                        willChange: "opacity, transform",
                      }}
                    >
                      {s.n}
                    </div>
                    <div
                      style={{
                        opacity: contentOpacity,
                        transform: headTransform,
                        transition: isLgUp
                          ? isActive
                            ? `opacity 300ms ${ease} 50ms, transform 300ms ${ease} 50ms`
                            : `opacity 200ms ${easeIn}, transform 200ms ${easeIn}`
                          : undefined,
                        pointerEvents: contentPointer,
                        willChange: "opacity, transform",
                      }}
                    >
                      <div className="flex flex-wrap items-baseline gap-3">
                        <h3
                          className="headline text-[22px]"
                          style={{
                            color: compact ? "#f0f0f0" : isActive ? "#f0f0f0" : "#444",
                            transition: `color 250ms ${ease}`,
                          }}
                        >
                          {s.title}
                        </h3>
                        <span className="mono text-[11px] text-[#22c55e]">{s.cmd}</span>
                        <span className="mono text-[11px] text-[#444]">— {s.sub}</span>
                      </div>
                      <div
                        style={{
                          transform: contentTransform,
                          transition: isLgUp
                            ? isActive
                              ? `transform 300ms ${ease} 50ms`
                              : `transform 200ms ${easeIn}`
                            : undefined,
                          willChange: "transform",
                        }}
                      >
                        <p className="text-[#888] text-[15px] leading-[1.7] mt-3 max-w-[640px]">
                          {s.desc}
                        </p>
                        {s.bullets.length > 0 && (
                          <ul className="mt-4 space-y-1.5 mono text-[12px] text-[#666]">
                            {s.bullets.map((b) => (
                              <li key={b}>— {b}</li>
                            ))}
                          </ul>
                        )}
                        <TerminalBlock lines={s.output} />
                        <div className="mt-4 bg-[#111] border border-[#1e1e1e] rounded-[3px] px-4 py-3 max-w-[640px]">
                          <div className="mono text-[10px] uppercase tracking-[0.12em] text-[#22c55e]">
                            // did you know
                          </div>
                          <p className="text-[#666] text-[12.5px] leading-[1.65] mt-1.5">
                            {s.fact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: pipeline panel (desktop + tablet) */}
          {!isMobile && (
            <aside className="border border-[#1e1e1e] rounded-[3px] p-6 lg:sticky lg:top-24 relative overflow-hidden lg-sticky-element">
              {/* progress rail — desktop only, rAF-driven, no CSS transition */}
              <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[2px] bg-[#1a1a1a]">
                <div
                  className="w-full bg-[#22c55e]"
                  style={{
                    height: isLgUp ? "var(--section-fill, 0%)" : "0%",
                    willChange: "height",
                  }}
                />
              </div>
              <div className="eyebrow">// pipeline</div>
              <div className="mt-5 space-y-3 mono text-[12px]">
                {pipelineStages.map((p) => {
                  const on = isLgUp && activeSet.has(p);
                  const itemOpacity = isTablet ? 1 : on ? 1 : 0.35;
                  const dotColor = on ? "#22c55e" : isTablet ? "#666" : "#666";
                  const textColor = on ? "#22c55e" : isTablet ? "#888" : "#666";
                  return (
                    <div
                      key={p}
                      className="flex items-center gap-3"
                      style={{
                        opacity: itemOpacity,
                        WebkitTransition: `opacity 200ms ${ease}`,
                        transition: `opacity 200ms ${ease}`,
                        willChange: "opacity",
                      }}
                    >
                      <span
                        className={
                          on
                            ? "w-1.5 h-1.5 rounded-full shrink-0 pulse-dot"
                            : "w-1.5 h-1.5 rounded-full shrink-0"
                        }
                        style={{
                          background: dotColor,
                          opacity: on ? 1 : isTablet ? 1 : 0,
                          WebkitTransition: `background-color 200ms ${ease}, opacity ${on ? 200 : 150}ms ${ease}`,
                          transition: `background-color 200ms ${ease}, opacity ${on ? 200 : 150}ms ${ease}`,
                        }}
                      />
                      <span
                        style={{
                          color: textColor,
                          WebkitTransition: `color 200ms ${ease}`,
                          transition: `color 200ms ${ease}`,
                        }}
                      >
                        {p}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="hairline mt-6 pt-4 flex items-center justify-between mono text-[10px] text-[#444]">
                <span>cadence: weekly · sla: 5 business days</span>
                {isLgUp && (
                  <span className="tabular-nums text-[#666]">
                    {String(active + 1).padStart(2, "0")}/{String(steps.length).padStart(2, "0")}
                  </span>
                )}
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Evidence -------------------- */

function Evidence() {
  return (
    <section id="evidence" className="py-16 md:py-30 border-b border-[#1a1a1a]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 space-y-14">
        <SectionHead
          vol="VOL. V"
          label="THE EVIDENCE"
          title="Watch a real project improve"
          sub="A SaaS platform, 12 weeks under the service. Same scan, same scoring — only the numbers changed."
        />

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          <div className="space-y-3">
            <div className="mono text-[11px] text-[#444] uppercase tracking-[0.12em] font-medium">
              BEFORE — Week 0
            </div>
            <HealthCard
              file="baseline.json"
              status="archived"
              archived
              score={44}
              scoreTone="amber"
              metrics={[
                { label: "Performance", score: 42, tone: "red" },
                { label: "Security", score: 38, tone: "red" },
                { label: "Reliability", score: 55, tone: "amber" },
                { label: "Code Health", score: 47, tone: "red" },
              ]}
            />
          </div>

          <div className="flex lg:flex-col items-center justify-center mono text-[#22c55e] text-[28px]">
            <span className="lg:hidden">↓</span>
            <span className="hidden lg:block">→</span>
          </div>

          <div className="space-y-3">
            <div className="mono text-[11px] text-[#22c55e] uppercase tracking-[0.12em] font-medium">
              AFTER — Week 12
            </div>
            <HealthCard
              score={88}
              delta="↑ +44 since baseline"
              metrics={[
                { label: "Performance", score: 91 },
                { label: "Security", score: 86 },
                { label: "Reliability", score: 89 },
                { label: "Code Health", score: 84 },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Pricing -------------------- */

function Pricing() {
  const plans = [
    {
      name: "MAINTAIN",
      tag: "HOLD THE LINE",
      price: "$650",
      unit: "/mo",
      features: [
        "Weekly automated scan",
        "Up to 4 fixes/week",
        "Security patching",
        "Monthly health report",
      ],
      cta: "$ start --maintain",
      filled: false,
      featured: false,
    },
    {
      name: "GROWTH",
      tag: "MOST CHOSEN",
      price: "$1,500",
      unit: "/mo",
      features: [
        "Everything in Maintain",
        "Up to 12 fixes/week",
        "AI-assisted engineering",
        "Performance + reliability work",
        "Weekly report + roadmap",
      ],
      cta: "$ start --growth",
      filled: true,
      featured: true,
    },
    {
      name: "COMPOUND",
      tag: "FULL EVOLUTION",
      price: "Custom",
      unit: "",
      features: [
        "Everything in Growth",
        "Dedicated engineering pod",
        "Architecture modernization",
        "SLA-backed response times",
        "Quarterly strategy review",
      ],
      cta: "$ start --compound",
      filled: false,
      featured: false,
    },
  ];
  return (
    <section id="pricing" className="py-16 md:py-30 border-b border-[#1a1a1a]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 space-y-14">
        <SectionHead
          vol="VOL. VI"
          label="THE PRICING"
          title="Choose your improvement pace"
          sub="Every plan ships measurable improvements on a weekly cadence. Scale the throughput to match your product."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`pricing-card bg-[#111] rounded-[3px] p-7 flex flex-col ${p.featured ? "pricing-card-featured" : "pricing-card-standard"}`}
              style={{
                border: p.featured ? "2px solid #22c55e" : "1px solid #1e1e1e",
              }}
            >
              <div className="flex items-center justify-between">
                <div className="mono text-[12px] text-[#f0f0f0]">{p.name}</div>
                <div
                  className="mono text-[10px] tracking-[0.12em]"
                  style={{ color: p.featured ? "#22c55e" : "#444" }}
                >
                  {p.tag}
                </div>
              </div>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="mono font-semibold tabular-nums text-[#f0f0f0] text-[44px] leading-none">
                  {p.price}
                </span>
                {p.unit && (
                  <span className="mono text-[#666] text-[14px] tabular-nums">{p.unit}</span>
                )}
              </div>
              <ul className="mt-7 space-y-3 text-[14px] text-[#888]">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="text-[#444] mono">—</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#audit"
                className={`mt-8 mono text-[12px] text-center px-4 py-3 rounded-[3px] ${
                  p.filled
                    ? "btn-primary bg-[#22c55e] text-[#0c0c0c] font-semibold"
                    : "btn-outline border border-[#22c55e] text-[#22c55e]"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Results -------------------- */

function Results() {
  const items = [
    {
      type: "PERF",
      num: "-1.8s",
      title: "Cut largest contentful paint",
      desc: "Replaced a render-blocking bundle with route-level code splitting and edge caching.",
    },
    {
      type: "RELIABILITY",
      num: "99.98%",
      title: "Uptime over 90 days",
      desc: "Added circuit breakers, retries with backoff, and graceful degradation on the payment path.",
    },
    {
      type: "PERF",
      num: "+3.2x",
      title: "Faster API throughput",
      desc: "Introduced connection pooling and a read replica for the hottest query paths.",
    },
    {
      type: "SECURITY",
      num: "17",
      title: "Critical CVEs resolved",
      desc: "Patched cascading vulnerabilities across the dependency graph and locked transitive versions.",
    },
    {
      type: "COST",
      num: "-41%",
      title: "Cloud infrastructure spend",
      desc: "Right-sized compute, archived cold storage, and consolidated redundant queues.",
    },
    {
      type: "CODE HEALTH",
      num: "+38",
      title: "Maintainability index",
      desc: "Eliminated dead code, extracted shared modules, and added contract tests on critical paths.",
    },
  ];
  return (
    <section id="results" className="py-16 md:py-30 border-b border-[#1a1a1a]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 space-y-14">
        <SectionHead
          vol="VOL. VII"
          label="THE OUTCOMES"
          title="Real improvements, real numbers"
          sub="A sample from the changelog. Every entry is a shipped change with a measured outcome attached."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1e1e1e] border border-[#1e1e1e] rounded-[3px] overflow-hidden">
          {items.map((it) => (
            <div
              key={it.title}
              className="results-card bg-[#111] p-7 flex flex-col gap-4 border-l-2 border-[#1f1f1f]"
            >
              <div className="mono text-[10px] tracking-[0.12em] uppercase text-[#22c55e] font-medium">
                {it.type}
              </div>
              <div className="mono font-semibold tabular-nums text-[42px] leading-none text-[#f0f0f0]">
                {it.num}
              </div>
              <div className="text-[#f0f0f0] text-[15px] font-semibold">{it.title}</div>
              <div className="text-[#666] text-[13px] leading-[1.7]">{it.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Contact -------------------- */

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xkolddre";

function Contact() {
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

  const baseId = useId();
  const gdprConsentId = `${baseId}-gdpr-consent`;

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
          _subject: `New audit request — ${url}`,
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

  const errMsg = (msg: string | null | undefined) => {
    if (!msg) return null;
    return (
      <div className="mono text-[12px] text-[#ef4444] mt-1.5 field-error">
        {"// error: "}
        {msg}
      </div>
    );
  };

  const fieldClass = (invalid: boolean | null | undefined | string) =>
    "field" + (invalid ? " field-invalid" : "");

  return (
    <section id="audit" className="py-16 md:py-30 border-b border-[#1a1a1a]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 grid lg:grid-cols-[1fr_1fr] gap-14 lg:items-stretch">
        <div className="border-l-2 border-[#1f1f1f] pl-6 md:pl-8 lg:flex lg:items-center">
          <div className="max-w-[820px] space-y-4">
            <VolLabel vol="VOL. VIII" label="THE AUDIT" />
            <h2 className="headline text-[32px] md:text-[48px]">Get your free baseline audit.</h2>
            <p className="text-[#888] text-[16px] leading-[1.7]">
              We scan your product, score all four pillars, and send you a full report within 48
              hours. No access required beyond a URL.
            </p>
          </div>
        </div>

        <div className="border border-[#1e1e1e] rounded-[3px] bg-[#111] p-7 md:p-9">
          {submitted ? (
            <div className="mono text-[13px] space-y-2">
              <div className="text-[#22c55e]">{"> audit requested."}</div>
              <div className="text-[#888]">
                scanning: <span className="text-[#f0f0f0]">{submittedUrl}</span>
              </div>
              <div className="text-[#888]">
                expected delivery: <span className="text-[#f0f0f0]">48h</span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <span
                  className="pulse-dot"
                  style={{ width: 6, height: 6, borderRadius: 999, background: "#22c55e" }}
                />
                <span className="text-[#22c55e]">queued</span>
              </div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mono text-[10px] text-[#444] uppercase tracking-[0.12em] block mb-2">
                    name
                  </label>
                  <input
                    className={fieldClass(showError("name"))}
                    placeholder="ada lovelace"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {showError("name") && errMsg(errors.name)}
                </div>
                <div>
                  <label className="mono text-[10px] text-[#444] uppercase tracking-[0.12em] block mb-2">
                    work email
                  </label>
                  <input
                    type="email"
                    className={fieldClass(showError("email"))}
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {showError("email") && errMsg(errors.email)}
                </div>
              </div>
              <div>
                <label className="mono text-[10px] text-[#444] uppercase tracking-[0.12em] block mb-2">
                  product url
                </label>
                <input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onBlur={normalizeUrl}
                  className={fieldClass(showError("url"))}
                  placeholder="https://your-product.com"
                />
                {showError("url") && errMsg(errors.url)}
              </div>
              <div>
                <label className="mono text-[10px] text-[#444] uppercase tracking-[0.12em] block mb-2">
                  biggest concern
                </label>
                <select
                  className={`${fieldClass(showError("concern"))} ${!concern ? "text-[#444444]" : "text-[#f0f0f0]"}`}
                  value={concern}
                  onChange={(e) => setConcern(e.target.value)}
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
                {showError("concern") && errMsg(errors.concern)}
              </div>
              <div>
                <label className="mono text-[10px] text-[#444] uppercase tracking-[0.12em] block mb-2">
                  monthly cloud spend (optional)
                </label>
                <select
                  className={`field ${spend === "Prefer not to say" ? "text-[#444444]" : "text-[#f0f0f0]"}`}
                  value={spend}
                  onChange={(e) => setSpend(e.target.value)}
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
                  className="mt-1 w-4 h-4 rounded-sm border border-[#1e1e1e] bg-[#111111] accent-[#22c55e] cursor-pointer flex-shrink-0"
                />
                <label
                  htmlFor={gdprConsentId}
                  className="text-[#666] text-[13px] leading-relaxed font-sans cursor-pointer"
                >
                  I agree to receive follow-up emails about my audit results and SES service
                  updates. You can unsubscribe at any time.
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
                {submitting ? "// processing..." : "$ request --audit ↵"}
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
              <div className="mono text-[11px] text-center pt-1">
                <Link to="/audit" className="text-[#666] hover:text-[#22c55e] transition-colors">
                  {"// prefer a dedicated page? audit.ses.service →"}
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Final CTA -------------------- */

function FinalCTA() {
  return (
    <section className="py-16 md:py-30" style={{ background: "#22c55e", color: "#0c0c0c" }}>
      <div className="max-w-[820px] mx-auto px-6 md:px-10 border-l-2 border-[#0c0c0c]/30 pl-6 md:pl-8 space-y-6">
        <div className="mono text-[11px] uppercase tracking-[0.12em] text-[#0c0c0c]/70">
          {"// GET YOUR BASELINE"}
        </div>
        <h2 className="headline text-[#0c0c0c] text-[30px] sm:text-[36px] md:text-[56px] break-words">
          Find out how much your software has decayed.
        </h2>
        <p className="text-[#0c0c0c]/80 text-[16px] leading-[1.7] max-w-[640px]">
          The first audit is free. We scan your product, score its health, and show you exactly what
          is degrading — no commitment.
        </p>
        <div className="flex flex-wrap items-center gap-5 pt-2">
          <a
            href="#audit"
            className="btn-primary mono text-[13px] bg-[#0c0c0c] text-[#22c55e] px-5 py-3 rounded-[3px] font-semibold"
          >
            $ audit --free ↵
          </a>
          <a
            href="#pricing"
            className="mono text-[13px] text-[#0c0c0c] hover:underline transition-all"
          >
            view plans →
          </a>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Page -------------------- */

function Index() {
  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Software Evolution Service",
            alternateName: "SES",
            url: "https://softwareevolutionservice.com",
            description:
              "Weekly AI-assisted software improvement service. We ship measurable improvements to your product every week — performance, security, and code quality.",
            contactPoint: {
              "@type": "ContactPoint",
              email: "hi@softwareevolutionservice.com",
              contactType: "customer service",
              availableLanguage: "English",
            },
            offers: [
              {
                "@type": "Offer",
                name: "Free Baseline Audit",
                price: "0",
                priceCurrency: "USD",
                description:
                  "Free software health audit across 4 pillars — Performance, Security, Reliability, Code Health. Delivered within 48 hours.",
              },
              {
                "@type": "Offer",
                name: "Maintain Plan",
                price: "650",
                priceCurrency: "USD",
                billingIncrement: "month",
                description:
                  "Weekly automated scan, up to 4 fixes/week, security patching, monthly health report.",
              },
              {
                "@type": "Offer",
                name: "Growth Plan",
                price: "1500",
                priceCurrency: "USD",
                billingIncrement: "month",
                description:
                  "Everything in Maintain plus up to 12 fixes/week, AI-assisted engineering, weekly report and roadmap.",
              },
            ],
          }),
        }}
      />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Workflow />
        <Evidence />
        <Pricing />
        <Results />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
