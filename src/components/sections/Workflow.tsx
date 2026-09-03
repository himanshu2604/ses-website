// ⚡ Bolt 2026-08-14: Reduce unused JavaScript on initial homepage load via lazy loading below-the-fold sections — expected impact: removes 16.96 kB (7.05 kB gzipped) of unused JS from the initial page load bundle
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SectionHead, VolLabel } from "@/components/site";

// ⚡ Bolt 2026-09-23: Streamline useIsLgUp to read mql.matches directly from event object and initial state — expected impact: Avoids redundant evaluation and layout recalculations on resize.
function useIsLgUp() {
  const [isLg, setIsLg] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const on = (e: MediaQueryListEvent) => setIsLg(e.matches);
    setIsLg(mql.matches);
    mql.addEventListener("change", on);
    return () => mql.removeEventListener("change", on);
  }, []);
  return isLg;
}

function TerminalBlock({ lines }: { lines: string[] }) {
  return (
    <div className="mt-5 border border-[#1e1e1e] rounded-[3px] bg-[#111] p-4 mono text-[12px] leading-[1.7]">
      {lines.map((line, i) => {
        const isCommand = line.startsWith("$ ");
        return (
          <div key={i} className={isCommand ? "text-[#22c55e]" : "text-[#999]"}>
            {line}
          </div>
        );
      })}
    </div>
  );
}

export default function Workflow() {
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
    let cachedSectionTop = 0;
    let cachedSectionHeight = 0;

    const updateCache = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      cachedSectionTop = rect.top + window.scrollY;
      cachedSectionHeight = rect.height;
    };

    const onScroll = () => {
      if (ticking || !section) return;
      ticking = true;
      requestAnimationFrame(() => {
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const denom = cachedSectionHeight - viewportHeight;
        const progress = denom > 0 ? (scrollY - cachedSectionTop) / denom : 0;
        const fill = Math.max(0, Math.min(1, progress)) * 100;
        section.style.setProperty("--section-fill", `${fill}%`);
        ticking = false;
      });
    };

    const handleResize = () => {
      updateCache();
      onScroll();
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            updateCache();
            window.addEventListener("scroll", onScroll, { passive: true });
            window.addEventListener("resize", handleResize, { passive: true });
            onScroll();
          } else {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", handleResize);
          }
        });
      },
      { rootMargin: "20% 0px" },
    );

    if (section) obs.observe(section);

    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-16 md:py-30 border-b border-[#1a1a1a]"
    >
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
          <div
            className={
              isMobile ? "space-y-4" : "space-y-px bg-[#1e1e1e] lg:bg-transparent lg:space-y-0"
            }
          >
            {steps.map((s, i) => {
              const isActive = isLgUp && i === active;
              const direction = isLgUp ? (i < active ? -1 : i > active ? 1 : 0) : 0;
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
                          ? "#999"
                          : isTablet
                            ? "#999"
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
                          <ul className="mt-4 space-y-1.5 mono text-[12px] text-[#999]">
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
                          <p className="text-[#999] text-[12.5px] leading-[1.65] mt-1.5">
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

          {!isMobile && (
            <aside className="border border-[#1e1e1e] rounded-[3px] p-6 lg:sticky lg:top-24 relative overflow-hidden lg-sticky-element">
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
                  const dotColor = on ? "#22c55e" : isTablet ? "#999" : "#999";
                  const textColor = on ? "#22c55e" : isTablet ? "#888" : "#999";
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
                  <span className="tabular-nums text-[#999]">
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
