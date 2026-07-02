import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, Footer, Eyebrow, VolLabel } from "@/components/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SES" },
      { name: "description", content: "Why we built Software Evolution Service — separating shipping from continuous improvement." },
      { property: "og:title", content: "About — SES" },
      { property: "og:description", content: "Why we built Software Evolution Service — separating shipping from continuous improvement." },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-[#1f1f1f] pl-6 md:pl-8 space-y-4">
      <div className="mono text-[11px] uppercase tracking-[0.12em] text-[#666]">{label}</div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#f0f0f0]">
      <Nav />
      <main>
        <section className="pt-28 pb-16 md:pt-36 md:pb-24 border-b border-[#1a1a1a]">
          <div className="max-w-[900px] mx-auto px-6 md:px-10 space-y-5">
            <VolLabel vol="VOL. 0" label="THE ORIGIN" />
            <h1 className="headline text-[36px] md:text-[56px]">Why we built this.</h1>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-[900px] mx-auto px-6 md:px-10 space-y-14">
            <Block label="// THE OBSERVATION">
              <p className="text-[#666] text-[16px] md:text-[17px] leading-[1.7]">
                Most software teams ship a product, celebrate the launch, and move on to the next feature. Within months, the codebase that felt clean at launch is accumulating dependency debt, unresolved CVEs, and performance regressions nobody has time to address. Not because the team is bad — because continuous improvement competes with continuous shipping, and shipping always wins.
              </p>
            </Block>

            <Block label="// THE RESPONSE">
              <p className="text-[#666] text-[16px] md:text-[17px] leading-[1.7]">
                SES exists to separate those two concerns. We run the improvement loop — scanning, prioritizing, engineering, verifying — on a fixed weekly cadence so your team never has to choose between building new things and keeping existing things healthy. Every week, measurable. Every change, evidenced.
              </p>
            </Block>

            <Block label="// THE PHILOSOPHY">
              <blockquote className="mono text-[20px] md:text-[26px] leading-[1.4] text-[#f0f0f0]">
                "Software doesn't stay finished. It either evolves or decays."
              </blockquote>
              <p className="text-[#666] text-[16px] md:text-[17px] leading-[1.7]">
                That line drives every decision we make about what to fix, how to prioritize it, and how to prove it worked.
              </p>
            </Block>
          </div>
        </section>

        <section className="py-16 md:py-24 border-t border-[#1a1a1a]" style={{ background: "#0a0a0a" }}>
          <div className="max-w-[900px] mx-auto px-6 md:px-10 space-y-8">
            <h2 className="headline text-[28px] md:text-[40px]">See where your product stands.</h2>
            <div className="flex flex-wrap items-center gap-5">
              <Link
                to="/audit"
                className="btn-primary mono text-[13px] bg-[#22c55e] text-[#0c0c0c] px-5 py-3 rounded-[3px] font-semibold"
              >
                $ request --audit ↵
              </Link>
              <Link to="/evidence" className="nav-link mono text-[13px] text-[#22c55e]">
                view the evidence →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
