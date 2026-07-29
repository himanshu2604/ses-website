// ⚡ Bolt 2026-08-14: Reduce unused JavaScript on initial homepage load via lazy loading below-the-fold sections — expected impact: removes 16.96 kB (7.05 kB gzipped) of unused JS from the initial page load bundle
import { SectionHead, HealthCard } from "@/components/site";

export default function Evidence() {
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
