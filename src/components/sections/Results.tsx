// ⚡ Bolt 2026-08-14: Reduce unused JavaScript on initial homepage load via lazy loading below-the-fold sections — expected impact: removes 16.96 kB (7.05 kB gzipped) of unused JS from the initial page load bundle
import { SectionHead } from "@/components/site";

export default function Results() {
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
              <div className="text-[#999] text-[13px] leading-[1.7]">{it.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
