import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer, Eyebrow } from "@/components/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — SES" },
      { name: "description", content: "Terms of service for Software Evolution Service subscriptions." },
      { property: "og:title", content: "Terms of Service — SES" },
      { property: "og:description", content: "Terms of service for Software Evolution Service subscriptions." },
      { property: "og:url", content: "/terms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

const sections: Array<{ title: string; body: string }> = [
  { title: "1. The service", body: "Software Evolution Service (SES) provides weekly AI-assisted software improvement as a subscription. Each engagement begins with a free baseline audit. Paid plans commence upon written agreement and payment of the first month." },
  { title: "2. What we deliver", body: "Each week we deliver: a Health Score scan across four pillars (Performance, Security, Experience Quality, Code Health), a prioritized list of regressions, AI-generated pull requests with evidence attached, and a written changelog. Delivery cadence is weekly. SLA for PR delivery is 5 business days per cycle." },
  { title: "3. What we need from you", body: "Access to your code repository (read/write for PRs), a staging environment for verification, and a designated reviewer with merge authority. We do not require production access beyond your product URL." },
  { title: "4. Payment", body: "Subscriptions are billed monthly in advance. All prices are in USD. No refunds are issued for partial months. Subscriptions may be cancelled with 30 days written notice to hi@ses.service." },
  { title: "5. Intellectual property", body: "All code delivered via pull requests becomes your property upon merge. We retain no rights to your codebase or derived works. Our methodology, Health Score algorithm, and tooling remain proprietary to SES." },
  { title: "6. Limitation of liability", body: "SES is not liable for incidents, data loss, or downtime arising from merged pull requests. All PRs are reviewed and approved by your designated reviewer before production deployment — merge authority rests with your team, not ours." },
  { title: "7. Governing law", body: "These terms are governed by the laws of India. Disputes shall be resolved by mutual agreement before any formal proceedings." },
  { title: "8. Contact", body: "For any questions about these terms: hi@ses.service" },
];

function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#f0f0f0]">
      <Nav />
      <main>
        <section className="pt-28 pb-16 md:pt-36 md:pb-24 border-b border-[#1a1a1a]">
          <div className="max-w-[820px] mx-auto px-6 md:px-10 space-y-5">
            <Eyebrow>{"// LEGAL"}</Eyebrow>
            <h1 className="headline text-[36px] md:text-[56px]">Terms of Service</h1>
            <p className="mono text-[13px] text-[#666]">Last updated: July 2026</p>
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="max-w-[820px] mx-auto px-6 md:px-10 space-y-12">
            {sections.map((s) => (
              <div key={s.title} className="space-y-3">
                <h2 className="font-sans font-semibold text-[20px] md:text-[22px] text-[#f0f0f0]">{s.title}</h2>
                <p className="text-[#666] text-[15px] md:text-[16px] leading-[1.7]">{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
