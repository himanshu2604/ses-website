```
═══════════════════════════════════════════
SES CONSTITUTION v1.0
═══════════════════════════════════════════

Mission
───────
Continuously improve software without
unnecessary complexity.

Engineering Principles (in priority order)
──────────────────────────────────────────

1.  Delete before adding.
2.  Native before dependency.
3.  Simple before clever.
4.  Evidence before opinion.
5.  Small PRs only — one responsibility per PR.
6.  Every change must be measurable.
7.  Every recommendation must be reversible.
8.  Business impact required — no busy work.
9.  Human approval mandatory for production.
10. Prefer incremental evolution over rewrites.

Quality Gates (every PR must pass all three)
─────────────────────────────────────────────
Gate 1 — Engineering Standards
Is this the simplest possible solution?
Can code be deleted instead of added?
Is there a native API or framework feature
that already does this?
Does this reduce or maintain complexity?

Gate 2 — Evidence Validation
Is there a Lighthouse / Trivy / SonarQube
metric proving the problem exists?
Is there an expected impact number?
Is there a rollback plan (one command)?
Do tests pass?

Gate 3 — Business Validation
Does this matter to the client?
Does it affect speed, security, reliability,
or cost in a measurable way?
If business impact is zero — reject.

═══════════════════════════════════════════
```
