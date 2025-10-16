// src/sections/HeroSection.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Button from '@/components/Button'
import { cn } from '@/lib/utils'

// RESPONSIVE bildes (3 izmēri katrai)
import hoodie480 from '@/assets/hoodie-480.png'
import hoodie768 from '@/assets/hoodie-768.png'
import hoodie1024 from '@/assets/hoodie-1024.png'
import tshirt480 from '@/assets/tshirt-480.png'
import tshirt768 from '@/assets/tshirt-768.png'
import tshirt1024 from '@/assets/tshirt-1024.png'
import mug480 from '@/assets/mug-480.png'
import mug768 from '@/assets/mug-768.png'
import mug1024 from '@/assets/mug-1024.png'

type Slide = {
  id: string
  alt: string
  src: string
  srcSet: string
  sizes: string
}

const SIZES =
  '(min-width:1536px) 620px, (min-width:1280px) 580px, (min-width:1024px) 520px, (min-width:768px) 480px, 92vw'

const slides: Slide[] = [
  { id: 'hoodie', alt: 'Hoodie mockup', src: hoodie768, srcSet: `${hoodie480} 480w, ${hoodie768} 768w, ${hoodie1024} 1024w`, sizes: SIZES },
  { id: 'tshirt', alt: 'T-krekls mockup', src: tshirt768, srcSet: `${tshirt480} 480w, ${tshirt768} 768w, ${tshirt1024} 1024w`, sizes: SIZES },
  { id: 'mug', alt: 'Krūze mockup', src: mug768, srcSet: `${mug480} 480w, ${mug768} 768w, ${mug1024} 1024w`, sizes: SIZES },
]

const AUTOPLAY_MS = 5000

function useWindowWidth() {
  const [w, setW] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1280)
  useEffect(() => {
    const onResize = () => setW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return w
}

export default function HeroSection() {
  const { t } = useTranslation()
  const [startAnimation, setStartAnimation] = useState(false)
  const [index, setIndex] = useState(0)
  const prefersReducedMotion = useReducedMotion()
  const vw = useWindowWidth()

  const timerRef = useRef<number | null>(null)
  const isHoveringRef = useRef(false)
  const next = useCallback(() => setIndex(i => (i + 1) % slides.length), [])
  const prev = useCallback(() => setIndex(i => (i - 1 + slides.length) % slides.length), [])

  useEffect(() => {
    const tId = window.setTimeout(() => setStartAnimation(true), 80)
    return () => clearTimeout(tId)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      if (!isHoveringRef.current) next()
    }, AUTOPLAY_MS)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [next, prefersReducedMotion])

  // swipe žesti
  const touchStartX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (dx > 30) prev()
    if (dx < -30) next()
    touchStartX.current = null
  }

  const handleCTAClick = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  // Soft blur cross-fade
  const BLUR_PX = 8
  const fadeVariants = prefersReducedMotion
    ? { enter: { opacity: 0, scale: 1.02 }, center: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.98 } }
    : {
        enter: { opacity: 0, scale: 1.02, filter: `blur(${BLUR_PX}px) saturate(90%)` },
        center: { opacity: 1, scale: 1, filter: 'blur(0px) saturate(100%)' },
        exit: { opacity: 0, scale: 0.98, filter: `blur(${BLUR_PX}px) saturate(90%)` },
      }

  // Preload nākamo attēlu
  useEffect(() => {
    const n = (index + 1) % slides.length
    const img = new Image()
    img.src = slides[n].src
    ;(img as any).srcset = slides[n].srcSet
  }, [index])

  const CAROUSEL_MAX = vw >= 1536 ? 640 : vw >= 1280 ? 600 : vw >= 1024 ? 560 : vw >= 768 ? 520 : 460

  return (
    <section
      id="home"
      // bottom fade to blend + small negative margin to avoid any seam
      className="safe-top hero-bottom-fade mb-[-1px] relative flex min-h-[88svh] items-center justify-center overflow-hidden"
      onMouseEnter={() => (isHoveringRef.current = true)}
      onMouseLeave={() => (isHoveringRef.current = false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Clean warm→neutral diagonal gradient (no shine) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#f6b9b9] via-[#e6d8d7] to-[#e6eaed]" />

      <div className="relative z-[2] mx-auto w-full max-w-[1280px] px-6">
        <div className="grid grid-cols-1 items-center justify-items-center gap-10 md:grid-cols-2 lg:gap-14">
          {/* Teksts */}
          <div className="w-full max-w-[680px] justify-self-center md:justify-self-end">
            <h1
              className={cn(
                'text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6',
                'text-text-base',
                'text-[clamp(28px,6.5vw,56px)] md:text-[clamp(34px,5.5vw,64px)]',
                'translate-y-5 opacity-0 transition-all duration-700 ease-out',
                startAnimation && 'translate-y-0 opacity-100'
              )}
            >
              <span className="block">{t('hero.headline.line1', 'Think Bigger.')}</span>
              <span className="bg-gradient-to-r from-[#ff3e57] via-[#ff5a3c] to-[#ff8a19] bg-clip-text text-transparent">
                {t('hero.headline.line2', 'Print Bolder.')}
              </span>
            </h1>

            <p
              className={cn(
                'mb-10 max-w-[60ch] text-base md:text-lg',
                'text-text-base',
                'translate-y-5 opacity-0 transition-all duration-700 ease-out delay-200',
                startAnimation && 'translate-y-0 opacity-100'
              )}
            >
              {t('hero.description','Premium drukas pakalpojumi, kas veidoti, lai celtu jūsu zīmola vērtību ar modernām tehnoloģijām un izcilu kvalitāti.')}
            </p>

            <div
              className={cn(
                'flex flex-col items-center gap-4 sm:flex-row md:items-start',
                'translate-y-5 opacity-0 transition-all duration-700 ease-out [transition-delay:400ms]',
                startAnimation && 'translate-y-0 opacity-100'
              )}
            >
              <Button variant="primary" size="lg" onClick={() => handleCTAClick('services')}>
                {t('hero.cta.services', 'Skatīt pakalpojumus')}
              </Button>
              <Button variant="outline" size="lg" onClick={() => handleCTAClick('contact')}>
                {t('hero.cta.quote', 'Iegūsti piedāvājumu')}
              </Button>
            </div>
          </div>

          {/* Karuselis */}
          <div className="w-full justify-self-center">
            <div
              className="relative mx-auto aspect-[4/3] w-[clamp(340px,92vw,700px)] md:w-[clamp(420px,46vw,700px)]"
              style={{ maxWidth: `${CAROUSEL_MAX}px` }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={slides[index].id}
                  src={slides[index].src}
                  srcSet={slides[index].srcSet}
                  sizes={slides[index].sizes}
                  alt={slides[index].alt}
                  className="absolute inset-0 m-auto max-h-[92%] max-w-[92%] select-none object-contain"
                  variants={fadeVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  style={{ willChange: 'opacity, transform, filter' }}
                />
              </AnimatePresence>

              {/* Bultiņas — kā BackToTop (hover → scale, bez “lēkšanas”) */}
              <button
                onClick={prev}
                aria-label="Iepriekšējais slaids"
                style={{ transform: 'translateY(-50%)' }}
                className={cn(
                  'absolute left-2 md:left-3 top-1/2',
                  'grid place-items-center rounded-full',
                  'bg-red-50 text-red-500 border border-red-200 shadow-md',
                  'transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
                  'hover:scale-105 hover:bg-red-100 hover:text-red-600 hover:border-red-400 hover:shadow-lg',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  'w-11 h-11 md:w-12 md:h-12'
                )}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={next}
                aria-label="Nākamais slaids"
                style={{ transform: 'translateY(-50%)' }}
                className={cn(
                  'absolute right-2 md:right-3 top-1/2',
                  'grid place-items-center rounded-full',
                  'bg-red-50 text-red-500 border border-red-200 shadow-md',
                  'transition-transform duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
                  'hover:scale-105 hover:bg-red-100 hover:text-red-600 hover:border-red-400 hover:shadow-lg',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  'w-11 h-11 md:w-12 md:h-12'
                )}
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Indikatori */}
              <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setIndex(i)}
                    aria-current={i === index}
                    aria-label={`Rādīt: ${s.alt}`}
                    className={cn(
                      'h-2 w-2 rounded-full transition',
                      i === index ? 'bg-red-500' : 'bg-neutral-400/60 hover:bg-neutral-600'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
