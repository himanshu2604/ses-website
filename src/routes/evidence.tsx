import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Nav, Footer, HealthCard, VolLabel, Eyebrow } from "@/components/site";

export const Route = createFileRoute("/evidence")({
  head: () => ({
    meta: [
      { title: "Evidence — SES Software Evolution Service" },
      {
        name: "description",
        content:
          "Real projects, real Health Score movement. Same automated scan at Week 0 and Week 12 — no cherry-picked metrics.",
      },
      { property: "og:title", content: "Evidence — SES Software Evolution Service" },
      {
        property: "og:description",
        content: "Same scoring, every time. Watch real projects move their Health Score under SES.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://softwareevolutionservice.com/evidence" },
      { property: "og:image", content: "https://softwareevolutionservice.com/og.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Evidence — SES Software Evolution Service" },
      {
        name: "twitter:description",
        content: "Real projects. Real numbers. Same scoring every time.",
      },
      { name: "twitter:image", content: "https://softwareevolutionservice.com/og.svg" },
    ],
    links: [{ rel: "canonical", href: "https://softwareevolutionservice.com/evidence" }],
  }),
  component: EvidencePage,
});

/* -------------------- 12-week chart -------------------- */

function HealthChart() {
  const scores = [44, 48, 52, 55, 58, 61, 65, 69, 72, 76, 81, 85, 88];
  const w = 700;
  const h = 260;
  const padL = 44;
  const padR = 20;
  const padT = 24;
  const padB = 36;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;
  const min = 30;
  const max = 100;
  const x = (i: number) => padL + (i / (scores.length - 1)) * innerW;
  const y = (v: number) => padT + innerH - ((v - min) / (max - min)) * innerH;
  const pathD = scores
    .map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
    .join(" ");
  const avgY = y(61);

  const pathRef = useRef<SVGPathElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [lineLen, setLineLen] = useState(2000);

  useEffect(() => {
    if (pathRef.current) {
      try {
        setLineLen(Math.ceil(pathRef.current.getTotalLength()));
      } catch {
        /* noop */
      }
    }
  }, []);

  useEffect(() => {
    if (!wrapRef.current || inView) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.35 },
    );
    obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, [inView]);

  return (
    <div ref={wrapRef} className="border border-[#1e1e1e] rounded-[3px] bg-[#111] p-6 md:p-8">
      <div className="flex items-center justify-between mono text-[11px] mb-5">
        <span className="text-[#444]">score.trend</span>
        <span className="text-[#22c55e]">● 12-week progression</span>
      </div>
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          className="w-full h-auto min-w-[560px]"
          role="img"
          aria-label="Health score improving from 44 to 88 over 12 weeks"
        >
          {/* industry avg horizontal rule */}
          <line
            x1={padL}
            x2={w - padR}
            y1={avgY}
            y2={avgY}
            stroke="#333"
            strokeDasharray="3 4"
            strokeWidth={1}
          />
          <text
            x={w - padR}
            y={avgY - 6}
            textAnchor="end"
            fontFamily="'JetBrains Mono', monospace"
            fontSize={10}
            fill="#666"
          >
            industry avg: 61
          </text>

          {/* y-axis labels: 44, 61, 88 */}
          {[44, 61, 88].map((v) => (
            <text
              key={v}
              x={padL - 10}
              y={y(v) + 3}
              textAnchor="end"
              fontFamily="'JetBrains Mono', monospace"
              fontSize={10}
              fill="#666"
            >
              {v}
            </text>
          ))}

          {/* line — animated left-to-right on view */}
          <path
            ref={pathRef}
            d={pathD}
            stroke="#22c55e"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`chart-line ${inView ? "in" : ""}`}
            style={{ ["--line-len" as string]: `${lineLen}` }}
          />

          {/* points — fade in with the line */}
          {scores.map((v, i) => (
            <circle
              key={i}
              cx={x(i)}
              cy={y(v)}
              r={i === 0 || i === scores.length - 1 ? 4 : 2.5}
              fill="#22c55e"
              style={{
                opacity: inView ? 1 : 0,
                transition: `opacity 240ms ease-out ${400 + i * 30}ms`,
              }}
            />
          ))}

          {/* x-axis labels: week 0 and week 12 */}
          <text
            x={x(0)}
            y={h - 10}
            textAnchor="start"
            fontFamily="'JetBrains Mono', monospace"
            fontSize={10}
            fill="#666"
          >
            week 0
          </text>
          <text
            x={x(scores.length - 1)}
            y={h - 10}
            textAnchor="end"
            fontFamily="'JetBrains Mono', monospace"
            fontSize={10}
            fill="#666"
          >
            week 12
          </text>
        </svg>
      </div>
      <div className="hairline mt-6 pt-4 mono text-[10px] text-[#444] flex justify-between">
        <span>baseline: 44</span>
        <span>final: 88 · Δ +44</span>
      </div>
    </div>
  );
}

/* -------------------- Deep case columns -------------------- */

function ChangeColumn({
  label,
  delta,
  body,
  impact,
}: {
  label: string;
  delta: string;
  body: string;
  impact: string;
}) {
  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-[3px] p-6 border-l-2 border-l-[#1f1f1f] flex flex-col gap-4">
      <div className="mono text-[10px] tracking-[0.12em] uppercase text-[#22c55e] font-medium">
        {label}
      </div>
      <div className="mono text-[13px] text-[#22c55e] tabular-nums">{delta}</div>
      <p className="text-[#888] text-[14px] leading-[1.7]">{body}</p>
      <div className="hairline mt-auto pt-4">
        <div className="mono text-[10px] text-[#444] uppercase tracking-[0.12em]">impact</div>
        <div className="mono text-[22px] text-[#f0f0f0] tabular-nums mt-1.5">{impact}</div>
      </div>
    </div>
  );
}

/* -------------------- Summary case cards -------------------- */

function SummaryCase({
  title,
  timeline,
  from,
  to,
  delta,
  wins,
}: {
  title: string;
  timeline: string;
  from: number;
  to: number;
  delta: string;
  wins: string[];
}) {
  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-[3px] p-7 flex flex-col gap-5 border-l-2 border-l-[#1f1f1f]">
      <div className="flex items-center justify-between mono text-[11px]">
        <span className="text-[#444]">case.json</span>
        <span className="flex items-center gap-2 text-[#22c55e]">
          <span
            className="pulse-dot"
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "#22c55e",
              display: "inline-block",
            }}
          />
          live
        </span>
      </div>
      <div>
        <div className="mono text-[10px] tracking-[0.12em] uppercase text-[#666] font-medium">
          timeline: {timeline}
        </div>
        <h3 className="headline text-[22px] mt-3">{title}</h3>
      </div>
      <div className="flex items-baseline gap-4">
        <span className="mono text-[#666] text-[16px] tabular-nums">{from}</span>
        <span className="mono text-[#444]">→</span>
        <span className="mono text-[#f0f0f0] text-[16px] tabular-nums">{to}</span>
        <span className="mono font-semibold tabular-nums text-[#22c55e] text-[36px] leading-none ml-auto">
          {delta}
        </span>
      </div>
      <ul className="space-y-2.5 text-[13px] text-[#666] leading-[1.7]">
        {wins.map((w, i) => (
          <li key={i}>{w}</li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------- Page -------------------- */

function EvidencePage() {
  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <Nav />
      <main>
        {/* Hero */}
        <section className="pt-28 pb-16 md:pt-36 md:pb-30 border-b border-[#1a1a1a]">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="border-l-2 border-[#1f1f1f] pl-6 md:pl-8 max-w-[920px] space-y-5">
              <Eyebrow>{"// SOFTWARE EVOLUTION SERVICE"}</Eyebrow>
              <VolLabel vol="VOL. V" label="THE EVIDENCE" />
              <h1 className="headline text-[36px] md:text-[56px] leading-[1.05]">
                Real projects. Real numbers. Same scoring every time.
              </h1>
              <p className="text-[#888] text-[16px] md:text-[17px] leading-[1.7] max-w-[720px]">
                Every case below used the same automated Health Score scan at Week 0 and Week 12. No
                cherry-picked metrics — the score either moved or it didn't.
              </p>
            </div>
          </div>
        </section>

        {/* Primary case */}
        <section className="py-16 md:py-30 border-b border-[#1a1a1a]">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 space-y-12">
            <div className="mono text-[11px] tracking-[0.12em] text-[#22c55e] uppercase font-medium">
              {"// PRIMARY CASE — B2B SAAS PLATFORM"}
            </div>

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
              <div className="flex items-center justify-center mono text-[#22c55e] text-[28px]">
                <span className="lg:hidden">↓</span>
                <span className="hidden lg:inline">→</span>
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

            {/* What changed */}
            <div className="space-y-6">
              <div className="mono text-[11px] tracking-[0.12em] text-[#666] uppercase font-medium">
                {"// what changed"}
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <ChangeColumn
                  label="PERFORMANCE"
                  delta="// +49 points"
                  body="Replaced a render-blocking JS bundle with route-level code splitting. Added edge caching for static assets. Introduced connection pooling on the 3 highest-traffic API routes."
                  impact="-1.8s LCP"
                />
                <ChangeColumn
                  label="SECURITY"
                  delta="// +48 points"
                  body="Resolved 17 open CVEs across the dependency graph. Locked transitive versions. Patched auth middleware against CVE-2026-1142. Added automated dep-diff to every weekly scan."
                  impact="17 CVEs closed"
                />
                <ChangeColumn
                  label="CODE HEALTH"
                  delta="// +37 points"
                  body="Extracted 4 shared modules from duplicated logic. Removed 2,300 lines of dead code. Added contract tests on critical payment paths. Reduced cyclomatic complexity score from 34 to 11."
                  impact="+38 maintainability"
                />
              </div>
            </div>

            {/* Chart */}
            <div className="space-y-5">
              <div className="mono text-[11px] tracking-[0.12em] text-[#666] uppercase font-medium">
                {"// 12-week health score progression"}
              </div>
              <HealthChart />
            </div>
          </div>
        </section>

        {/* Additional cases */}
        <section className="py-16 md:py-30 border-b border-[#1a1a1a]">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 space-y-10">
            <div className="border-l-2 border-[#1f1f1f] pl-6 md:pl-8 max-w-[720px] space-y-3">
              <div className="mono text-[11px] tracking-[0.12em] text-[#22c55e] uppercase font-medium">
                {"// ADDITIONAL CASES"}
              </div>
              <p className="text-[#888] text-[15px] leading-[1.7]">
                Shorter engagements. Same methodology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <SummaryCase
                title="E-Commerce Checkout Platform"
                timeline="8 weeks"
                from={51}
                to={74}
                delta="+23"
                wins={[
                  "— Eliminated 9 abandoned-cart triggers caused by payment timeout errors (Reliability: 48 → 79)",
                  "— Cut average checkout load time from 4.1s to 2.3s (Performance: 53 → 81)",
                  "— Resolved 6 PCI-adjacent dependency vulnerabilities (Security: 52 → 68)",
                ]}
              />
              <SummaryCase
                title="Developer Tooling SaaS"
                timeline="6 weeks"
                from={63}
                to={81}
                delta="+18"
                wins={[
                  "— Reduced p95 API latency from 890ms to 340ms on core endpoints (Performance: 61 → 88)",
                  "— Cleared 340 lines of deprecated SDK calls ahead of vendor sunset (Code Health: 64 → 79)",
                  "— Added structured error logging — MTTD dropped from hours to under 4 minutes (Reliability: 66 → 78)",
                ]}
              />
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 md:py-30" style={{ background: "#22c55e", color: "#0c0c0c" }}>
          <div className="max-w-[820px] mx-auto px-6 md:px-10 border-l-2 border-[#0c0c0c]/30 pl-6 md:pl-8 space-y-6">
            <div className="mono text-[11px] uppercase tracking-[0.12em] text-[#0c0c0c]/70">
              {"// YOUR BASELINE"}
            </div>
            <h2 className="headline text-[#0c0c0c] text-[30px] sm:text-[36px] md:text-[56px] break-words">
              See where your product stands.
            </h2>
            <p className="text-[#0c0c0c]/80 text-[16px] leading-[1.7] max-w-[640px]">
              Your baseline audit is free. We run the same scan, score the same four pillars, and
              send you the results within 48 hours.
            </p>
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link
                to="/audit"
                className="btn-primary mono text-[13px] bg-[#0c0c0c] text-[#22c55e] px-5 py-3 rounded-[3px] font-semibold"
              >
                $ request --audit ↵
              </Link>
              <a href="/#pricing" className="mono text-[13px] text-[#0c0c0c] hover:underline">
                view pricing →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
