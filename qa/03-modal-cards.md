# QA · 03 Modal Cards

**Pages:**
- `components/03-modal-cards/all-variations.html`

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

### Modal Cards checks
- [x] Background: photo in black and white under the gradient and value circles; no photo = plain gradient
- [x] 2 / 3 / 5 / 6 cards lay out correctly; incomplete last row is centred
- [x] Whole card is clickable and is one keyboard stop, with a focus ring around the card
- [x] **Video** cards open `#VideoModal`; video stops on close
- [x] **Content** modals: optional image, text, optional button all display; standard and wide widths
- [x] **Custom block** modals render their HTML as-is
- [x] Every modal: opens above everything (not trapped behind the backdrop), closes with X / Esc / outside click, focus returns to the card
- [x] Long titles stop at 3 lines
- [x] Opening a modal in one row never opens or affects another row

### Notes

**Automated pass, 2026-11-17 (Claude):** headless Chromium at 375 / 576 / 768 / 992 / 1200 / 1440px, plus WebKit (Safari's engine) at 375 / 1200px. Firefox couldn't launch in that environment.
Still needs a person: **Design** (side-by-side check of every row against the mockup), a **real phone**, real **Safari / Firefox / Edge / iOS Safari**, and the **Hosted** check.
- All 27 triggers tested: each opens exactly one modal, on top, with focus inside; Esc closes it and focus returns to the card. Content modals also close with X and with a click outside.
- Video cards: on close the iframe is reset to the URL without `autoplay` (the site's own `scripts.js`), which stops playback.
- Content and custom-block modals open correctly, but I didn't look closely at how their contents look. Include them in the design review.
- axe `landmark-unique` (moderate) only fires because rows on the test page repeat the same heading; `full-page.html` is clean.

## Issues

Severity: **blocker** (broken / unusable), **major** (wrong vs spec or mockup, a11y failure), **minor** (polish).
Status: **open** → **fixed** (by the developer, with commit) → **verified** (by the tester).

| # | Row / variation | Breakpoint / browser | Issue | Severity | Status | Fix commit |
|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |
