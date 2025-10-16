// src/App.tsx
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/ErrorBoundary'

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
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import NotFoundPage from './pages/NotFoundPage'

// ✅ JAUNA lapa: Cenrādis
import PricingPage from './pages/PricingPage'

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
  useEffect(() => {
    // Pārbauda krāsu kontrastu pēc komponentes ielādes
    import('./utils/colorContrast').then(({ checkAllTextContrast }) => {
      checkAllTextContrast();
    });
  }, []);

  return (
    <Router>
      <HelmetProvider>
        <ErrorBoundary>
          <CookieConsentProvider>
          <div className="flex min-h-screen flex-col bg-background">
            <Navbar />

          {/* ✅ pt-nav uz wrappera ap Routes, lai visām lapām ir pareizā atstarpe */}
          <div className="flex-grow pt-nav">
            <Routes>
              {/* Sākumlapa ar sekcijām */}
              <Route path="/" element={<HomePage />} />

              {/* ✅ Cenrādis */}
              <Route path="/pricing" element={<PricingPage />} />

              {/* Citas lapas */}
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/file-guidelines" element={<FileGuidelinesPage />} />
              {/* Blogs */}
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:postId" element={<BlogPostPage />} />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>

          {/* ✅ Bultiņa uz augšu (globāli visā lapā) */}
          <BackToTop />

          <Footer />
          <CookieConsent />
          </div>
        </CookieConsentProvider>
      </HelmetProvider>
    </Router>
  )
}

export default App
