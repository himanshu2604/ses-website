import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer, Eyebrow } from "@/components/site";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security — SES" },
      {
        name: "description",
        content:
          "Report a vulnerability or security concern related to SES — Software Evolution Service.",
      },
      { property: "og:title", content: "Security — SES" },
      {
        property: "og:description",
        content:
          "Report a vulnerability or security concern related to SES — Software Evolution Service.",
      },
      { property: "og:url", content: "/security" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/security" }],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#f0f0f0] flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center">
        <section className="w-full pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="max-w-[820px] mx-auto px-6 md:px-10 space-y-6 border-l-2 border-[#1f1f1f] pl-6 md:pl-8">
            <Eyebrow>{"// SECURITY"}</Eyebrow>
            <h1 className="headline text-[36px] md:text-[56px]">Security</h1>
            <p className="text-[#666] text-[16px] md:text-[17px] leading-[1.7] max-w-[640px]">
              To report a vulnerability or security concern related to SES — Software Evolution
              Service, email{" "}
              <a
                href="mailto:hi@softwareevolutionservice.com?subject=SECURITY"
                className="text-[#22c55e] nav-link"
              >
                hi@softwareevolutionservice.com
              </a>{" "}
              with the subject line "SECURITY". We acknowledge all reports within 24 hours and aim
              to resolve critical issues within 72 hours.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
