# .jules/ses-context.md

# SES Operator fills this in during client onboarding. All four agents read this file.

## Client info

client_name: "Software Evolution Service (SES)"
tier: "Starter / Growth / Pro"
operator_notes: ""

## Stack

framework: "Next.js 14 / Laravel / Django / etc"
database: "PostgreSQL / MySQL / MongoDB"
deployment: "Vercel / Railway / Render / AWS"
css: "Tailwind / Styled Components / CSS Modules"
test_command: "pnpm test / npm test / pytest"
lint_command: "pnpm lint"
build_command: "pnpm build"

## Health Score weights (must sum to 100)

performance_weight: 30
security_weight: 30
ux_weight: 25
maintainability_weight: 15

## Priority areas this month

# What should agents focus on? (e.g. "dashboard load time, mobile checkout UX")

priorities: ""

## Off-limits files (agents must never touch these)

# e.g. auth/, payments/, src/lib/stripe.ts

off_limits:

- "auth/"
- "payments/"
- ".env\*"

## Analytics (for Pulse agent)

analytics_tools: "PostHog / GA4 / Mixpanel / Clarity / Hotjar / Search Console"
key_metrics: "activation rate, trial-to-paid conversion, weekly active users"
analytics_data_available: true/false

## Cloud infrastructure (for Fin agent)

cloud_providers: "AWS / GCP / Azure / Vercel / Railway / Render / Cloudflare"
monthly_cloud_spend: "$XXX/month (approximate)"
fin_eligible: true # set to false for Starter tier clients
cloud_off_limits:

- "production RDS / database"
- "auth infrastructure"
- "payment processing services"
  fin_cumulative_savings: "$0" # Fin updates this each cycle

## Completed improvements (agents must not redo these)

# Scribe updates this automatically. Operator can also add entries.

completed: ["🛡️ Sentinel: [HIGH] Fix XSS vulnerability in ChartStyle component"]

## Report format preference

# "technical" = include code details, "executive" = plain English only

report_style: "executive"
