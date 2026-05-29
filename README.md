# luv2code.in

Personal developer portfolio for [Sushil Dangi](https://luv2code.in) — built with Next.js 16 static export, deployed to GitHub Pages.

## Running locally

```bash
npm install
npm run dev            # dev server at http://localhost:3000
npm run fetch-repos    # re-fetch GitHub repos into src/data/repos.json
npm run build          # fetch repos then static export → out/
```

## Featuring specific repos

Edit `src/data/featured-repos.ts`:

```typescript
export const FEATURED_REPOS: string[] = [
  'my-repo-name',
  'another-repo',
]
```

Use the exact GitHub repository name (not `full_name`). Featured repos appear first on the Home page and Work page. If the array is empty, the site auto-selects the top-starred repos.

## How CI repo-fetch works

The GitHub Actions workflow (`.github/workflows/deploy.yml`) runs `scripts/fetch-repos.mjs` before `next build`. The script calls the GitHub API with `GITHUB_TOKEN` (automatically available in Actions — no manual secrets setup needed). It writes the result to `src/data/repos.json`, which Next.js bakes into the static export. Visitors never hit the GitHub API.

The workflow runs on every push to `main` **and** on a daily cron (`0 2 * * *` UTC) so repo data stays fresh without requiring a code push.

## One-time GitHub Pages setup

1. Go to **Settings → Pages** in the repository.
2. Set **Source** to **GitHub Actions**.
3. Under **Custom domain**, enter `luv2code.in`.
4. Check **Enforce HTTPS**.

**DNS** — point the apex domain to GitHub's IPs:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
And a `CNAME` for `www` pointing to `<username>.github.io`.
