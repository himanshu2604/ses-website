PERFORMANCE BUDGET SKILL

```
Every performance improvement must be measured against
the client's performance budget.

Read .jules/memory/repo-memory.json for:
- Current Lighthouse scores
- Current bundle size
- Current Core Web Vitals
- Client's performance targets (if set)

Default SES performance targets:
  Lighthouse Performance:  > 80
  First Contentful Paint:  < 1.8s
  Largest Contentful Paint: < 2.5s
  Total Blocking Time:     < 200ms
  Bundle size (initial):   < 200kb

For the proposed improvement, calculate:
- Expected Lighthouse delta: +N points
- Expected load time delta: -Ns
- Bundle size delta: +/-Nkb
- Is improvement measurable via existing CI? YES/NO

Reject if:
- Expected improvement is less than 2 Lighthouse points
  (micro-optimization not worth the risk)
- Change increases bundle size without clear justification
- Improvement cannot be measured

OUTPUT FORMAT:
Performance budget check: PASS / FAIL
Expected Lighthouse delta: [+N or -N]
Expected load time delta: [-Xs or "not measurable"]
Bundle size delta: [+/-Nkb]
Measurable via CI: YES / NO
```
