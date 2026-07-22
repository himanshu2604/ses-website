# Palette Journal

## 2026-07-11 - Add tooltips to Health Score metrics

**Learning:** Adding informative tooltips to abstract metrics (like "Code Quality") significantly improves UX by providing concrete definitions without cluttering the UI. Using `cursor-help` and a dotted border is a standard pattern in this design system to indicate "more info available."
**Action:** Always check if complex metrics or status indicators would benefit from a contextual tooltip. Ensure `TooltipProvider` wraps the component to avoid Radix UI errors.

## 2026-07-22 - Reusing AuditForm to Eliminate Duplication & Elevate Accessibility

**Learning:** Code duplication of interactive elements like forms in a codebase leads to severe divergence in both functionality and accessibility quality. Reusing components systematically ensures that custom UX and key accessibility improvements (such as proper `htmlFor` label linkage and dynamic ARIA validation attributes) propagate flawlessly to all touchpoints.
**Action:** Always refactor duplicate inline form implementations to leverage shared site components, utilizing clean feature-enabling props (like `showDedicatedLink`) to maintain minor visual design nuances when required.
