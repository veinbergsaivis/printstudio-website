// src/App.tsx
import React, { Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/ErrorBoundary'
import PasswordGate from './components/PasswordGate'

// Koplietojamie komponenti
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import BackToTop from './components/BackToTop' // ✅ JAUNS: bultiņa uz augšu
import SEO from './components/SEO' // SEO komponente

// Context Provider
import { CookieConsentProvider } from './contexts/CookieConsentContext'

// Sadaļas (HomePage sastāvdaļas)
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import GallerySection from './sections/GallerySection'
import BlogSection from './sections/BlogSection'
import ContactSection from './sections/ContactSection'
import TestimonialsSection from './sections/TestimonialsSection'
import FaqSection from './sections/FaqSection'
import FileGuidelinesPage from './pages/FileGuidelinesPage'

// Lapas
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsOfServicePage = React.lazy(() => import('./pages/TermsOfServicePage'))
const BlogPage = React.lazy(() => import('./pages/BlogPage'))
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage'))
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'))

// ✅ JAUNA lapa: Cenrādis
const PricingPage = React.lazy(() => import('./pages/PricingPage'))

// — HomePage (sadaļas vienā lapā) —
const HomePage: React.FC = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <main>
      <SEO />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <BlogSection />
      <FaqSection />
      <ContactSection />
    </main>
  )
}

// — App ar maršrutēšanu —
function App() {
  const { i18n } = useTranslation()

  // Contrast check disabled in development to reduce console noise
  // Re-enable for accessibility audits by uncommenting below:
  /*
  useEffect(() => {
    // Pārbauda krāsu kontrastu pēc komponentes ielādes
    import('./utils/colorContrast').then(({ checkAllTextContrast }) => {
      checkAllTextContrast();
    });
  }, []);
  */

  useEffect(() => {
    // Sync <html lang> with current i18n language
    try {
      document.documentElement.lang = i18n.language || 'lv'
    } catch {}
  }, [i18n.language])

  return (
    <Router>
      <HelmetProvider>
        <ErrorBoundary>
          <CookieConsentProvider>
            <PasswordGate>
              <div className='flex min-h-screen flex-col bg-background text-text-base'>
                <Navbar />
                {/* ✅ pt-nav uz wrappera ap Routes, lai visām lapām ir pareizā atstarpe */}
                <div className='flex-grow pt-nav'>
                  <Suspense
                    fallback={
                      <div className='container mx-auto px-4 py-8 text-text-muted'>Loading…</div>
                    }
                  >
                    <Routes>
                      {/* Sākumlapa ar sekcijām */}
                      <Route path='/' element={<HomePage />} />
                      {/* ✅ Cenrādis */}
                      <Route path='/pricing' element={<PricingPage />} />
                      {/* Citas lapas */}
                      <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
                      <Route path='/terms-of-service' element={<TermsOfServicePage />} />
                      <Route path='/file-guidelines' element={<FileGuidelinesPage />} />
                      {/* Blogs */}
                      <Route path='/blog' element={<BlogPage />} />
                      <Route path='/blog/:postId' element={<BlogPostPage />} />
                      {/* 404 */}
                      <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                  </Suspense>
                </div>
                {/* ✅ Bultiņa uz augšu (globāli visā lapā) */}
                <BackToTop />
                <Footer />
                <CookieConsent />
              </div>
            </PasswordGate>
          </CookieConsentProvider>
        </ErrorBoundary>
      </HelmetProvider>
    </Router>
  )
}

export default App
