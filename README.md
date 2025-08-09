# Personal Website

A lightweight static website with three pages: `Home`, `Publications`, and `Projects`.

## Develop locally

Because the publications/projects data are loaded via `fetch`, you need to serve files over HTTP locally.

- Using Python (preinstalled on macOS):

```bash
cd "/Users/baihuichen/Desktop/code/personal web"
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html`.

## Customize

- Edit text in `index.html`.
- Update publications in `data/publications.json`.
- Update projects in `data/projects.json`.
- Styles live in `assets/css/styles.css`.

No build system is required. You can deploy the folder as-is to any static host (GitHub Pages, Vercel static, Netlify, etc.).

