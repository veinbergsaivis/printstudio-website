# 🖨️ Print Studio Website

Moderna, daudzvalodu drukātavas mājas lapa, veidota ar React, TypeScript un Tailwind CSS.

[![Deploy Status](https://img.shields.io/badge/deploy-ready-success)](https://github.com/veinbergsaivis/printstudio-website)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

## ✨ Funkcionalitāte

- 🌍 **Daudzvalodu atbalsts** (Latviešu/English) ar i18next
- 🎨 **Moderna UI** ar Tailwind CSS un Framer Motion animācijām
- 📱 **Responsive dizains** - optimizēts visām ierīcēm
- 🚀 **Optimizēta veiktspēja** - lazy loading, code splitting
- 📊 **Google Analytics & GTM** integrācija
- 📝 **SEO optimizācija** - meta tags, sitemap, robots.txt
- 🎯 **Kontakta forma** ar validāciju
- 🍪 **Cookie consent** ar GDPR compliance
- 🖼️ **WebP attēli** optimizētai ielādei
- ♿ **Pieejamība** - ARIA labels, keyboard navigation

## 🛠️ Tehnoloģijas

### Core
- **React 18.3** - UI framework
- **TypeScript 5.6** - Type safety
- **Vite 6.4** - Build tool
- **React Router 7.5** - Routing

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS
- **Framer Motion 12.10** - Animācijas
- **Lucide React** - Ikonas

### Internationalization
- **i18next 23.10** - Tulkošanas sistēma
- **react-i18next** - React integrācija
- **i18next-browser-languagedetector** - Automātiska valodas noteikšana

### SEO & Analytics
- **react-helmet-async** - Meta tags
- **Google Tag Manager** - Analytics & tracking
- **Sitemap & Robots.txt** - SEO optimizācija

### Testing
- **Jest** - Unit tests
- **Cypress** - E2E tests
- **React Testing Library** - Component tests

### Code Quality
- **ESLint** - Linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit checks

## 🚀 Ātrā Uzsākšana

### Priekšnosacījumi

- Node.js 18+ 
- npm vai yarn

### Instalācija

```bash
# Klonēt repozitoriju
git clone https://github.com/veinbergsaivis/printstudio-website.git

# Iet uz projekta direktoriju
cd printstudio-website

# Instalēt dependencies
npm install

# Palaist development server
npm run dev
```

Mājas lapa būs pieejama: `http://localhost:5173`

## 📝 Pieejamie Skripti

```bash
# Development
npm run dev              # Palaist dev server
npm run preview          # Preview production build

# Building
npm run build            # Production build
npm run optimize-images  # Optimizēt attēlus

# Testing
npm run test             # Run unit tests
npm run test:watch       # Watch mode tests
npm run test:coverage    # Test coverage
npm run test:e2e         # E2E tests
npm run cypress:open     # Open Cypress UI

# Code Quality
npm run lint             # Lint code
npm run format           # Format code
npm run format:check     # Check formatting
```

## 📁 Projekta Struktūra

```
project/
├── public/              # Static faili
│   ├── fonts/          # Web fonti
│   ├── og/             # Open Graph attēli
│   ├── robots.txt      # SEO robots
│   └── sitemap.xml     # Sitemap
├── src/
│   ├── components/     # React komponentes
│   ├── sections/       # Lapas sekcijas
│   ├── pages/          # Lapas/Routes
│   ├── contexts/       # React contexts
│   ├── i18n/           # Tulkojumi
│   │   └── locales/    # LV & EN
│   ├── utils/          # Utility funkcijas
│   ├── styles/         # CSS faili
│   └── __tests__/      # Tests
├── cypress/            # E2E tests
├── scripts/            # Build/deploy scripts
└── dist/               # Production build
```

## 🌐 Deployment

### cPanel Deployment

Detalizēta instrukcija: [QUICK_DEPLOY_GUIDE.md](./QUICK_DEPLOY_GUIDE.md)

**Īsumā:**
1. cPanel → Git Version Control → Create
2. Clone URL: `https://github.com/veinbergsaivis/printstudio-website.git`
3. Pielāgo `.cpanel.yml` ar savu username
4. Pull or Deploy HEAD Commit

### Manuāla Upload

```bash
# Build production
npm run build

# Upload dist/* uz public_html/ caur FTP/cPanel File Manager
```

### Alternatīvi Hosting

- **Netlify:** Connect GitHub repo, auto-deploy
- **Vercel:** Import project, auto-deploy
- **GitHub Pages:** Settings → Pages → Deploy from branch

## 🔧 Konfigurācija

### Google Analytics Setup

1. Atver `index.html`
2. Nomainiet GTM ID:
   ```html
   <!-- Google Tag Manager -->
   <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
   new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
   j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
   'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
   })(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
   <!-- Nomainiet GTM-XXXXXXX ar savu ID -->
   ```

### Domēna Konfigurācija

Rediģēt `vite.config.ts` ja deploy uz subdirektoriju:

```typescript
export default defineConfig({
  base: '/subdirectory/', // Ja nav root, norādīt ceļu
  // ...
})
```

## 🎨 Pielāgošana

### Krāsas

Rediģēt `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {...},    // Galvenā krāsa
      secondary: {...},  // Sekundārā krāsa
      accent: {...},     // Akcenta krāsa
    }
  }
}
```

### Saturs

Tulkojumi: `src/i18n/locales/lv.ts` & `en.ts`

### Fonti

Fonti: `public/fonts/` & `src/styles/fonts.css`

## 📊 Veiktspēja

- ✅ Lighthouse Score: 90+
- ✅ Core Web Vitals optimizēti
- ✅ Lazy loading images & components
- ✅ Code splitting per route
- ✅ Gzip compression (.htaccess)
- ✅ Browser caching configured

## 🔒 Drošība

- ✅ CSP headers
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Cookie security
- ✅ HTTPS recommended

## 🐛 Problēmu Risināšana

### Build kļūdas

```bash
# Clear cache
rm -rf node_modules dist .vite
npm install
npm run build
```

### Lint kļūdas

```bash
# Auto-fix
npm run lint

# Bypass for commit
git commit --no-verify
```

## 📄 Licence

Private project - All rights reserved.

## 👨‍💻 Autors

**Aivis Veinbergs**
- GitHub: [@veinbergsaivis](https://github.com/veinbergsaivis)

## 🙏 Atzinības

- React team
- Tailwind CSS team
- Vite team
- Open source community

---

**📧 Kontakts:** info@printstudio.lv

**🌐 Website:** [Coming soon]

---

Made with ❤️ by Print Studio team
