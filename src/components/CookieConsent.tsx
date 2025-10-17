// src/components/CookieConsent.tsx
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '../lib/utils'
import CookieSettingsModal from './CookieSettingsModal'
import { useCookieConsent, CookieCategories } from '../contexts/CookieConsentContext'
import { FaCookieBite } from 'react-icons/fa' // Importējam sīkfailu ikonu no React Icons (Font Awesome)

const COOKIE_CONSENT_KEY = 'cookie_consent_settings'

const CookieConsent: React.FC = () => {
  const { t } = useTranslation()
  const { settings, updateSettings, isLoaded } = useCookieConsent()
  const [isBannerVisible, setIsBannerVisible] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    const hasSavedSettings = localStorage.getItem(COOKIE_CONSENT_KEY) !== null

    if (!hasSavedSettings) {
      const timer = setTimeout(() => {
        setIsBannerVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isLoaded])

  const handleAcceptAll = () => {
    const allSettings: CookieCategories = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    updateSettings(allSettings)
    setIsBannerVisible(false)
    setIsModalVisible(false)
  }

  const handleSaveSettings = (modalSettings: CookieCategories) => {
    updateSettings(modalSettings)
    setIsBannerVisible(false)
    setIsModalVisible(false)
  }

  const openSettingsModal = () => {
    setIsModalVisible(true)
    setIsBannerVisible(false)
  }

  const closeSettingsModal = () => {
    setIsModalVisible(false)
    const hasSavedSettings = localStorage.getItem(COOKIE_CONSENT_KEY) !== null
    if (!hasSavedSettings) {
      setIsBannerVisible(true)
    }
  }

  return (
    <>
      {/* Pamata paziņojuma josla */}
      {isBannerVisible && (
        <div
          className={cn(
            'fixed bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 bg-gray-800 text-white p-6 rounded-lg shadow-xl z-[9999]',
            'transform transition-transform duration-300 ease-in-out',
            isBannerVisible ? 'translate-y-0' : 'translate-y-full'
          )}
        >
          <div className='container mx-auto flex flex-col md:flex-row items-center justify-between px-0'>
            {/* Ikonas un teksta konteiners */}
            <div className='flex items-center mb-4 md:mb-0 md:mr-6'>
              {' '}
              {/* Pielāgotas atstarpes un izlīdzināšana */}
              <FaCookieBite className='text-primary text-2xl mr-3 flex-shrink-0' />{' '}
              {/* Sīkfailu ikona */}
              <p className='text-xs sm:text-sm text-center md:text-left flex-grow'>
                {' '}
                {/* Pielāgotas klases tekstam */}
                {t(
                  'cookieConsent.text',
                  'Šī vietne izmanto sīkfailus, lai uzlabotu jūsu pieredzi. Turpinot lietot vietni, jūs piekrītat sīkfailu izmantošanai.'
                )}{' '}
                <a
                  href='/privacy-policy'
                  className='text-primary hover:underline whitespace-nowrap'
                >
                  {' '}
                  {/* Pievienots whitespace-nowrap */}
                  {t('cookieConsent.policyLink', 'Uzzināt vairāk')}
                </a>
              </p>
            </div>
            <div className='flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0'>
              {' '}
              {/* Pievienots flex-shrink-0 */}
              <button
                onClick={openSettingsModal}
                className='bg-gray-600 text-white px-5 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 transition-colors duration-200 flex-shrink-0 text-sm w-full sm:w-auto'
              >
                {t('cookieConsent.customizeButton', 'Pielāgot')}
              </button>
              <button
                onClick={handleAcceptAll}
                className='bg-primary text-white px-5 py-2 rounded-md hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 transition-colors duration-200 flex-shrink-0 text-sm w-full sm:w-auto'
              >
                {t('cookieConsent.acceptAllButton', 'Pieņemt visus')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sīkfailu iestatījumu modālais logs */}
      <CookieSettingsModal
        isVisible={isModalVisible}
        settings={settings}
        onClose={closeSettingsModal}
        onSave={handleSaveSettings}
      />
    </>
  )
}

export default CookieConsent
