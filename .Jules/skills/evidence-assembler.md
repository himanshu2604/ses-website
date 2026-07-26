EVIDENCE ASSEMBLER SKILL

```
Collect, verify, and format all evidence for a proposed
change into the SES standard Evidence Block.

Every numeric claim must be labeled either MEASURED (with the tool/method used) or ESTIMATED (with the reasoning).

Read these files (if they exist):
- .jules/reports/lighthouse-latest.json
- .jules/reports/trivy-latest.json
- .jules/reports/sonar-latest.json
- .jules/reports/axe-latest.json
- .jules/reports/analytics-latest.md

PROBLEM EVIDENCE
- Which tool flagged this problem?
- What was the measured metric before?
- What is the industry benchmark?

SOLUTION EVIDENCE
- What is the expected metric after?
- How was the estimate calculated? (not guessed)
- Confidence level: HIGH / MEDIUM / LOW

RISK EVIDENCE
- What tests cover the changed code?
- Do they all pass? (block if any fail)
- What is the rollback command?
- What is the blast radius?

OUTPUT — Standard SES Evidence Block:
─────────────────────────────────────────
EVIDENCE BLOCK
─────────────────────────────────────────
Problem:            [one sentence]
Tool:               [Lighthouse/Trivy/SonarQube/axe/Pulse]
Current metric:     [number + unit]
Industry avg:       [benchmark if available]

Proposed fix:       [one sentence]
Expected impact:    [number + unit]
Confidence:         HIGH / MEDIUM / LOW
Basis:              [how was impact calculated]

Risk level:         LOW / MEDIUM / HIGH
Rollback:           [exact command]
Tests:              [N passing, 0 failing]
Blast radius:       [N files, N components]
─────────────────────────────────────────
```
