// src/contexts/CookieConsentContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const COOKIE_CONSENT_KEY = 'cookie_consent_settings'

export interface CookieCategories {
  necessary: boolean
  analytics: boolean
  marketing: boolean
}

interface CookieConsentContextType {
  settings: CookieCategories
  updateSettings: (newSettings: CookieCategories) => void
  isLoaded: boolean
}

const defaultSettings: CookieCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

export const CookieConsentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CookieCategories>(defaultSettings)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedSettings = localStorage.getItem(COOKIE_CONSENT_KEY)

    if (savedSettings) {
      try {
        const parsedSettings: CookieCategories = JSON.parse(savedSettings)
        setSettings(parsedSettings)
      } catch (error) {
        console.error('Error parsing cookie consent settings from localStorage:', error)
        setSettings(defaultSettings)
      }
    }
    setIsLoaded(true)
  }, [])

  const updateSettings = (newSettings: CookieCategories) => {
    setSettings(newSettings)
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newSettings))

    // Wire to Google Consent Mode (if gtag is available)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('consent', 'update', {
        analytics_storage: newSettings.analytics ? 'granted' : 'denied',
        ad_storage: newSettings.marketing ? 'granted' : 'denied',
        ad_user_data: newSettings.marketing ? 'granted' : 'denied',
        ad_personalization: newSettings.marketing ? 'granted' : 'denied',
      })
    }
  }

  return (
    <CookieConsentContext.Provider value={{ settings, updateSettings, isLoaded }}>
      {children}
    </CookieConsentContext.Provider>
  )
}

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext)
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider')
  }
  return context
}
