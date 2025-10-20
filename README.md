# Personal Homepage (Peng-style)

A clean, static homepage inspired by academic sites like **xbpeng.github.io**. It uses plain HTML/CSS/JS and a `publications.json` file to render publications grouped by year with thumbnails and links.

## Quick start

1. Rename this repository to `<your-github-username>.github.io`.
2. Push it to GitHub and enable **Settings → Pages → Deploy from a branch** (or keep the default GitHub Pages action).
3. Visit `https://<your-github-username>.github.io`.

## Customize

- Edit `index.html`: your name, bio, contact links, nav.
- Replace `assets/profile.jpg` with your photo (same file name).
- Put a `cv.pdf` in the root for the CV link.
- Edit `publications.json` to add/update papers. Each entry:
  ```json
  {
    "year": 2025,
    "title": "Paper Title",
    "authors": "A. Author, B. Author, You",
    "venue": "Conference/Journal",
    "project": "https://...",
    "paper": "https://...",
    "code": "https://...",
    "image": "assets/yourthumb.png",
    "note": "Spotlight / Award (optional)"
  }
  ```
- Thumbnails: 800×400 works well; place under `assets/` and reference them from JSON.

## Optional niceties

- Add Google Analytics or Plausible in `index.html` (just before `</body>`).
- Set a custom domain in **Pages → Custom domain** and add DNS `CNAME` to `username.github.io`.
- Create extra pages: add `team.html`, `art.html`, etc., and link from the header.
- Social previews: add `<meta property="og:*">` and `<meta name="twitter:*">` tags in `<head>`.

## Development

Just open `index.html` in a browser. No build step required.

## License

MIT — do whatever you like, attribution appreciated.