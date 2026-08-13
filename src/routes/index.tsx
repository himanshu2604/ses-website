// ⚡ Bolt 2026-08-14: Reduce unused JavaScript on initial homepage load via lazy loading below-the-fold sections — expected impact: removes 16.96 kB (7.05 kB gzipped) of unused JS from the initial page load bundle
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useId, lazy, Suspense } from "react";
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

// Lazy-loaded below-the-fold components
const Workflow = lazy(() => import("@/components/sections/Workflow"));
const Evidence = lazy(() => import("@/components/sections/Evidence"));
const Pricing = lazy(() => import("@/components/sections/Pricing"));
const Results = lazy(() => import("@/components/sections/Results"));

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      plan: typeof search.plan === "string" ? search.plan : undefined,
    };
  },
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
      { property: "og:url", content: "https://www.softwareevolutionservice.com" },
      { property: "og:image", content: "https://www.softwareevolutionservice.com/og.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SES — Software Evolution Service" },
      {
        name: "twitter:description",
        content:
          "Your software is getting worse every week. We fix that. Weekly AI-assisted improvements, measured by your Health Score.",
      },
      { name: "twitter:image", content: "https://www.softwareevolutionservice.com/og.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.softwareevolutionservice.com" }],
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
          <div className="pt-2 italic text-[#999] text-[14px] mono border-l border-[#22c55e] pl-4">
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
              <div className="mono text-[11px] text-[#999] mt-3 uppercase tracking-[0.12em]">
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
                    <div className="text-[#999] text-[13px] leading-[1.6] mt-1.5">{s.desc}</div>
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

/* -------------------- Contact -------------------- */

function Contact() {
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

        <div>
          <AuditForm showDedicatedLink />
        </div>
      </div>
    </section>
  );
}

/* -------------------- Final CTA -------------------- */

// 🎨 Palette 2026-08-04: Resolve site-wide text contrast accessibility failures by upgrading secondary/muted-text to a WCAG AA-compliant gray (#999) — Elevates accessibility, bringing contrast ratio from 3.32:1 to 6.58:1.
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
            url: "https://www.softwareevolutionservice.com",
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
        <Suspense
          fallback={
            <section
              id="process"
              className="py-16 md:py-30 border-b border-[#1a1a1a] min-h-[400px]"
            />
          }
        >
          <Workflow />
        </Suspense>
        <Suspense
          fallback={
            <section
              id="evidence"
              className="py-16 md:py-30 border-b border-[#1a1a1a] min-h-[300px]"
            />
          }
        >
          <Evidence />
        </Suspense>
        <Suspense
          fallback={
            <section
              id="pricing"
              className="py-16 md:py-30 border-b border-[#1a1a1a] min-h-[400px]"
            />
          }
        >
          <Pricing />
        </Suspense>
        <Suspense
          fallback={
            <section
              id="results"
              className="py-16 md:py-30 border-b border-[#1a1a1a] min-h-[300px]"
            />
          }
        >
          <Results />
        </Suspense>
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
