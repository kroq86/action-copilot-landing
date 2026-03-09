# Action Copilot Landing (Standalone)

Static landing page with public demand counters.

## Run locally

```bash
cd /Users/ll/Documents/next-product-plan/landing
python3 -m http.server 8080
```

Open <http://localhost:8080>.

## Counters

Implemented via CountAPI (no backend required):
- `views`
- `likes`
- `views_without_like = views - likes`

Browser-level like lock:
- One like per browser via localStorage key `action_copilot_liked`.

## SEO files

- `index.html` contains canonical URL.
- `robots.txt` allows crawling and points to sitemap.
- `sitemap.xml` includes main page URL.

## GitHub Pages deploy

Workflow file:
- `.github/workflows/pages.yml`

After pushing to GitHub:
1. Open repo settings -> Pages.
2. Set source to GitHub Actions.
3. Push to `main` branch.
4. Wait for action "Deploy Landing to GitHub Pages" to finish.

## Important

If your final repo URL differs, replace `kroq86.github.io/action-copilot-landing` in:
- `index.html` canonical + og:url
- `robots.txt` sitemap URL
- `sitemap.xml` loc
