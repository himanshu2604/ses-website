import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer, VolLabel, Eyebrow, AuditForm } from "@/components/site";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Free Baseline Audit — SES Software Evolution Service" },
      {
        name: "description",
        content:
          "Free Health Score audit. We scan your product, score all four pillars, and send you a full report within 48 hours — no access required beyond a URL.",
      },
      { property: "og:title", content: "Free Baseline Audit — SES" },
      {
        property: "og:description",
        content: "Score your software in 48 hours. No credentials, no repo access, no sales call.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://softwareevolutionservice.com/audit" },
      { property: "og:image", content: "https://softwareevolutionservice.com/og.svg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Free Baseline Audit — SES" },
      {
        name: "twitter:description",
        content: "Score your software in 48 hours. No credentials, no repo access, no sales call.",
      },
      { name: "twitter:image", content: "https://softwareevolutionservice.com/og.svg" },
    ],
    links: [{ rel: "canonical", href: "https://softwareevolutionservice.com/audit" }],
  }),
  component: AuditPage,
});

function TrustSignal({ label, body }: { label: string; body: string }) {
  return (
    <div className="space-y-2">
      <div className="mono text-[10px] tracking-[0.12em] uppercase text-[#22c55e] font-medium">
        {label}
      </div>
      <p className="text-[#888] text-[14px] leading-[1.7]">{body}</p>
    </div>
  );
}

function AuditPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      <Nav />
      <main>
        <section className="pt-28 pb-16 md:pt-36 md:pb-30 border-b border-[#1a1a1a]">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 grid lg:grid-cols-[1fr_1fr] gap-14 lg:items-stretch">
            {/* Left column */}
            <div className="border-l-2 border-[#1f1f1f] pl-6 md:pl-8 lg:flex lg:items-center">
              <div className="space-y-7">
                <Eyebrow>{"// SOFTWARE EVOLUTION SERVICE"}</Eyebrow>
                <VolLabel vol="VOL. VIII" label="THE AUDIT" />
                <h1 className="headline text-[36px] md:text-[56px] leading-[1.05]">
                  Get your free baseline audit.
                </h1>
                <p className="text-[#888] text-[16px] md:text-[17px] leading-[1.7] max-w-[520px]">
                  We scan your product, score all four pillars, and send you a full report within 48
                  hours. No access required beyond a URL.
                </p>
              </div>
            </div>

            {/* Right column: reused form */}
            <div className="lg:pl-6">
              <AuditForm />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-30 border-b border-[#1a1a1a]">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-10">
            <TrustSignal
              label="// no access required"
              body="We only need your product URL. No credentials, no repo access, no onboarding call."
            />
            <TrustSignal
              label="// 48 hour turnaround"
              body="Full Health Score report delivered to your inbox. Every pillar scored, every regression ranked."
            />
            <TrustSignal
              label="// no commitment"
              body="The baseline audit is free. No credit card, no trial, no sales call unless you want one."
            />
          </div>
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 mt-14">
            <div className="italic text-[#666] text-[14px] mono border-l border-[#22c55e] pl-4 max-w-[720px]">
              "Software doesn't stay finished. It either evolves or decays."
            </div>
          </div>
        </section>

        <section className="py-10 border-b border-[#1a1a1a]">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="mono text-[11px] text-[#444] text-center tabular-nums">
              {"// we have reviewed "}
              <span className="text-[#22c55e]">47</span>
              {" products to date. industry avg health score: "}
              <span className="text-[#22c55e]">61</span>
              {"."}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
