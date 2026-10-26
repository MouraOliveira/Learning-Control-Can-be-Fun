# Learning Control Can be Fun

A static website of interactive virtual laboratories for feedback control systems.
No build step, no server, no dependencies: open `index.html` or upload the folder to any web host.

## Structure

```
index.html          homepage (cards, search, level filter)
assets/
  labs.js           LAB REGISTRY: the only file you edit to add a lab
  app.js            homepage logic
  site.css          homepage styles
  lab-nav.js        floating Home / Prev / Next button used inside every lab
labs/               one self-contained HTML file per laboratory
```

## Adding a new laboratory

1. Save the lab as a single HTML file in `labs/` (for example `labs/bode-plot.html`).
2. Add two lines just before `</body>` in that file:
   ```html
   <script src="../assets/labs.js"></script>
   <script src="../assets/lab-nav.js"></script>
   ```
3. Add one entry to `window.LABS` in `assets/labs.js` (title, file, level, summary,
   three objectives, tags, and a `preview` style). The card, the filters, the search and
   the Prev/Next navigation update automatically.

## Publishing

Upload the whole folder, keeping its structure, to GitHub Pages, Netlify, Cloudflare Pages or
any university web server. Keep `index.html` at the root of the site.

## Notes

- Two labs (Step Response Lab, Antenna Tracking) request Google Fonts. Offline they fall back to
  system fonts and work normally.
- Labs follow the visitor's light or dark system setting, as does the homepage.
