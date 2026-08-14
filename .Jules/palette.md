# Palette Journal

## 2026-07-11 - Add tooltips to Health Score metrics

**Learning:** Adding informative tooltips to abstract metrics (like "Code Quality") significantly improves UX by providing concrete definitions without cluttering the UI. Using `cursor-help` and a dotted border is a standard pattern in this design system to indicate "more info available."
**Action:** Always check if complex metrics or status indicators would benefit from a contextual tooltip. Ensure `TooltipProvider` wraps the component to avoid Radix UI errors.

## 2026-07-22 - Reusing AuditForm to Eliminate Duplication & Elevate Accessibility

**Learning:** Code duplication of interactive elements like forms in a codebase leads to severe divergence in both functionality and accessibility quality. Reusing components systematically ensures that custom UX and key accessibility improvements (such as proper `htmlFor` label linkage and dynamic ARIA validation attributes) propagate flawlessly to all touchpoints.
**Action:** Always refactor duplicate inline form implementations to leverage shared site components, utilizing clean feature-enabling props (like `showDedicatedLink`) to maintain minor visual design nuances when required.

## 2026-08-04 - Mitigating Muted-Text Contrast Failures via Standard AA-Compliant Token

**Learning:** Low-contrast muted/secondary text elements (like eyebrows and section descriptions) are easily overlooked during rapid development, causing severe WCAG AA accessibility contrast failures on dark backgrounds (#0c0c0c background + #666666 text gives only 3.32:1). Standardizing a secondary/muted-text color token (#999999 or #999) ensures all text elements achieve compliant high-contrast (6.58:1 ratio) while fully preserving the dark IDE/monospace terminal aesthetic.
**Action:** Formalize compliant color tokens within the design_system and apply them site-wide, replacing hardcoded low-contrast values in JSX files to ensure systemic accessibility alignment.

## 2026-08-11 - Bridging Selected Plan Context to Lead-Gen Forms Safely with SSR

**Learning:** Passing a selected plan context (e.g. from `/pricing`) via URL parameters to a shared form on `/` vastly enhances conversion rates and intent alignment. To avoid SSR hydration mismatches in frameworks like TanStack Start, query param parsing must be deferred until client-side mount (e.g. via `useEffect`). Adapting CLI-style submit buttons dynamically (e.g. `$ request --audit --growth ↵`) reinforces user confidence. Adding `sr-only` descriptions to visual elements (like `✓` checkmarks and `—` dashes) is critical to make comparison tables WCAG AA screen-reader compliant.
**Action:** Always defer URL parsing to client-side lifecycle hooks, customize CTAs dynamically to match user selections, and systematically decorate visual symbols with hidden descriptive tags for screen reader robustness.

## 2026-09-08 - TanStack Router Reactivity & Search Params Validation

**Learning:** In TanStack Router, `router.state` is always up to date but _non-reactive_; referencing it directly in a component body or hook dependencies will not trigger a React update/re-render. Instead, `useRouterState` must be leveraged. Furthermore, query parameters (e.g., `?plan=growth`) will be stripped out of the parsed state at runtime unless explicitly validated using the `validateSearch` option on the corresponding route definition.
**Action:** Always use `useRouterState({ select: ... })` to obtain reactive location objects, and define explicit query parameter schemas inside route definitions using `validateSearch` to prevent parameters from being filtered out.
