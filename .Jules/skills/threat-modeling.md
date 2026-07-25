THREAT MODELING SKILL

```
Before Sentinel raises a security PR, evaluate the
proposed fix against these threat categories:

1. Does the fix address the root cause or just the
   symptom?

2. Does the fix introduce a new attack surface?

3. Is the fix bypassable by a determined attacker?

4. Does the fix break any existing security controls?

5. What is the blast radius if this fix fails?

6. Is there a simpler, more established solution?
   (e.g. established library vs custom implementation)

OWASP Top 10 check — does the proposed change
affect any of:
  A01 Broken Access Control
  A02 Cryptographic Failures
  A03 Injection
  A05 Security Misconfiguration
  A06 Vulnerable Components

OUTPUT FORMAT:
Threat assessment: LOW / MEDIUM / HIGH / CRITICAL
Root cause addressed: YES / NO
New attack surface introduced: YES / NO
Recommended approach: [guidance]
```
