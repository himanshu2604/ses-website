DOCUMENTATION GENERATOR SKILL

```
Undocumented changes create future tech debt.
Generate the right documentation type for the change.

FOR NEW OR MODIFIED FUNCTIONS:
JSDoc/docstring block:
  - What the function does (one sentence)
  - Parameters with types and descriptions
  - Return value with type
  - Edge cases
  - Example if non-obvious

FOR NEW API ENDPOINTS:
API doc block:
  - Method and path
  - Description
  - Request parameters/body
  - Response format and status codes
  - Auth required: YES/NO
  - Rate limited: YES/NO

FOR ARCHITECTURAL DECISIONS:
Architecture Decision Record (ADR):
  ## ADR-[N]: [Title]
  Date: [date]
  Status: Accepted
  Context: [why this decision was needed]
  Decision: [what was decided]
  Consequences: [what changes]
  Alternatives considered: [what was rejected and why]
  → Also save to .jules/memory/repo-memory.json decisions[]

FOR WEEKLY CHANGELOG (Scribe calls this):
Client-facing entry:
  - What changed (plain English, no jargon)
  - Why it matters to the user/business
  - Before/after metric if applicable
  - Risk level: None / Low / Medium

OUTPUT FORMAT:
Documentation type: [function/api/adr/changelog]
Generated text: [full text, ready to insert]
File to insert into: [path]
```
