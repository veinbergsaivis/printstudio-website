import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils'; // vai clsx, ja cn nav

const SHOW_AFTER = 320;  // px – cik zemu jānoritina, lai poga parādās
const BASE_BOTTOM = 28;  // px – attālums no apakšas

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [footerOverlap, setFooterOverlap] = useState(0);
  const footerObserver = useRef<IntersectionObserver | null>(null);

  const footerEl = useMemo(
    () => (typeof document !== 'undefined' ? document.querySelector('footer') : null),
    []
  );

  // Parādīt/slēpt pēc scroll
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Pārvieto pogu augstāk, ja redzams footer
  useEffect(() => {
    if (!footerEl) return;
    footerObserver.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const ratio = entry.intersectionRatio;
            const extra = Math.min(120, 40 + ratio * 160);
            setFooterOverlap(extra);
          } else {
            setFooterOverlap(0);
          }
        }
      },
      { root: null, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    footerObserver.current.observe(footerEl);
    return () => footerObserver.current?.disconnect();
  }, [footerEl]);

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  const bottomStyle = {
    bottom: `calc(${BASE_BOTTOM}px + env(safe-area-inset-bottom, 0px) + ${footerOverlap}px)`,
  } as React.CSSProperties;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Atpakaļ uz augšu"
      style={bottomStyle}
      className={cn(
        // Pozīcija
        'fixed right-6 z-50 rounded-full p-4',
        // Krāsu un kontūru dizains
        'bg-red-50 text-red-500 border border-red-200 shadow-md',
        // Hover efekti (tumšāks fons, izteiktāka bulta, lift animācija)
        'hover:bg-red-100 hover:text-red-600 hover:border-red-400 hover:scale-105 hover:shadow-lg',
        // Fokusam pievienots redzams gredzens
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        // Pārejas – premium easing
        'transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]',
        // Parādīšanās/paslēpšanās animācija
        visible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
      )}
    >
      <ArrowUp className="h-5 w-5" />
      <span className="sr-only">Uz lapas augšu</span>
    </button>
  );
};

export default BackToTop;
