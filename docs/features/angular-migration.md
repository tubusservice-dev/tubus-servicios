# Angular Migration & Architecture

## 1. Purpose & Functionality

The site started as a single self-contained `index.html` (~2035 lines: inline
`<style>`, markup, and inline `<script>`). It was migrated to a **modular
Angular 21 application** with a scalable folder structure, **preserving the
exact visual design** (dark/light themes, animations, carousel, layout).

The public landing page presents: a hero with animated KPIs, an image carousel
(gallery), a services grid, a "why us" section, and two branch (sede) contact
cards. A separate admin area manages the carousel slides.

The original `index.html` and `TuBus Express.html` were preserved under
`legacy/` as a visual reference.

## 2. Architectural Decisions (The "Why")

**Folder structure (mirrors a scalable Angular convention):**

```
src/app/
├── core/        # logic without UI: services + directives (singletons)
│   ├── services/    theme.service.ts, slide-storage.service.ts
│   └── directives/  reveal.directive.ts, count-up.directive.ts
├── shared/      # reusable, presentation-only building blocks
│   └── components/  social-links, wa-button, section-head
├── features/    # content sections: hero, gallery, services, about, contact
├── layouts/
│   └── components/  header, footer, main-layout, admin-layout
├── pages/       # home (composes features), admin (gallery management)
└── models/      # interfaces: Slide, WhatsAppContact, Sede
src/assets/{img,icons}
```

- **`shared/` vs `layouts/` (deliberate).** `header`/`footer` live in `layouts/`,
  not `shared/`, because they are the page *chrome* (instantiated once per
  layout), not reusable building blocks. `shared/` is reserved for agnostic,
  repeatable pieces (`wa-button`, `social-links`, `section-head`). The header
  *consumes* shared components; it is not one.

- **CSS strategy — "global design system + scoped component styles".** Design
  tokens (`:root` / `[data-theme="light"]`), reset, and `.container`/`section`/
  `.reveal` utilities live in the global `src/styles.scss`. Each component owns
  its section-specific CSS in its `.scss`, copied verbatim from the original to
  guarantee pixel-identical rendering.

- **Theming via `:host-context`.** Light-theme overrides inside components use
  `:host-context([data-theme="light"]) .x { ... }` instead of a global
  `[data-theme="light"] .x`. Because `<html data-theme>` is an ancestor of every
  component, this keeps the base rule and its theme override in the same scoped
  stylesheet — avoiding specificity battles between global and emulated-scoped
  rules. An inline pre-paint script in `index.html` sets `data-theme` before
  Angular bootstraps to avoid a flash.

- **Global "primitives" that cross component boundaries.** `.social-link` and
  `.wa-btn` are defined globally in `styles.scss` on purpose: a child component
  (`<app-wa-button>`) renders the `<a class="wa-btn">`, but its size is set by a
  parent's `.wa-btns-row`. With emulated encapsulation, a parent's scoped rule
  cannot reach into a child component's element, so these primitives must be
  global to style across that boundary.

- **Data centralization.** Static content with unique inline SVG icons (hero
  KPIs, service cards, why-items) is kept inline for fidelity, while repeatable
  structured data (branches/`Sede`, hero brand tags) is typed and rendered with
  `@for`.

- **Routing & layouts.** `''` → `MainLayoutComponent` → lazy `HomeComponent`
  (public site). `'admin'` → `AdminLayoutComponent` → lazy `AdminComponent`.
  The original query-flag `?admin` was promoted to a real route **`/admin`**
  with its own minimal layout — cleaner and protectable later.

- **Modern Angular idioms:** standalone components, `signal()` state, native
  control flow (`@if`/`@for`), `ChangeDetectionStrategy.OnPush` everywhere,
  `inject()`, and the `application` builder.

## 3. Technical Flow & Components

- **Bootstrap:** `main.ts` → `bootstrapApplication(AppComponent, appConfig)`.
  `app.config.ts` provides the router (with in-memory anchor scrolling).
  `app.routes.ts` wires layouts → lazy pages.

- **Theme:** `ThemeService` (core) holds an `isLight` signal, toggles the
  `<html data-theme>` attribute and persists to `localStorage['tubus_theme']`.
  The header button calls `theme.toggle()`.

- **Carousel (`features/gallery`):** loads slides from `SlideStorageService`
  (`localStorage['tubus_banner_slides']`, falling back to defaults). State is
  signal-based (`slides`, `currentSlide`, `failed`). Auto-advances every 5s; the
  progress bar is replayed with a double `requestAnimationFrame`. Images use
  `[src]` binding with an `(error)` fallback to a themed placeholder.

- **Animations (core directives):**
  - `RevealDirective` (selector `[appReveal], .reveal`) — `IntersectionObserver`
    adds `visible` once on scroll-in.
  - `CountUpDirective` (selector `[countUp]`) — eases a number from 0 to target
    when it scrolls into view.

- **Admin (`pages/admin`):** signal-managed `Slide[]` with `FormsModule`
  `[(ngModel)]` inputs; add / remove / reorder / save back to
  `SlideStorageService`.

## Angular 19 → 21 upgrade

Performed with sequential `ng update` (Angular does not support skipping
majors): `19 → 20 → 21`. All automatic migrations reported "No changes made"
because the code already followed modern patterns. TypeScript was bumped to
`~5.9.3`. Angular 22 was intentionally deferred: it requires Node `≥22.22.3`
(the dev machine had 22.12.0); Angular 21 runs on the existing Node.

## Design-fidelity fixes applied

- **WhatsApp buttons (50/50):** the flex item is the `<app-wa-button>` host, not
  the inner `<a>`. Fixed by `:host { display:flex; flex:1 }` in the component and
  removing the dead `.wa-btns-row .wa-btn { flex:1 }` global rule.
- **Full-width header/footer/admin bars:** custom elements default to
  `display:inline`, so the `.nav` background didn't span the viewport. Fixed with
  `:host { display:block }` on `header`, `footer`, and `admin-layout`.
- **Carousel placeholder theming:** uses the `--slide-placeholder-bg` token
  instead of a hard-coded gradient, so it follows dark/light.
- **XSS removed:** the old carousel injected slide titles via `innerHTML`; the
  Angular version uses interpolation/binding, eliminating the vector.

## 4. Limitations & Edge Cases

- **No SSR / prerendering:** client-rendered SPA. Crawlers without JS see only
  the shell. Basic Open Graph tags and a favicon were added in `index.html`.
- **`localStorage`-only data:** carousel slides are per-browser, not shared
  across devices/users. No backend.
- **Carousel autoplay** has no pause-on-hover/focus control (WCAG 2.2.2 gap).
- **`legacy/`** holds the original static files for reference only; not built or
  served.
- **Encapsulation gotcha:** any new rule that must style an element rendered by a
  *child* component (across the host boundary) has to be global, like
  `.wa-btn`/`.social-link`.

## 5. Integration Guide & Future Improvements

- **Add a new section:** create `features/<name>/`, add it to
  `features/index.ts`, and compose it in `pages/home/home.component.ts`. Put a
  section anchor `id` on its root `<section>` for in-page links.
- **Add a reusable widget:** put it in `shared/components/` and export from
  `shared/index.ts`. Use default emulation; only go global for styles that must
  cross a component boundary.
- **Theme-aware styles:** use `:host-context([data-theme="light"])` in the
  component `.scss`.
- **Pending / next steps:**
  - **Guatire Maps link** is still duplicated from Carabobo — see the `TODO` in
    `features/contact/contact.component.ts` (`mapUrl`).
  - Verify the **two branches share the same phone numbers** (intentional?).
  - Consider `LocalBusiness` JSON-LD for local SEO, and a pause control for the
    carousel.
  - `CLAUDE.md` still describes the old single-file architecture — update it.
  - When Node is upgraded to ≥22.22.3, move to **Angular 22** via `ng update`.
