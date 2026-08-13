// ⚡ Bolt 2026-08-14: Reduce unused JavaScript on initial homepage load via lazy loading below-the-fold sections — expected impact: removes 16.96 kB (7.05 kB gzipped) of unused JS from the initial page load bundle
// 🎨 Palette 2026-09-08: Bridge selection context from homepage pricing cards directly to lead-gen AuditForm — Improves same-page activation flow and intent alignment by pre-selecting plan.
import { Link } from "@tanstack/react-router";
import { SectionHead } from "@/components/site";

export default function Pricing() {
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
                  <span className="mono text-[#999] text-[14px] tabular-nums">{p.unit}</span>
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
              <Link
                to="/"
                hash="audit"
                search={{ plan: p.name.toLowerCase() }}
                className={`mt-8 mono text-[12px] text-center px-4 py-3 rounded-[3px] cursor-pointer ${
                  p.filled
                    ? "btn-primary bg-[#22c55e] text-[#0c0c0c] font-semibold"
                    : "btn-outline border border-[#22c55e] text-[#22c55e]"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/pricing"
            className="inline-block mono text-[12.5px] text-[#999] hover:text-[#22c55e] transition-colors"
          >
            → See full plan details
          </Link>
        </div>
      </div>
    </section>
  );
}
