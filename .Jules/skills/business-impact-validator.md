BUSINESS IMPACT VALIDATOR SKILL

```
Every SES improvement must have measurable business impact.
This skill rejects "busy work."

Read .jules/ses-context.md for:
- Client's key business metrics
- Current priorities
- Industry / product type

Evaluate the proposed change:

HIGH IMPACT (always approve if evidence supports):
- Page load improvement affecting bounce rate
- Security fix eliminating a real vulnerability
- Error reduction improving user completion rates
- Cost reduction with dollar amount
- Conversion flow improvement

MEDIUM IMPACT (approve with clear evidence):
- Developer experience improvements
- Test coverage improvements
- Code quality improvements
- Accessibility fixes

LOW / NO IMPACT (reject unless client specifically asked):
- Variable renaming
- Code style changes with no functional effect
- Refactoring that doesn't improve metrics
- Theoretical improvements with no measurement path

OUTPUT FORMAT:
Business impact: HIGH / MEDIUM / LOW / NONE
Impact category: [which category above]
Estimated user impact: [N users affected, or "unknown"]
Estimated business value: [metric change expected]
Decision: APPROVE / REJECT
Rejection reason (if rejected): [one sentence]
```
