import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer, VolLabel, useInView } from "@/components/site";
import { Fragment } from "react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Plans & Pricing — SES Software Evolution Service" },
      {
        name: "description",
        content:
          "Everything each tier includes, side by side. Choose your continuous improvement pace — Maintain, Growth, or Compound.",
      },
      { property: "og:title", content: "Plans & Pricing — SES" },
      {
        property: "og:description",
        content:
          "Everything each tier includes, side by side. Choose your continuous improvement pace — Maintain, Growth, or Compound.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://softwareevolutionservice.com/pricing" },
      { property: "og:image", content: "https://softwareevolutionservice.com/og.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Plans & Pricing — SES" },
      {
        name: "twitter:description",
        content:
          "Everything each tier includes, side by side. Choose your continuous improvement pace — Maintain, Growth, or Compound.",
      },
      { name: "twitter:image", content: "https://softwareevolutionservice.com/og.svg" },
    ],
    links: [{ rel: "canonical", href: "https://softwareevolutionservice.com/pricing" }],
  }),
  component: PricingPage,
});

type FeatureRow = {
  name: string;
  maintain: boolean | string;
  growth: boolean | string;
  compound: boolean | string;
};

type FeatureGroup = {
  name: string;
  features: FeatureRow[];
};

const FEATURE_GROUPS: FeatureGroup[] = [
  {
    name: "Delivery",
    features: [
      { name: "Weekly automated scan", maintain: true, growth: true, compound: true },
      { name: "Security patching", maintain: true, growth: true, compound: true },
      { name: "Up to 4 fixes/month", maintain: true, growth: false, compound: false },
      {
        name: "Up to 12 fixes/month",
        maintain: false,
        growth: true,
        compound: "Uncapped via dedicated pod",
      },
      { name: "AI-assisted engineering", maintain: false, growth: true, compound: true },
      { name: "Performance + reliability work", maintain: false, growth: true, compound: true },
      { name: "Architecture modernization", maintain: false, growth: false, compound: true },
    ],
  },
  {
    name: "Intelligence",
    features: [
      { name: "Monthly health report", maintain: true, growth: true, compound: true },
      { name: "Cloud cost optimization (Fin)", maintain: false, growth: true, compound: true },
      {
        name: "Analytics & behavior intelligence (Pulse)",
        maintain: false,
        growth: true,
        compound: true,
      },
      {
        name: "Industry benchmarking (vs. HTTP Archive/CrUX data)",
        maintain: false,
        growth: true,
        compound: true,
      },
      {
        name: "Evolution Timeline (score history, visualized)",
        maintain: false,
        growth: true,
        compound: true,
      },
    ],
  },
  {
    name: "Support",
    features: [
      { name: "Weekly report + roadmap", maintain: false, growth: true, compound: true },
      { name: "Dedicated engineering pod", maintain: false, growth: false, compound: true },
      { name: "SLA-backed response times", maintain: false, growth: false, compound: true },
      { name: "Quarterly strategy review", maintain: false, growth: false, compound: true },
    ],
  },
];

function PricingPage() {
  const { ref, seen } = useInView<HTMLDivElement>(0.15);

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#f0f0f0]">
      <Nav />
      <main>
        {/* Header section with back-link */}
        <section className="pt-28 pb-6 md:pt-36 md:pb-8 border-b border-[#1a1a1a]">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 space-y-6">
            <div className="flex items-center">
              <Link
                to="/"
                className="inline-block mono text-[12px] text-[#666] hover:text-[#22c55e] transition-colors"
              >
                ← Back to home
              </Link>
            </div>

            <div className="border-l-2 border-[#1f1f1f] pl-6 md:pl-8 space-y-4">
              <VolLabel vol="VOL. VI" label="THE PLANS" />
              <h1 className="headline text-[36px] md:text-[56px] leading-[1.05]">
                Plans, in full.
              </h1>
              <p className="text-[#888] text-[16px] md:text-[17px] leading-[1.7] max-w-[520px]">
                Everything each tier includes, side by side.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section
          ref={ref}
          className={`pt-8 pb-16 md:pt-12 md:pb-24 max-w-[1280px] mx-auto px-6 md:px-10 reveal ${
            seen ? "in" : ""
          }`}
        >
          {/* Desktop Table: visible on md and up */}
          <div className="hidden md:block overflow-x-auto border border-[#1e1e1e] rounded-[3px] bg-[#111]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1e1e1e]">
                  <th className="p-6 mono text-[11px] text-[#666] uppercase tracking-[0.12em] w-2/5 sticky top-[64px] z-30 bg-[#0c0c0c]">
                    Feature
                  </th>
                  <th className="p-6 mono w-1/5 sticky top-[64px] z-30 bg-[#0c0c0c]">
                    <div className="text-[12px] text-[#f0f0f0]">MAINTAIN</div>
                    <div className="text-[11px] text-[#666] font-sans font-normal normal-case leading-snug mt-1 max-w-[150px]">
                      For stable apps needing continuous security & monitoring.
                    </div>
                    <div className="text-[20px] font-semibold text-[#f0f0f0] mt-2 tabular-nums">
                      $650<span className="text-[12px] text-[#666] font-normal">/mo</span>
                    </div>
                  </th>
                  <th className="p-6 mono w-1/5 relative sticky top-[64px] z-30 bg-[#0d1510]">
                    <div className="absolute top-3 right-6 text-[9px] text-[#22c55e] border border-[#22c55e]/30 px-1.5 py-0.5 rounded-[2px] uppercase tracking-wider badge-pulse">
                      MOST CHOSEN
                    </div>
                    <div className="text-[12px] text-[#22c55e]">GROWTH</div>
                    <div className="text-[11px] text-[#666] font-sans font-normal normal-case leading-snug mt-1 max-w-[150px]">
                      For active products scaling and shipping features.
                    </div>
                    <div className="text-[20px] font-semibold text-[#f0f0f0] mt-2 tabular-nums">
                      $1,500<span className="text-[12px] text-[#666] font-normal">/mo</span>
                    </div>
                  </th>
                  <th className="p-6 mono w-1/5 sticky top-[64px] z-30 bg-[#0c0c0c]">
                    <div className="text-[12px] text-[#f0f0f0]">COMPOUND</div>
                    <div className="text-[11px] text-[#666] font-sans font-normal normal-case leading-snug mt-1 max-w-[150px]">
                      For complex platforms requiring custom modernization.
                    </div>
                    <div className="text-[20px] font-semibold text-[#f0f0f0] mt-2">
                      Starting at $3,000/mo
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e1e]">
                {FEATURE_GROUPS.map((group) => (
                  <Fragment key={group.name}>
                    {/* Subheader row styled like VolLabel */}
                    <tr className="bg-[#161616]/60">
                      <td
                        colSpan={4}
                        className="p-4 pl-6 mono text-[11px] tracking-[0.12em] text-[#444] uppercase font-medium"
                      >
                        <span className="text-[#22c55e]">GROUP</span>{" "}
                        <span className="text-[#444]">—</span>{" "}
                        <span className="text-[#666]">{group.name}</span>
                      </td>
                    </tr>
                    {group.features.map((row) => (
                      <tr key={row.name} className="pricing-row transition-colors">
                        <td className="p-6 text-[14px] text-[#888] font-medium font-sans">
                          {row.name}
                        </td>
                        <td className="p-6 mono text-[14px] tabular-nums">
                          {row.maintain === true ? (
                            <span className="text-[#22c55e] check-mark">✓</span>
                          ) : row.maintain === false ? (
                            <span className="text-[#444]">—</span>
                          ) : (
                            <span className="text-[#f0f0f0]">{row.maintain}</span>
                          )}
                        </td>
                        <td className="p-6 mono text-[14px] tabular-nums bg-[#22c55e]/[0.03]">
                          {row.growth === true ? (
                            <span className="text-[#22c55e] check-mark">✓</span>
                          ) : row.growth === false ? (
                            <span className="text-[#444]">—</span>
                          ) : (
                            <span className="text-[#f0f0f0]">{row.growth}</span>
                          )}
                        </td>
                        <td className="p-6 mono text-[14px] tabular-nums">
                          {row.compound === true ? (
                            <span className="text-[#22c55e] check-mark">✓</span>
                          ) : row.compound === false ? (
                            <span className="text-[#444]">—</span>
                          ) : (
                            <span className="text-[#f0f0f0]">{row.compound}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}

                {/* CTA Row */}
                <tr className="bg-[#0c0c0c]/30">
                  <td className="p-6"></td>
                  <td className="p-6">
                    <Link
                      to="/#audit"
                      className="block mono text-[12px] text-center px-4 py-3 rounded-[3px] border border-[#22c55e] text-[#22c55e] btn-outline btn-pricing-outline cursor-pointer"
                    >
                      $ start --maintain
                    </Link>
                  </td>
                  <td className="p-6 bg-[#22c55e]/[0.03]">
                    <Link
                      to="/#audit"
                      className="block mono text-[12px] text-center px-4 py-3 rounded-[3px] btn-primary bg-[#22c55e] text-[#0c0c0c] font-semibold btn-pricing-filled cursor-pointer"
                    >
                      $ start --growth
                    </Link>
                  </td>
                  <td className="p-6">
                    <Link
                      to="/#audit"
                      className="block mono text-[12px] text-center px-4 py-3 rounded-[3px] border border-[#22c55e] text-[#22c55e] btn-outline btn-pricing-outline cursor-pointer"
                    >
                      $ start --compound
                    </Link>
                  </td>
                </tr>

                {/* Callout Box Row */}
                <tr>
                  <td colSpan={4} className="p-6">
                    <div className="max-w-[700px] mx-auto p-4 bg-[#1a2a1a] border-l-2 border-[#22c55e] rounded-[3px] mono text-[11px] text-[#22c55e] leading-relaxed text-center">
                      {"// you define what the AI can and cannot touch. Your codebase. Your rules."}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked View: visible on smaller viewports */}
          <div className="block md:hidden space-y-8">
            {[
              {
                name: "MAINTAIN",
                price: "$650/mo",
                description: "For stable apps needing continuous security & monitoring.",
                tag: "HOLD THE LINE",
                featured: false,
                key: "maintain" as const,
                cta: "$ start --maintain",
              },
              {
                name: "GROWTH",
                price: "$1,500/mo",
                description: "For active products scaling and shipping features.",
                tag: "MOST CHOSEN",
                featured: true,
                key: "growth" as const,
                cta: "$ start --growth",
              },
              {
                name: "COMPOUND",
                price: "Starting at $3,000/mo",
                description: "For complex platforms requiring custom modernization.",
                tag: "FULL EVOLUTION",
                featured: false,
                key: "compound" as const,
                cta: "$ start --compound",
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`rounded-[3px] p-6 border flex flex-col ${
                  tier.featured ? "bg-[#121a14] border-[#22c55e]" : "bg-[#111] border-[#1e1e1e]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="mono text-[14px] font-bold text-[#f0f0f0]">{tier.name}</span>
                  {tier.featured ? (
                    <span className="mono text-[10px] tracking-[0.12em] text-[#22c55e] border border-[#22c55e]/30 px-1.5 py-0.5 rounded-[2px] badge-pulse">
                      {tier.tag}
                    </span>
                  ) : (
                    <span className="mono text-[10px] tracking-[0.12em] text-[#444]">
                      {tier.tag}
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-[#666] font-sans mt-1">{tier.description}</div>

                <div className="mt-3 mono text-[24px] font-semibold text-[#f0f0f0] tabular-nums">
                  {tier.price}
                </div>

                <div className="mt-6 border-t border-[#1e1e1e] pt-4 space-y-6 flex-grow">
                  {FEATURE_GROUPS.map((group) => (
                    <div key={group.name} className="space-y-3">
                      <div className="mono text-[11px] tracking-[0.12em] text-[#444] uppercase font-medium border-b border-[#1e1e1e]/50 pb-1.5">
                        <span className="text-[#22c55e]">GROUP</span>{" "}
                        <span className="text-[#444]">—</span>{" "}
                        <span className="text-[#666]">{group.name}</span>
                      </div>
                      {group.features.map((f) => {
                        const hasFeature = f[tier.key];
                        return (
                          <div
                            key={f.name}
                            className="flex items-center justify-between text-[13px]"
                          >
                            <span className="text-[#888]">{f.name}</span>
                            <span className="mono">
                              {hasFeature === true ? (
                                <span className="text-[#22c55e]">✓</span>
                              ) : hasFeature === false ? (
                                <span className="text-[#444]">—</span>
                              ) : (
                                <span className="text-[#f0f0f0]">{hasFeature}</span>
                              )}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Link
                    to="/#audit"
                    className={`block mono text-[12.5px] text-center px-4 py-3 rounded-[3px] cursor-pointer ${
                      tier.featured
                        ? "btn-primary bg-[#22c55e] text-[#0c0c0c] font-semibold btn-pricing-filled"
                        : "btn-outline border border-[#22c55e] text-[#22c55e] btn-pricing-outline"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            ))}

            <div className="p-4 bg-[#1a2a1a] border-l-2 border-[#22c55e] rounded-[3px] mono text-[11px] text-[#22c55e] leading-relaxed text-center mx-auto max-w-[400px]">
              {"// you define what the AI can and cannot touch. Your codebase. Your rules."}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
