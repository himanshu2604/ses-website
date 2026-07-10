# Sentinel Journal

## 2026-07-10 - XSS in Dynamic Style Generation
**Vulnerability:** The `ChartStyle` component was injecting raw `id` and `config` values into a `<style>` tag using `dangerouslySetInnerHTML`. An attacker could potentially inject malicious CSS or break out of the `<style>` tag to execute arbitrary JavaScript if these values were derived from user-controlled data.
**Learning:** Dynamic generation of CSS rules using `dangerouslySetInnerHTML` is a high-risk pattern. Even if the data is expected to be safe (like chart IDs or colors), it should be strictly sanitized to prevent injection.
**Prevention:** Always sanitize any dynamic values being injected into `dangerouslySetInnerHTML`. For CSS identifiers, restrict to alphanumeric characters and dashes. For CSS values, use a whitelist of allowed characters.
