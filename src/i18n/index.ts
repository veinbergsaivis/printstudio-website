// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en';
import lv from './locales/lv';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      lv: {
        translation: lv
      }
    },
    lng: 'lv', // Noklusējuma valoda - Latviešu
    fallbackLng: 'lv',
    interpolation: {
      escapeValue: false
    },
    supportedLngs: ['lv', 'en'],
    nonExplicitSupportedLngs: false,
  });

export default i18n;