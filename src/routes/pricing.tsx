import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer, Eyebrow, VolLabel } from "@/components/site";

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

const FEATURES: FeatureRow[] = [
  { name: "Weekly automated scan", maintain: true, growth: true, compound: true },
  { name: "Security patching", maintain: true, growth: true, compound: true },
  { name: "Monthly health report", maintain: true, growth: true, compound: true },
  { name: "Up to 4 fixes/week", maintain: true, growth: false, compound: false },
  { name: "Up to 12 fixes/week", maintain: false, growth: true, compound: true },
  { name: "AI-assisted engineering", maintain: false, growth: true, compound: true },
  { name: "Performance + reliability work", maintain: false, growth: true, compound: true },
  { name: "Weekly report + roadmap", maintain: false, growth: true, compound: true },
  { name: "Dedicated engineering pod", maintain: false, growth: false, compound: true },
  { name: "Architecture modernization", maintain: false, growth: false, compound: true },
  { name: "SLA-backed response times", maintain: false, growth: false, compound: true },
  { name: "Quarterly strategy review", maintain: false, growth: false, compound: true },
];

function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#f0f0f0]">
      <Nav />
      <main>
        {/* Header section with back-link */}
        <section className="pt-28 pb-12 md:pt-36 md:pb-16 border-b border-[#1a1a1a]">
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
        <section className="py-16 md:py-24 max-w-[1280px] mx-auto px-6 md:px-10">
          {/* Desktop Table: visible on md and up */}
          <div className="hidden md:block overflow-x-auto border border-[#1e1e1e] rounded-[3px] bg-[#111]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1e1e1e] bg-[#0c0c0c]">
                  <th className="p-6 mono text-[11px] text-[#666] uppercase tracking-[0.12em] w-2/5">
                    Feature
                  </th>
                  <th className="p-6 mono w-1/5">
                    <div className="text-[12px] text-[#f0f0f0]">MAINTAIN</div>
                    <div className="text-[20px] font-semibold text-[#f0f0f0] mt-1 tabular-nums">
                      $650<span className="text-[12px] text-[#666] font-normal">/mo</span>
                    </div>
                  </th>
                  <th className="p-6 mono w-1/5 relative">
                    <div className="absolute top-3 right-6 text-[9px] text-[#22c55e] border border-[#22c55e]/30 px-1.5 py-0.5 rounded-[2px] uppercase tracking-wider">
                      MOST CHOSEN
                    </div>
                    <div className="text-[12px] text-[#22c55e]">GROWTH</div>
                    <div className="text-[20px] font-semibold text-[#f0f0f0] mt-1 tabular-nums">
                      $1,500<span className="text-[12px] text-[#666] font-normal">/mo</span>
                    </div>
                  </th>
                  <th className="p-6 mono w-1/5">
                    <div className="text-[12px] text-[#f0f0f0]">COMPOUND</div>
                    <div className="text-[20px] font-semibold text-[#f0f0f0] mt-1">Custom</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e1e]">
                {FEATURES.map((row) => (
                  <tr key={row.name} className="hover:bg-[#161616] transition-colors">
                    <td className="p-6 text-[14px] text-[#888] font-medium font-sans">
                      {row.name}
                    </td>
                    <td className="p-6 mono text-[14px] tabular-nums">
                      {row.maintain === true ? (
                        <span className="text-[#22c55e]">✓</span>
                      ) : row.maintain === false ? (
                        <span className="text-[#444]">—</span>
                      ) : (
                        <span className="text-[#f0f0f0]">{row.maintain}</span>
                      )}
                    </td>
                    <td className="p-6 mono text-[14px] tabular-nums">
                      {row.growth === true ? (
                        <span className="text-[#22c55e]">✓</span>
                      ) : row.growth === false ? (
                        <span className="text-[#444]">—</span>
                      ) : (
                        <span className="text-[#f0f0f0]">{row.growth}</span>
                      )}
                    </td>
                    <td className="p-6 mono text-[14px] tabular-nums">
                      {row.compound === true ? (
                        <span className="text-[#22c55e]">✓</span>
                      ) : row.compound === false ? (
                        <span className="text-[#444]">—</span>
                      ) : (
                        <span className="text-[#f0f0f0]">{row.compound}</span>
                      )}
                    </td>
                  </tr>
                ))}

                {/* CTA Row */}
                <tr className="bg-[#0c0c0c]/30">
                  <td className="p-6"></td>
                  <td className="p-6">
                    <Link
                      to="/#audit"
                      className="block mono text-[12px] text-center px-4 py-3 rounded-[3px] border border-[#22c55e] text-[#22c55e] btn-outline"
                    >
                      $ start --maintain
                    </Link>
                  </td>
                  <td className="p-6">
                    <Link
                      to="/#audit"
                      className="block mono text-[12px] text-center px-4 py-3 rounded-[3px] btn-primary bg-[#22c55e] text-[#0c0c0c] font-semibold"
                    >
                      $ start --growth
                    </Link>
                  </td>
                  <td className="p-6">
                    <Link
                      to="/#audit"
                      className="block mono text-[12px] text-center px-4 py-3 rounded-[3px] border border-[#22c55e] text-[#22c55e] btn-outline"
                    >
                      $ start --compound
                    </Link>
                  </td>
                </tr>

                {/* Callout Box Row */}
                <tr>
                  <td colSpan={3}></td>
                  <td className="p-6 align-top">
                    <div className="p-4 bg-[#1a2a1a] border-l-2 border-[#22c55e] rounded-[3px] mono text-[11px] text-[#22c55e] leading-relaxed">
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
                tag: "HOLD THE LINE",
                featured: false,
                key: "maintain" as const,
                cta: "$ start --maintain",
              },
              {
                name: "GROWTH",
                price: "$1,500/mo",
                tag: "MOST CHOSEN",
                featured: true,
                key: "growth" as const,
                cta: "$ start --growth",
              },
              {
                name: "COMPOUND",
                price: "Custom",
                tag: "FULL EVOLUTION",
                featured: false,
                key: "compound" as const,
                cta: "$ start --compound",
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className="bg-[#111] rounded-[3px] p-6 border flex flex-col"
                style={{
                  borderColor: tier.featured ? "#22c55e" : "#1e1e1e",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="mono text-[14px] font-bold text-[#f0f0f0]">{tier.name}</span>
                  <span
                    className="mono text-[10px] tracking-[0.12em]"
                    style={{ color: tier.featured ? "#22c55e" : "#444" }}
                  >
                    {tier.tag}
                  </span>
                </div>
                <div className="mt-3 mono text-[24px] font-semibold text-[#f0f0f0] tabular-nums">
                  {tier.price}
                </div>

                <div className="mt-6 border-t border-[#1e1e1e] pt-4 space-y-3 flex-grow">
                  {FEATURES.map((f) => {
                    const hasFeature = f[tier.key];
                    return (
                      <div key={f.name} className="flex items-center justify-between text-[13px]">
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

                {tier.key === "compound" && (
                  <div className="mt-6 p-4 bg-[#1a2a1a] border-l-2 border-[#22c55e] rounded-[3px] mono text-[11px] text-[#22c55e] leading-relaxed">
                    {"// you define what the AI can and cannot touch. Your codebase. Your rules."}
                  </div>
                )}

                <div className="mt-6">
                  <Link
                    to="/#audit"
                    className={`block mono text-[12.5px] text-center px-4 py-3 rounded-[3px] ${
                      tier.featured
                        ? "btn-primary bg-[#22c55e] text-[#0c0c0c] font-semibold"
                        : "btn-outline border border-[#22c55e] text-[#22c55e]"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
