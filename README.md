# Action Copilot Landing

Public landing page for **Action Copilot** demand validation.

## Product Summary

Action Copilot is a Chrome sidebar that turns email/chat/page context into **actionable board tasks**.

This is not "just OCR". The value is execution flow:
1. Capture context
2. Structure it with prompt + output schema
3. Create/update board cards
4. Run automated control rules (status/deadline/stale/follow-up)

## Who This Is For

- Agencies handling many client requests in email/chat
- SMB operations teams that need fast issue-to-task conversion
- Small product teams that need consistent execution without copy-paste loops

## Scope

### Scope In

- Capture Screen from browser + page context import
- Prompt-driven normalization into JSON/Markdown/CSV payloads
- Card creation/update on board
- Automated board rules for status, due-date, stale-task, follow-up control

### Scope Out

- Not a full CRM/ATS/ERP replacement
- Not an OCR-only tool with no workflow layer
- Not a zero-config autopilot

## Demand Check (Live Counters)

Landing tracks:
- `views`
- `likes`
- `views_without_like = views - likes`

Implementation:
- CounterAPI (no backend)
- Browser like lock via localStorage key `action_copilot_liked`

## Demo Contact

For demo access, DM [@kroq86](https://github.com/kroq86) on GitHub.

## Run Locally

```bash
cd /Users/ll/Documents/next-product-plan/landing
python3 -m http.server 8080
```

Open <http://localhost:8080>.

## SEO + Pages

- `index.html` includes canonical + OG URL
- `robots.txt` allows crawl + points to sitemap
- `sitemap.xml` includes the main URL
- GitHub Pages deploy workflow: `.github/workflows/pages.yml`

If repo URL changes, update all occurrences of:
- `https://kroq86.github.io/action-copilot-landing/`
