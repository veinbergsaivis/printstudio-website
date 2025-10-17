// src/components/Navbar.tsx
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { X, Menu } from 'lucide-react'
import { cn } from '../lib/utils'
import { useLocation, useNavigate } from 'react-router-dom'
import logoBlack from '@/assets/logo-black.webp'
import LanguageSelector from './LanguageSelector'

const sectionIds = [
  'home',
  'about',
  'services',
  'gallery',
  'testimonials',
  'blog',
  'faq',
  'contact',
] as const
const pageLinks = [
  { id: 'pricing', path: '/pricing' },
  { id: 'guidelines', path: '/file-guidelines' },
] as const

interface NavLinkProps {
  children: React.ReactNode
  onClick: () => void
  isActive: boolean
  className?: string
}

const NavLink: React.FC<NavLinkProps> = ({ children, onClick, isActive, className }) => {
  return (
    <button
      className={cn(
        'relative font-medium group transition-colors duration-200 px-4 py-3 rounded-lg text-sm leading-6 min-h-[48px] min-w-[48px]', // palielināts touch target
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-primary',
        isActive ? 'text-primary' : 'text-text-base hover:text-primary/90',
        className
      )}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      tabIndex={0}
    >
      <span>{children}</span>

      {/* ✅ Lēna, redzama apakšsvītras animācija */}
      <span
        className={cn(
          'absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] bg-current rounded-full',
          'transition-all duration-[1000ms] ease-[cubic-bezier(.22,1,.36,1)]', // ļoti lēna
          'origin-center',
          // neaktīvajam
          !isActive && 'w-0 opacity-0 group-hover:w-[45%] group-hover:opacity-100',
          // aktīvajam
          isActive && 'w-4/5 opacity-100'
        )}
      />
    </button>
  )
}

const Navbar: React.FC = () => {
  const { t } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('home')
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'

  // === Dinamisks navbar augstums → --nav-h ===
  useLayoutEffect(() => {
    const setNavHeightVar = () => {
      if (navRef.current) {
        const h = navRef.current.offsetHeight
        document.documentElement.style.setProperty('--nav-h', `${h}px`)
      }
    }
    setNavHeightVar()
    window.addEventListener('resize', setNavHeightVar)
    return () => window.removeEventListener('resize', setNavHeightVar)
  }, [isScrolled])

  // === Active sekcija (IntersectionObserver) ===
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection('')
      return
    }
    const opts = { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    const cb: IntersectionObserverCallback = entries => {
      entries.forEach(e => e.isIntersecting && setActiveSection(e.target.id))
    }
    const io = new IntersectionObserver(cb, opts)
    const secs = sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    secs.forEach(s => io.observe(s))

    const hashId = location.hash.substring(1)
    if (hashId && sectionIds.includes(hashId as (typeof sectionIds)[number]) && navRef.current) {
      const h = navRef.current.offsetHeight
      const el = document.getElementById(hashId)!
      const top = el.getBoundingClientRect().top + window.scrollY - h - 15
      setTimeout(() => window.scrollTo({ top, behavior: 'auto' }), 80)
      setActiveSection(hashId)
    }
    return () => secs.forEach(s => io.unobserve(s))
  }, [isHomePage, location.hash])

  // === Shrink efekts ===
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // === Body lock tikai < xl un tikai atvērtam mobilajam ===
  useEffect(() => {
    const isSmall = window.matchMedia('(max-width: 1279px)').matches // xl breakpoint
    document.body.style.overflow = mobileMenuOpen && isSmall ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // === Click outside menu ===
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest('button[aria-label*="Menu"]')
      )
        setMobileMenuOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [mobileMenuOpen])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el && navRef.current) {
      const h = navRef.current.offsetHeight
      const top = el.getBoundingClientRect().top + window.scrollY - h - 15
      window.scrollTo({ top, behavior: 'smooth' })
      setActiveSection(id)
    }
    setMobileMenuOpen(false)
  }
  const handleSectionClick = (id: string) => {
    setMobileMenuOpen(false)
    if (isHomePage) scrollToSection(id)
    else navigate(`/#${id}`)
  }

  const handleRouteClick = (path: string) => {
    setMobileMenuOpen(false)
    if (location.pathname !== path) navigate(path)
  }

  const isPricingActive = location.pathname === '/pricing'

  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'py-2' : 'py-5'
      )}
    >
      <div
        className={cn(
          'container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300',
          isScrolled ? 'bg-background/90 backdrop-blur-lg shadow-lg rounded-xl' : 'bg-transparent'
        )}
      >
        <div className={cn('flex items-center justify-between', isScrolled ? 'h-12' : 'h-16')}>
          {/* Logo */}
          <button
            onClick={() => handleSectionClick('home')}
            className='group flex flex-shrink-0 items-center space-x-2 focus:outline-none'
            aria-label={t('nav.goToHomepage', 'Go to homepage')}
          >
            <img
              src={logoBlack}
              alt='PrintStudio Logo'
              width={160}
              height={40}
              className={cn(
                'h-auto w-auto transition-all duration-300',
                isScrolled ? 'max-h-7' : 'max-h-10 sm:max-h-12 lg:max-h-14'
              )}
              loading='eager'
              decoding='async'
            />
          </button>

          {/* Desktop Menu — horizontāli ritināms, bez redzama scrollbar */}
          <div
            className='
              hidden xl:flex items-center
              gap-1 lg:gap-2
              max-w-full min-w-0
              whitespace-nowrap nav-scroll
            '
          >
            {sectionIds.map(id => (
              <NavLink
                key={id}
                onClick={() => handleSectionClick(id)}
                isActive={isHomePage && activeSection === id}
              >
                {t(`nav.${id}`, id.charAt(0).toUpperCase() + id.slice(1))}
              </NavLink>
            ))}
            {/* Vertikālā svītra — tāda pati krāsa kā tekstam, noapaļota */}
            <span className='mx-1 h-5 w-[1px] bg-text-base/70 rounded-full' aria-hidden />
            {pageLinks.map(link => (
              <NavLink
                key={link.id}
                onClick={() => handleRouteClick(link.path)}
                isActive={
                  link.path === '/pricing' ? isPricingActive : location.pathname === link.path
                }
              >
                {t(`nav.${link.id}`, link.id)}
              </NavLink>
            ))}
          </div>

          <div className='ml-2 hidden xl:flex'>
            <LanguageSelector />
          </div>

          {/* Mobile Menu Toggle (zem XL) */}
          <div className='flex items-center space-x-2 xl:hidden'>
            <button
              className={cn(
                'rounded-lg p-2 transition-colors duration-200',
                'text-text-base hover:bg-surface/50',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-text-base focus-visible:ring-offset-2 focus-visible:ring-offset-background'
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={
                mobileMenuOpen ? t('nav.closeMenu', 'Close menu') : t('nav.openMenu', 'Open menu')
              }
              aria-expanded={mobileMenuOpen}
              aria-controls='mobile-menu'
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        id='mobile-menu'
        className={cn(
          'absolute left-0 right-0 top-full mx-4 rounded-xl bg-background/95 backdrop-blur-lg shadow-lg transition-all duration-300 xl:hidden',
          mobileMenuOpen
            ? 'mt-2 max-h-[calc(100vh-var(--nav-h)-16px)] opacity-100 overflow-y-auto'
            : 'pointer-events-none mt-0 max-h-0 opacity-0'
        )}
      >
        <div className='space-y-2 px-4 pt-2 pb-4'>
          {sectionIds.map(id => (
            <NavLink
              key={id}
              onClick={() => handleSectionClick(id)}
              isActive={isHomePage && activeSection === id}
              className='block py-2 text-center'
            >
              {t(`nav.${id}`, id.charAt(0).toUpperCase() + id.slice(1))}
            </NavLink>
          ))}
          <div className='my-2 border-t border-border-color' />
          {pageLinks.map(link => (
            <NavLink
              key={link.id}
              onClick={() => handleRouteClick(link.path)}
              isActive={
                link.path === '/pricing' ? isPricingActive : location.pathname === link.path
              }
              className='block py-2 text-center'
            >
              {t(`nav.${link.id}`, link.id)}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
