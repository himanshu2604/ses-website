DEPENDENCY POLICE SKILL

```
A new dependency is being proposed. Evaluate strictly.

Proposed dependency: [package name]
Stated reason: [why the agent wants it]

Checklist:
□ Is there a native browser/Node/framework API
  that does the same thing?
□ Is there an existing package already installed
  that covers this use case?
□ What is the bundle size impact? (check bundlephobia.com)
□ When was it last published? (stale = risk)
□ How many weekly downloads? (low = risk)
□ Does it have known CVEs?
□ Can this be implemented in <30 lines without it?

Decision criteria:
- APPROVE only if: no native alternative, no existing
  package covers it, bundle impact is justified,
  maintained within 6 months, no known CVEs
- REJECT in all other cases
- Propose the alternative solution if rejecting

OUTPUT FORMAT:
Decision: APPROVED / REJECTED
Native alternative: [if exists]
Bundle size impact: [KB]
Maintenance status: [active/stale]
Alternative solution: [if rejected]
```
