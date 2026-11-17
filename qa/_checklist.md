# QA checklist template

Copy into a new component's QA file (the existing files already include it), then add component-specific checks below it.

### Shared checks
- [ ] **Design:** matches `client-provided/mockup.jpg`; every row checked, including empty/optional-field rows
- [ ] **Responsive:** 576 / 768 / 992 / 1200px, plus a real phone
- [ ] **Browsers:** Chrome, Safari, Firefox, Edge, iOS Safari
- [ ] **Console:** no errors, no 404s (Network tab)
- [ ] **Keyboard:** everything reachable with Tab, visible focus, Enter/Space activate, Esc closes pop-ups
- [ ] **Screen reader / structure:** heading order (`h1` banner → `h2` → `h3`), alt text on content images, decorative images `alt=""`
- [ ] **Reduced motion:** with `prefers-reduced-motion` on, nothing animates unexpectedly
- [ ] **Automated:** axe or Lighthouse accessibility pass, no new issues
- [ ] **Multiple instances:** IDs unique per row; each row works on its own
- [ ] **Code rules (AGENTS.md):** `cmu-` prefixed and scoped CSS, no edits to captured files, no new dependencies, Bootstrap 4 syntax
- [ ] **Hosted:** works on our server, not only localhost (paths, YouTube embeds)

### <Component> checks
- [ ] …

## Issues

Severity: **blocker** (broken / unusable), **major** (wrong vs spec or mockup, a11y failure), **minor** (polish).
Status: **open** → **fixed** (by the developer, with commit) → **verified** (by the tester).

| # | Row / variation | Breakpoint / browser | Issue | Severity | Status | Fix commit |
|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |
