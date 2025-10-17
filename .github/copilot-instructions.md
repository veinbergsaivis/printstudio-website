# Copilot instructions for this repo

Concise rules for AI coding agents working in this Vite + React + TypeScript + Tailwind project.

## Architecture

- App shell: `src/App.tsx` uses React Router. Home is a single page composed of sections (Hero, About, Services, Gallery, Testimonials, Blog, FAQ, Contact). Standalone pages: `Pricing`, `File Guidelines`, `Blog`, `Policies`, `404` in `src/pages/*`.
- SEO: Base meta in `index.html`; per-page overrides via `src/components/SEO.tsx` (react-helmet-async). Prefer the SEO component for routed pages.
- i18n: `src/i18n/index.ts` configures i18next with `fallbackLng: 'lv'`, `supportedLngs: ['lv','en']`. Translations live in `src/i18n/locales/{lv,en}.ts`. Use `useTranslation()`; for strings with inline HTML/links use `<Trans>` when needed.
- Styling: TailwindCSS tokens in `tailwind.config.js`. Dark mode is `class`-based; initialized in `src/main.tsx` from localStorage/system preference.
- Assets: Public SEO assets in `public/` (robots.txt, sitemap.xml, site.webmanifest, `public/og/`). Images are optimized at build via `vite-plugin-image-optimizer` in `vite.config.ts`.
- Utilities/contexts: `src/lib/utils.ts` (e.g., `cn`). Cookie consent in `src/contexts/CookieConsentContext.tsx`. Color contrast auto-check on mount in `App.tsx` via `src/utils/colorContrast.ts`.

## Conventions

- Routing lives in `App.tsx`. Home sections are inline; add new pages in `src/pages/*` and wire a `<Route>`.
- Always place `<SEO title description url image />` near the top of pages to set canonical and OG/Twitter meta.
- i18n key shapes matter. `PricingPage.tsx` expects `pricing.categories` with keys: `kopesana, skenesana, druka, foto, laminesana, citi` each with `{ title, rows: {name, price}[] }`. Maintain LV/EN parity.
- Some translations include HTML anchors (e.g., FAQ answers linking to `/pricing` or `/file-guidelines`). Prefer `<Trans i18nKey="faq.q3.answer" components={{ a: <a className="text-primary hover:underline"/> }} />` instead of raw HTML where possible.
- Path alias: `@` → `./src` (Vite resolve; mapped in `jest.config.json`).
- Navbar has a special active-state handling for `/pricing`; mirror the pattern for similar routes.

## Workflows

- Dev server: `npm run dev` (Vite on :5173)
- Build: `npm run build` (TypeScript build + Vite)
- Preview: `npm run preview`
- Lint: `npm run lint` (flat config; single quotes, no semicolons; warns on console/unused)
- Format: `npm run format` / `npm run format:check`
- Unit tests: `npm test` (Jest + RTL; setup `src/setupTests.ts`)
- E2E: `npm run test:e2e` (starts dev then Cypress; see `cypress.config.ts`)

## SEO/content specifics

- `<html lang="lv">` is set in `index.html`. If adding runtime language switch, update `document.documentElement.lang` accordingly.
- GA in `index.html` uses placeholder `G-XXXXXXXXXX` and default consent. Replace only with a real ID.
- Keep `public/robots.txt`, `public/sitemap.xml`, and OG images up to date when adding routes.

## Performance & a11y

- Images: auto-optimized by `ViteImageOptimizer` (quality ~80, SVG multipass). Prefer modern formats; `public/` assets are fine.
- Tailwind purge is configured via `content` globs; avoid unused large CSS.
- Consider code-splitting heavy pages with `React.lazy` if bundle grows.
- `checkAllTextContrast()` runs on mount; ensure accessible contrast and visible focus states.

## Adding a page (quick recipe)

1. Create `src/pages/MyPage.tsx` using `useTranslation()` and `<SEO ... />`.
2. Add route in `App.tsx` and optional nav link in `src/components/Navbar.tsx`.
3. Add LV/EN keys in `src/i18n/locales/{lv,en}.ts` following existing shapes.
4. Update public SEO assets if necessary.

## Gotchas

- Don’t remove required translation keys (e.g., `pricing.categories.*`). Missing keys will break pages.
- Inline HTML in translations should use `<Trans>` to keep safety and structure.
- `optimizeDeps.exclude` includes `lucide-react`; avoid importing deep internal paths that might bypass Vite’s pre-bundling.
