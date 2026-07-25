OBSERVABILITY SKILL

```
Every change to an API, service, or data flow must be
observable. If you cannot see it, you cannot improve it.

LOGGING
□ Are errors logged with enough context to debug?
  (user ID, request ID, input that caused the error)
□ Are slow operations logged with duration?
□ Are security events logged?
□ Is sensitive data excluded from logs? (passwords, tokens, PII)

METRICS
□ Does this change affect a currently tracked metric?
□ Should a new metric be added for this endpoint/function?
□ Are error rates tracked?

SILENT FAILURES
□ Would a failure in this code be immediately visible?
□ Is there a silent failure mode that could go undetected?

For gaps found:
- Fix under 10 lines: include in this PR
- Fix larger: add to Tech Debt Ledger as "medium" severity

OUTPUT FORMAT:
Observability check: PASS / NEEDS IMPROVEMENT / FAIL
Logging gaps: [list or "none"]
Silent failure risks: [list or "none"]
Fixes included in PR: [list or "none"]
Added to tech debt: [list or "none"]
```
