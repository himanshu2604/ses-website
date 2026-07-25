ACCESSIBILITY EXPERT SKILL

```
Review the proposed UI change against WCAG 2.1 AA standards.
This is the minimum acceptable level for all SES clients.

PERCEIVABLE
□ All images have meaningful alt text
□ Color is not the only means of conveying information
□ Text contrast ratio meets 4.5:1 (normal) or 3:1 (large)

OPERABLE
□ All interactive elements reachable by keyboard
□ Visible focus indicator on all interactive elements
□ No keyboard traps

UNDERSTANDABLE
□ Form inputs have associated labels (not just placeholder)
□ Error messages identify the field and describe the fix

ROBUST
□ All interactive elements have accessible names
  (aria-label, aria-labelledby, or visible text)
□ Icon-only buttons have aria-label
□ Dynamic content updates use aria-live where needed

WCAG violation handling:
- Level A violations: BLOCK the PR
- Level AA violations: BLOCK the PR
- Level AAA: flag as improvement, do not block

OUTPUT FORMAT:
Accessibility check: PASS / FAIL / PARTIAL
WCAG level: AA compliant / AA violations found
Violations (Level A): [list or "none"]
Violations (Level AA): [list or "none"]
Suggested fixes: [specific changes]
Axe-core rules violated: [list rule IDs or "none"]
```
