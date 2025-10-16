// src/contexts/CookieConsentContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const COOKIE_CONSENT_KEY = 'cookie_consent_settings';

export interface CookieCategories {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentContextType {
  settings: CookieCategories;
  updateSettings: (newSettings: CookieCategories) => void;
  isLoaded: boolean;
}

const defaultSettings: CookieCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const CookieConsentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<CookieCategories>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log('CookieConsentContext useEffect izpildās'); // DIAGNOSTIKA
    const savedSettings = localStorage.getItem(COOKIE_CONSENT_KEY);
    console.log('Context - Saved settings:', savedSettings); // DIAGNOSTIKA

    if (savedSettings) {
      try {
        const parsedSettings: CookieCategories = JSON.parse(savedSettings);
        console.log('Context - Parsed settings:', parsedSettings); // DIAGNOSTIKA
        setSettings(parsedSettings);
      } catch (error) {
        console.error('Kļūda parsējot sīkfailu iestatījumus no localStorage:', error);
        // Ja parsēšana neizdodas, izmantojam noklusējuma iestatījumus
        setSettings(defaultSettings);
      }
    } else {
      console.log('Context - Nav saglabātu iestatījumu localStorage, izmanto noklusējuma.'); // DIAGNOSTIKA
      // Ja nav saglabātu iestatījumu, vienkārši izmantojam noklusējuma iestatījumus (kas jau ir inicializēti useState)
    }
    setIsLoaded(true); // Atzīmējam, ka sākotnējā ielāde ir pabeigta
  }, []);

  const updateSettings = (newSettings: CookieCategories) => {
    setSettings(newSettings);
    // Saglabājam iestatījumus localStorage tikai tad, kad tie tiek atjaunināti
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newSettings));
  };

  return (
    <CookieConsentContext.Provider value={{ settings, updateSettings, isLoaded }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};