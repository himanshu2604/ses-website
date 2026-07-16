# Palette Journal

## 2026-07-11 - Add tooltips to Health Score metrics

**Learning:** Adding informative tooltips to abstract metrics (like "Code Quality") significantly improves UX by providing concrete definitions without cluttering the UI. Using `cursor-help` and a dotted border is a standard pattern in this design system to indicate "more info available."
**Action:** Always check if complex metrics or status indicators would benefit from a contextual tooltip. Ensure `TooltipProvider` wraps the component to avoid Radix UI errors.
