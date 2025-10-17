# Lighthouse Performance Action Plan

**Date:** October 17, 2025  
**Current Scores:** Performance: 26 | Accessibility: 82 | Best Practices: 56 | SEO: 92

---

## 🔥 CRITICAL: Performance (26/100)

### Issue 1: Images (1,186 KB savings potential)

**Impact:** HIGH - Directly affects LCP (16.6s)

**Actions:**

- [ ] Convert all hero images to WebP/AVIF format
- [ ] Implement responsive image srcset for all gallery images
- [ ] Add proper lazy loading to all images
- [ ] Compress existing images (target: 60-70% quality for photos)
- [ ] Use thumbnail versions for preview grids

**Files to modify:**

- `src/sections/HeroSection.tsx` - Hero carousel images
- `src/sections/GallerySection.tsx` - Gallery images
- `src/components/BlogPostCard.tsx` - Blog thumbnail images
- All image assets in `/public` folder

**Expected improvement:** +15-20 points

---

### Issue 2: Unused JavaScript (2,720 KB)

**Impact:** HIGH - Causes TBT (1,070ms) and blocks rendering

**Actions:**

- [ ] Audit bundle with `vite-bundle-visualizer`
- [ ] Remove unused dependencies (check package.json)
- [ ] Implement more granular code splitting
- [ ] Tree-shake unused exports
- [ ] Defer non-critical scripts

**Commands to run:**

```bash
npm install --save-dev rollup-plugin-visualizer
# Add to vite.config.ts and run build
npm run build
```

**Expected improvement:** +10-15 points

---

### Issue 3: Render-Blocking Resources

**Impact:** HIGH - Causes slow FCP (8.4s)

**Actions:**

- [ ] Self-host Google Fonts (already have preload, but external request still blocks)
- [ ] Inline critical CSS for above-the-fold content
- [ ] Defer non-critical CSS
- [ ] Remove unused Tailwind classes in build

**Files to modify:**

- `index.html` - Move fonts to local
- `vite.config.ts` - Add critical CSS plugin

**Expected improvement:** +5-10 points

---

### Issue 4: Network Issues

**Impact:** MEDIUM - "Avoid enormous network payloads" (13,719 KB)

**Actions:**

- [ ] Enable gzip/brotli compression on server
- [ ] Implement CDN for static assets
- [ ] Add service worker for caching
- [ ] Split vendor chunks more aggressively

**Expected improvement:** +5 points

---

## 🟡 Accessibility (82/100)

### Issue 1: ARIA Roles - Missing Required Children

**Impact:** MEDIUM - Screen reader navigation

**Actions:**

- [ ] Audit all `role` attributes
- [ ] Ensure proper ARIA hierarchy (e.g., `tablist` must contain `tab`)
- [ ] Fix carousel/slider ARIA structure

**Files to check:**

- `src/sections/HeroSection.tsx` - Carousel roles
- `src/sections/FaqSection.tsx` - Accordion roles
- `src/components/Navbar.tsx` - Navigation roles

**Expected improvement:** +5 points

---

### Issue 2: Color Contrast

**Impact:** LOW - Some elements don't meet WCAG AA

**Actions:**

- [ ] Re-enable `checkAllTextContrast()` temporarily
- [ ] Identify failing elements
- [ ] Adjust color tokens in `tailwind.config.js`
- [ ] Test with dark mode enabled

**Expected improvement:** +3 points

---

### Issue 3: Touch Targets

**Impact:** LOW - Mobile usability

**Actions:**

- [ ] Ensure all buttons/links are min 48x48px
- [ ] Add padding to small interactive elements
- [ ] Check mobile navigation spacing

**Expected improvement:** +2 points

---

### Issue 4: Heading Order

**Impact:** LOW - Semantic structure

**Actions:**

- [ ] Audit all headings (h1, h2, h3, etc.)
- [ ] Ensure sequential order (no h1 → h3 skips)
- [ ] Fix in all page components

**Expected improvement:** +3 points

---

## 🟡 Best Practices (56/100)

### Issue 1: Console Errors/Warnings

**Impact:** LOW - Developer experience

**Actions:**

- [x] Fixed: "Invalid DOM property `class`" warning (already done)
- [ ] Remove all `console.log` statements in CookieConsent
- [ ] Suppress DevTools React warning in production
- [ ] Fix any remaining console errors

**Files to modify:**

- `src/components/CookieConsent.tsx` - Remove debug logs
- `src/contexts/CookieConsentContext.tsx` - Remove debug logs
- `src/components/CookieSettingsModal.tsx` - Remove debug logs

**Expected improvement:** +10 points

---

### Issue 2: Deprecated APIs

**Impact:** LOW - Future compatibility

**Actions:**

- [ ] Identify deprecated API (likely in dependencies)
- [ ] Update dependencies to latest versions
- [ ] Check Chrome DevTools for specific warning

**Expected improvement:** +5 points

---

### Issue 3: Third-Party Cookies

**Impact:** LOW - Privacy

**Actions:**

- [ ] Verify Google Analytics cookie consent is working
- [ ] Ensure cookies only set after user consent
- [ ] Check GA consent mode implementation

**Expected improvement:** +5 points

---

## ✅ SEO (92/100)

### Issue: Multiple Conflicting Canonical URLs

**Impact:** LOW - Duplicate content confusion

**Actions:**

- [ ] Audit SEO component canonical URL logic
- [ ] Ensure only ONE canonical tag per page
- [ ] Test on pages: /, /pricing, /blog, /file-guidelines

**Files to check:**

- `src/components/SEO.tsx` - Canonical URL logic
- `index.html` - Remove any hardcoded canonical if exists

**Expected improvement:** +5 points (reach 97-100)

---

## 📋 Priority Order (Quick Wins First)

### Phase 1: Quick Wins (1-2 hours)

1. ✅ Remove console.log statements (CookieConsent, Context, Modal)
2. ✅ Fix canonical URL conflicts
3. ✅ Self-host fonts (download Montserrat WOFF2)
4. ✅ Compress existing images with ImageOptim/TinyPNG
5. ✅ Fix heading order across pages

**Expected Score After Phase 1:** Performance: 35-40 | Best Practices: 75

---

### Phase 2: Image Optimization (2-3 hours)

1. Convert hero images to WebP/AVIF
2. Generate responsive srcset variants (480w, 768w, 1024w, 1920w)
3. Implement `<picture>` elements with fallbacks
4. Compress all gallery images

**Expected Score After Phase 2:** Performance: 50-60 | LCP improved to ~8s

---

### Phase 3: Bundle Optimization (2-4 hours)

1. Run bundle analyzer
2. Remove unused dependencies
3. Implement more aggressive code splitting
4. Tree-shake unused code
5. Optimize vendor chunks

**Expected Score After Phase 3:** Performance: 70-80 | TBT reduced to ~300ms

---

### Phase 4: Advanced Optimization (4+ hours)

1. Implement critical CSS inlining
2. Add service worker for caching
3. Set up CDN for static assets
4. Enable Brotli compression
5. Implement resource hints (dns-prefetch, preconnect)

**Expected Final Score:** Performance: 85-92

---

## 🛠️ Commands to Run

### 1. Remove Debug Logs

```bash
# Search for console.log
grep -r "console.log" src/components/CookieConsent.tsx src/contexts/CookieConsentContext.tsx src/components/CookieSettingsModal.tsx
```

### 2. Analyze Bundle

```bash
npm install --save-dev rollup-plugin-visualizer
npm run build
# Check dist/stats.html
```

### 3. Compress Images

```bash
# Install imagemin-cli
npm install --global imagemin-cli imagemin-webp imagemin-avif

# Convert to WebP
imagemin public/**/*.{jpg,png} --out-dir=public --plugin=webp
```

### 4. Self-Host Fonts

```bash
# Download Montserrat from Google Fonts
# Place in public/fonts/
# Update index.html to use local fonts
```

### 5. Test After Changes

```bash
npm run build
npm run preview
# Run Lighthouse again on preview build
```

---

## 📊 Target Scores

| Metric             | Current | Target | Strategy                                                  |
| ------------------ | ------- | ------ | --------------------------------------------------------- |
| **Performance**    | 26      | 85+    | Image optimization + bundle splitting + self-hosted fonts |
| **Accessibility**  | 82      | 95+    | Fix ARIA + contrast + touch targets + heading order       |
| **Best Practices** | 56      | 90+    | Remove console logs + update deps + fix cookies           |
| **SEO**            | 92      | 100    | Fix canonical URL conflicts                               |

---

## ⚠️ Known Limitations

1. **LCP (16.6s)** - Primarily caused by large unoptimized hero images
2. **TBT (1,070ms)** - Heavy JavaScript bundle blocking main thread
3. **Unused JS (2,720 KB)** - Likely from dependencies like Framer Motion, Lucide React, i18next
4. **Network payload (13,719 KB)** - No compression enabled, large images

---

## 🎯 Next Immediate Actions

**Start with Phase 1 (Quick Wins):**

1. **Remove all console.log statements** ← EASIEST, DO NOW
2. **Fix canonical URL** ← Takes 5 minutes
3. **Compress images** ← Use online tools like TinyPNG
4. **Audit heading order** ← Quick scan of components

**Then proceed to Phase 2 (Images)** for maximum impact on Performance score.

---

_Run `npm run build && npm run preview` and re-run Lighthouse after each phase to track progress._
