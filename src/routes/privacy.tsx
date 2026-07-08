import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer, Eyebrow } from "@/components/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SES" },
      {
        name: "description",
        content: "How Software Evolution Service collects, uses, and protects your data.",
      },
      { property: "og:title", content: "Privacy Policy — SES" },
      {
        property: "og:description",
        content: "How Software Evolution Service collects, uses, and protects your data.",
      },
      { property: "og:url", content: "/privacy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

const sections: Array<{ title: string; body: string }> = [
  {
    title: "1. What we collect",
    body: "When you submit the free audit form, we collect your name, work email address, and product URL. If you provide it, we also collect your monthly cloud spend range. We do not collect payment information — billing is handled by our payment processor directly.",
  },
  {
    title: "2. How we use it",
    body: "We use your information solely to deliver the requested audit report, follow up on your submission, and send service-related communications. We do not sell your data. We do not share it with third parties except where required to deliver the service (e.g. email delivery infrastructure).",
  },
  {
    title: "3. Data storage",
    body: "Your data is stored securely. Audit submissions are retained for up to 24 months to allow comparison across engagements. You may request deletion at any time by emailing hi@ses.service.",
  },
  {
    title: "4. Cookies",
    body: "This site uses no tracking cookies and no third-party analytics. We do not use Google Analytics, Meta Pixel, or any behavioral tracking. The only cookies present are those strictly necessary for the site to function.",
  },
  {
    title: "5. Your rights",
    body: "If you are located in the European Economic Area, you have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact hi@ses.service. We will respond within 30 days.",
  },
  {
    title: "6. Contact",
    body: "For any privacy-related questions: hi@ses.service",
  },
];

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#f0f0f0]">
      <Nav />
      <main>
        <section className="pt-28 pb-16 md:pt-36 md:pb-24 border-b border-[#1a1a1a]">
          <div className="max-w-[820px] mx-auto px-6 md:px-10 space-y-5">
            <Eyebrow>{"// LEGAL"}</Eyebrow>
            <h1 className="headline text-[36px] md:text-[56px]">Privacy Policy</h1>
            <p className="mono text-[13px] text-[#666]">Last updated: July 2026</p>
          </div>
        </section>
        <section className="py-16 md:py-24">
          <div className="max-w-[820px] mx-auto px-6 md:px-10 space-y-12">
            {sections.map((s) => (
              <div key={s.title} className="space-y-3">
                <h2 className="font-sans font-semibold text-[20px] md:text-[22px] text-[#f0f0f0]">
                  {s.title}
                </h2>
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
