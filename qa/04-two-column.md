# QA · 04 Two Column

**Pages:**
- `components/04-two-column/all-variations.html`

| Date | Browsers / devices | Result |
|---|---|---|
| 2026-11-17 | Chromium + WebKit, headless | In progress |

## Checklist

### Shared checks
- [ ] **Design:** matches `client-provided/mockup.jpg`; every row checked, including empty/optional-field rows
- [ ] **Responsive:** 576 / 768 / 992 / 1200px, plus a real phone
- [ ] **Browsers:** Chrome, Safari, Firefox, Edge, iOS Safari
- [x] **Console:** no errors, no 404s (Network tab)
- [x] **Keyboard:** everything reachable with Tab, visible focus, Enter/Space activate, Esc closes pop-ups
- [x] **Screen reader / structure:** heading order (`h1` banner → `h2` → `h3`), alt text on content images, decorative images `alt=""`
- [x] **Reduced motion:** with `prefers-reduced-motion` on, nothing animates unexpectedly
- [x] **Automated:** axe or Lighthouse accessibility pass, no new issues
- [x] **Multiple instances:** IDs unique per row; each row works on its own
- [x] **Code rules (AGENTS.md):** `cmu-` prefixed and scoped CSS, no edits to captured files, no new dependencies, Bootstrap 4 syntax
- [ ] **Hosted:** works on our server, not only localhost (paths, YouTube embeds)

### Two Column checks
- [x] Yellow and maroon backgrounds match the mockup; maroon matches the Hero below-hero gradient
- [x] Text left / text right / text only: image on the correct side; text-only is centred and narrower with no image
- [x] Columns stack in a sensible order on mobile
- [x] Text contrast passes on both backgrounds (including links in the WYSIWYG)
- [x] Row without above-header text has no empty gap

### Notes

**Automated pass, 2026-11-17 (Claude):** headless Chromium at 375 / 576 / 768 / 992 / 1200 / 1440px, plus WebKit (Safari's engine) at 375 / 1200px. Firefox couldn't launch in that environment.
Still needs a person: **Design** (side-by-side check of every row against the mockup), a **real phone**, real **Safari / Firefox / Edge / iOS Safari**, and the **Hosted** check.
- Maroon background is computed identical to the Hero below-hero gradient.
- Contrast is from axe `color-contrast` (no violations) on both backgrounds.
- axe `landmark-unique` (moderate) only fires because rows on the test page repeat the same heading; `full-page.html` is clean.

## Issues

Severity: **blocker** (broken / unusable), **major** (wrong vs spec or mockup, a11y failure), **minor** (polish).
Status: **open** → **fixed** (by the developer, with commit) → **verified** (by the tester).

| # | Row / variation | Breakpoint / browser | Issue | Severity | Status | Fix commit |
|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |
