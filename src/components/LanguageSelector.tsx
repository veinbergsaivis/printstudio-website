import React from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '../lib/utils' // Importējam cn, ja nepieciešams

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    try {
      // i18next browser detector uses 'i18nextLng' key in localStorage by default
      localStorage.setItem('i18nextLng', lng)
    } catch (e) {
      // ignore
    }
  }

  // Bāzes stili pogām
  const baseButtonStyles = cn(
    'px-2 py-1 rounded-md text-sm font-medium', // Pievienots font-medium un text-sm
    'transition-all duration-300',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-background' // Pievienoti fokusa stili
  )

  // Stili aktīvai pogai
  // === KRĀSAS NOMAINĪTAS ===
  const activeButtonStyles = cn(
    'bg-primary text-background' // Aktīvās pogas fons (primārais) un teksts (fona krāsa kontrastam)
  )

  // Stili neaktīvai pogai
  // === KRĀSAS NOMAINĪTAS ===
  const inactiveButtonStyles = cn(
    'text-text-muted hover:text-text-base' // Neaktīvās pogas teksts (pieklusināts) un hover (pamata)
  )

  return (
    <div className='flex items-center space-x-1 md:space-x-2'>
      {' '}
      {/* Nedaudz pielāgota atstarpe */}
      <button
        onClick={() => changeLanguage('en')}
        className={cn(
          baseButtonStyles,
          i18n.language === 'en' ? activeButtonStyles : inactiveButtonStyles
        )}
        aria-pressed={i18n.language === 'en'} // Pievienots aria-pressed pieejamībai
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('lv')}
        className={cn(
          baseButtonStyles,
          i18n.language === 'lv' ? activeButtonStyles : inactiveButtonStyles
        )}
        aria-pressed={i18n.language === 'lv'} // Pievienots aria-pressed pieejamībai
      >
        LV
      </button>
    </div>
  )
}

export default LanguageSelector
