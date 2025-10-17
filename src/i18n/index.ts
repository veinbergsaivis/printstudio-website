// src/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en'
import lv from './locales/lv'

i18n
  .use(LanguageDetector) // Vari atstāt LanguageDetector, bet tas tagad vienmēr izvēlēsies LV, ja tā ir vienīgā pieejamā
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      lv: {
        translation: lv,
      },
    },
    // lng: 'lv', // OPCIONĀLI: Vari pievienot šo, lai nodrošinātu, ka LV ir noklusējuma, pat ja detektors mēģina atrast citu
    fallbackLng: 'lv', // <--- UZSTĀDA REZERVES VALODU UZ LV
    interpolation: {
      escapeValue: false,
    },
    // OPCIONĀLI: Iestati atļautās valodas, ja izmanto LanguageDetector
    supportedLngs: ['lv', 'en'],
    nonExplicitSupportedLngs: true, // Atļauj detektoram mēģināt atrast valodas, kas nav sarakstā, bet tās netiks ielādētas
  })

export default i18n
