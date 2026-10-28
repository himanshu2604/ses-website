import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

// 🎨 Palette 2026-10-28: Elevate 404/500 error boundaries with Terminal Dark design system styling & WCAG AA accessibility — Ensures visual brand consistency and accessible error recovery.
function NotFoundComponent() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-[#0c0c0c] px-4 py-12"
    >
      <div className="w-full max-w-md border border-[#1e1e1e] bg-[#111] p-8 text-center rounded-[3px]">
        <div className="mono text-[11px] text-[#22c55e] uppercase tracking-wider mb-2">
          [ 404: page_not_found ]
        </div>
        <h1 className="mono text-6xl font-bold text-[#f0f0f0] tracking-tight">404</h1>
        <p className="mt-4 text-[14px] text-[#999] leading-relaxed">
          The requested path does not exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            aria-label="Go home"
            className="inline-flex items-center justify-center mono text-[13px] bg-[#22c55e] text-[#0c0c0c] font-semibold px-5 py-2.5 rounded-[3px] transition-colors hover:bg-[#22c55e]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c55e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0c]"
          >
            $ cd / ↵
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div
      role="alert"
      className="flex min-h-screen items-center justify-center bg-[#0c0c0c] px-4 py-12"
    >
      <div className="w-full max-w-md border border-[#1e1e1e] bg-[#111] p-8 text-center rounded-[3px]">
        <div className="mono text-[11px] text-[#ef4444] uppercase tracking-wider mb-2">
          [ 500: system_error ]
        </div>
        <h1 className="mono text-2xl font-bold text-[#f0f0f0] tracking-tight">Execution failed</h1>
        <p className="mt-3 text-[14px] text-[#999] leading-relaxed">
          An unexpected exception occurred while rendering this view.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            aria-label="Try again"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center mono text-[13px] bg-[#22c55e] text-[#0c0c0c] font-semibold px-4 py-2.5 rounded-[3px] transition-colors hover:bg-[#22c55e]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c55e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0c] cursor-pointer"
          >
            $ retry --force ↵
          </button>
          <Link
            to="/"
            aria-label="Go home"
            className="inline-flex items-center justify-center mono text-[13px] border border-[#1e1e1e] bg-[#0c0c0c] text-[#f0f0f0] px-4 py-2.5 rounded-[3px] transition-colors hover:border-[#22c55e] hover:text-[#22c55e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22c55e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0c]"
          >
            $ cd / ↵
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0c0c0c" },
      { name: "color-scheme", content: "dark" },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SES — Software Evolution Service" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      // ⚡ Bolt 2026-09-09: Remove redundant preload and pre-resolve third-party analytics domains to streamline critical path and accelerate post-hydration GA4 script load — expected impact: Saves ~50-100ms on dynamic script downloads and avoids potential duplicate font stylesheets downloads.
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
      { rel: "dns-prefetch", href: "https://www.google-analytics.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4PCRZ6KWWL');
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  useEffect(() => {
    // ⚡ Bolt 2026-09-02: Defer GTM script injection to post-hydration client mount — expected impact: Improves initial paint time by removing third-party script loading from the critical rendering path.
    if (typeof window !== "undefined") {
      const scriptId = "gtm-script";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-4PCRZ6KWWL";
        document.head.appendChild(script);
      }
    }

    const unsubscribe = router.subscribe("onResolved", ({ toLocation }) => {
      if (typeof window !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const win = window as any;
        if (typeof win.gtag === "function") {
          win.gtag("event", "page_view", {
            page_path: toLocation.pathname,
          });
        }
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
