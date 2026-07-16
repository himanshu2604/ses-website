import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer, Eyebrow } from "@/components/site";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "Status — SES" },
      {
        name: "description",
        content: "System status for SES — Software Evolution Service — all systems operational.",
      },
      { property: "og:title", content: "Status — SES" },
      {
        property: "og:description",
        content: "System status for SES — Software Evolution Service — all systems operational.",
      },
      { property: "og:url", content: "/status" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/status" }],
  }),
  component: StatusPage,
});

const systems = ["ses.service", "audit pipeline", "report delivery", "health score engine"];

function StatusPage() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-[#f0f0f0] flex flex-col">
      <Nav />
      <main className="flex-1 flex items-center">
        <section className="w-full pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="max-w-[820px] mx-auto px-6 md:px-10 space-y-8 border-l-2 border-[#1f1f1f] pl-6 md:pl-8">
            <Eyebrow>{"// SYSTEM STATUS"}</Eyebrow>
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="headline text-[32px] md:text-[52px]">All systems operational.</h1>
              <span
                className="pulse-dot"
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: "#22c55e",
                  display: "inline-block",
                }}
              />
            </div>
            <ul className="mono text-[14px] md:text-[15px] space-y-3 pt-4">
              {systems.map((s) => (
                <li key={s} className="flex items-center gap-3 text-[#888]">
                  <span className="text-[#22c55e]">●</span>
                  <span>{s}</span>
                  <span className="text-[#444]">—</span>
                  <span className="text-[#22c55e]">operational</span>
                </li>
              ))}
            </ul>
            <p className="mono text-[12px] text-[#444] pt-6">Last checked: updated automatically</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
