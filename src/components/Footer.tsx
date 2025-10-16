// src/components/Footer.tsx
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Instagram, Facebook, Linkedin } from 'lucide-react'
import Button from './Button'
import { cn } from '../lib/utils'
import { useLocation, useNavigate } from 'react-router-dom'

// ✅ Logo no assets
import logoBlack from '@/assets/logo-black.png'

const sectionIds = ['home', 'about', 'services', 'gallery', 'testimonials', 'blog', 'faq', 'contact']

const Footer: React.FC = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')

  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'

  // ===== Helpers =====
  const getNavbarHeight = () => {
    const h = getComputedStyle(document.documentElement).getPropertyValue('--nav-h')?.trim() || '0px'
    const parsed = Number(h.replace('px', ''))
    return Number.isFinite(parsed) ? parsed : 0
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const navH = getNavbarHeight()
    const top = el.getBoundingClientRect().top + window.scrollY
    const offsetTop = Math.max(top - navH - 15, 0)
    window.scrollTo({ top: offsetTop, behavior: 'smooth' })
  }

  const handleFooterNavClick = (id: string) => {
    if (isHomePage) {
      scrollToSection(id)
    } else {
      if (id === 'home') navigate('/')
      else navigate(`/#${id}`)
    }
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter subscription:', email)
    setEmail('')
    alert(t('footer.newsletter.successMessage') || 'Thanks for subscribing!')
  }

  const contactPhone = t('contact.info.phone.value', '(+371) 20 533 256')
  const telLink = `tel:${contactPhone.replace(/[\s()\-]/g, '')}`
  const contactEmail = t('contact.info.email.value', 'info@printstudio.lv')
  const mailtoLink = `mailto:${contactEmail}`

  // ✅ Darba laiks var būt string vai string[] (no lv.ts)
  const hoursVal = t('contact.info.hours.value', { returnObjects: true }) as string[] | string

  const newsletterInputStyles = cn(
    'w-full px-3 py-2 rounded-lg text-sm',
    'bg-surface border border-border-color text-text-base placeholder-text-muted',
    'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50',
    'transition-all duration-300'
  )

  return (
    <footer className="border-t border-border-color bg-background py-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {/* Logo + apraksts */}
          <div className="md:col-span-2 lg:col-span-1">
            <button
              onClick={() => handleFooterNavClick('home')}
              className="group mb-4 flex items-center space-x-2 focus:outline-none"
              aria-label={t('nav.goToHomepage', 'Go to homepage')}
            >
              <img
                src={logoBlack}
                alt="PrintStudio Logo"
                width={160}
                height={40}
                className="h-10 w-auto"
                loading="lazy"
                decoding="async"
              />
            </button>

            <p className="mb-4 text-sm leading-relaxed text-text-muted">
              {t('footer.description', 'High-quality print services turning your vision into reality.')}
            </p>

            <div className="flex space-x-3" role="list" aria-label={t('footer.socialLinks', 'Social Links')}>
              <SocialLink href="https://instagram.com/printstudio" icon={<Instagram size={18} />} label="Instagram" />
              <SocialLink href="https://facebook.com/printstudio" icon={<Facebook size={18} />} label="Facebook" />
              <SocialLink href="https://linkedin.com/company/printstudio" icon={<Linkedin size={18} />} label="LinkedIn" />
            </div>
          </div>

          {/* Ātrās saites */}
          <div>
            <h4 className="mb-3 text-base font-semibold text-text-base">
              {t('footer.quickLinks', 'Quick Links')}
            </h4>

            <nav aria-label={t('footer.quickLinks', 'Quick Links')}>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                {sectionIds.map(id => (
                  <FooterLink
                    key={id}
                    id={id}
                    text={t(`nav.${id}`, id.charAt(0).toUpperCase() + id.slice(1))}
                    onClick={() => handleFooterNavClick(id)}
                  />
                ))}
              </div>
            </nav>
          </div>

          {/* Kontakti */}
          <div>
            <h4 className="mb-3 text-base font-semibold text-text-base">
              {t('footer.contact', 'Contact Info')}
            </h4>
            <address className="not-italic">
              <ul className="space-y-2 text-sm">
                <li className="text-text-muted">
                  {t('contact.info.location.value', 'Tirgoņu iela 18, Liepāja, LV-3401')}
                </li>
                <li>
                  <a href={telLink} className="transition-colors duration-300 text-text-muted hover:text-primary">
                    {contactPhone}
                  </a>
                </li>
                <li className="break-words">
                  <a href={mailtoLink} className="transition-colors duration-300 text-text-muted hover:text-primary">
                    {contactEmail}
                  </a>
                </li>
                {/* ✅ Darba laiks – atbalsta masīvu un stringu */}
                <li className="text-text-muted">
                  {Array.isArray(hoursVal) ? (
                    <div className="space-y-0.5">
                      {hoursVal.map((line, i) => (
                        <p key={i} className="break-words">{line}</p>
                      ))}
                    </div>
                  ) : (
                    <span className="break-words">{hoursVal || 'P–Pk: 10:00–17:00'}</span>
                  )}
                </li>
              </ul>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-3 text-base font-semibold text-text-base">
              {t('footer.newsletter.title', 'Newsletter')}
            </h4>
            <p className="mb-3 text-sm text-text-muted">
              {t('footer.newsletter.description', 'Subscribe for updates.')}
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2" noValidate>
              <label htmlFor="newsletter-email" className="sr-only">
                {t('footer.newsletter.placeholder', 'Your email address')}
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('footer.newsletter.placeholder', 'Your email address')}
                className={newsletterInputStyles}
                required
                inputMode="email"
                autoComplete="email"
                aria-label={t('footer.newsletter.placeholder', 'Your email address')}
              />
              <Button type="submit" variant="primary" size="sm" className="w-full rounded-lg">
                {t('footer.newsletter.button', 'Subscribe')}
              </Button>
            </form>
          </div>
        </div>

        <hr className="my-8 border-border-color" />

        <div className="flex flex-col items-center justify-between space-y-3 text-center text-xs text-text-muted/70 md:flex-row md:space-y-0 md:text-left">
          <div className="flex flex-col items-center space-y-1 md:flex-row md:space-y-0 md:space-x-4">
            <p>
              {t('footer.copyright', `© ${new Date().getFullYear()} PrintStudio. All rights reserved.`)}
            </p>
            <p>{t('footer.developer', 'Developed by SIA Printstudio web design team')}</p>
          </div>

          <div className="flex space-x-4">
            <a href="/privacy-policy" className="transition-colors text-text-muted/70 hover:text-text-muted">
              {t('footer.privacy', 'Privacy Policy')}
            </a>
            <a href="/terms-of-service" className="transition-colors text-text-muted/70 hover:text-text-muted">
              {t('footer.terms', 'Terms of Service')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  label: string
}
const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-full bg-surface text-text-muted shadow-md transition-all duration-300 ease-in-out hover:bg-primary/10 hover:text-primary hover:shadow-lg'
      )}
      aria-label={label}
    >
      {icon}
    </a>
  )
}

interface FooterLinkProps {
  id: string
  text: string
  onClick: () => void
}
const FooterLink: React.FC<FooterLinkProps> = ({ id, text, onClick }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className="w-full text-left text-sm text-text-muted transition-colors duration-300 hover:text-primary"
        aria-label={text}
      >
        {text}
      </button>
    </div>
  )
}

export default Footer
