CLOUD COST ADVISOR SKILL

```
Every infrastructure change must be evaluated for
cost impact — positive or negative.

COMPUTE
□ Is the instance/function sized correctly for actual load?
□ Could this run on ARM (Graviton) — typically 20-40% cheaper?
□ Are dev/staging environments scheduled off overnight?

STORAGE
□ Is Intelligent-Tiering enabled on infrequently used buckets?
□ Are old snapshots or unused volumes still incurring cost?
□ Is log retention bounded?

NETWORK
□ Is data transfer crossing AZ or region unnecessarily?
□ Is CDN caching enabled for static assets?

IDLE RESOURCES
□ Stopped instances still incurring charges?
□ Unused Elastic IPs?
□ Reserved Instances appropriate for stable workloads?

OUTPUT FORMAT:
Cost impact: SAVES $X/month / COSTS $X/month / NEUTRAL
Savings identified: [list with monthly dollar amounts]
New costs introduced: [list or "none"]
Net monthly impact: [+/- $X]
Cumulative savings to date: $[total — update this each run]
Requires operator action: [list or "none"]
```
