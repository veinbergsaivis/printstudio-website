// src/components/CookieSettingsModal.tsx
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { CookieCategories } from '../contexts/CookieConsentContext'

interface CookieSettingsModalProps {
  isVisible: boolean
  settings: CookieCategories // Saņem sākotnējos iestatījumus no Context
  onClose: () => void
  onSave: (settings: CookieCategories) => void // Sagaida iestatījumus saglabāšanai
}

const CookieSettingsModal: React.FC<CookieSettingsModalProps> = ({
  isVisible,
  settings, // Sākotnējie iestatījumi
  onClose,
  onSave,
}) => {
  const { t } = useTranslation()
  const [modalSettings, setModalSettings] = useState<CookieCategories>(settings)

  useEffect(() => {
    setModalSettings(settings)
  }, [settings])

  if (!isVisible) {
    return null
  }

  const handleToggleCategory = (category: 'analytics' | 'marketing') => {
    setModalSettings(prevSettings => ({
      ...prevSettings,
      [category]: !prevSettings[category],
    }))
  }

  const handleSaveClick = () => {
    onSave(modalSettings)
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white text-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative'>
        {/* Aizvēršanas poga */}
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 rounded-full p-1'
          aria-label={t('cookieConsent.closeButtonLabel', 'Aizvērt')}
        >
          <X size={20} />
        </button>

        <div className='p-6'>
          <h3 className='text-xl font-bold mb-4'>
            {t('cookieConsent.settingsTitle', 'Sīkfailu iestatījumi')}
          </h3>
          <p className='text-sm text-gray-700 mb-6'>
            {t(
              'cookieConsent.settingsDescription',
              'Izvēlieties, kuras sīkfailu kategorijas vēlaties atļaut.'
            )}
          </p>

          {/* Nepieciešamie sīkfaili */}
          <div className='mb-6 pb-4 border-b border-gray-200'>
            <div className='flex items-center justify-between mb-2'>
              <label
                htmlFor='necessary-cookies-modal'
                className='text-base font-medium text-gray-800'
              >
                {t('cookieConsent.category.necessary', 'Nepieciešamie sīkfaili')}
              </label>
              <input
                type='checkbox'
                id='necessary-cookies-modal'
                checked={modalSettings.necessary} // Izmanto modālā loga stāvokli
                disabled // Nepieciešamos sīkfailus nevar atspējot
                className='form-checkbox h-5 w-5 text-primary rounded border-gray-300 cursor-not-allowed'
              />
            </div>
            <p className='text-xs text-gray-600'>
              {t(
                'cookieConsent.category.necessaryDescription',
                'Šie sīkfaili ir būtiski vietnes pamatfunkciju darbībai un tos nevar atspējot.'
              )}
            </p>
          </div>

          {/* Analītikas sīkfaili */}
          <div className='mb-6 pb-4 border-b border-gray-200'>
            <div className='flex items-center justify-between mb-2'>
              <label
                htmlFor='analytics-cookies-modal'
                className='text-base font-medium text-gray-800'
              >
                {t('cookieConsent.category.analytics', 'Analītikas sīkfaili')}
              </label>
              <input
                type='checkbox'
                id='analytics-cookies-modal'
                checked={modalSettings.analytics} // Izmanto modālā loga stāvokli
                onChange={() => handleToggleCategory('analytics')} // Atjaunina modālā loga stāvokli
                className='form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary'
              />
            </div>
            <p className='text-xs text-gray-600'>
              {t(
                'cookieConsent.category.analyticsDescription',
                'Šie sīkfaili palīdz mums saprast, kā apmeklētāji mijiedarbojas ar vietni, vācot un ziņojot informāciju anonīmi.'
              )}
            </p>
          </div>

          {/* Mārketinga sīkfaili */}
          <div className='mb-6 pb-4 border-b border-gray-200'>
            <div className='flex items-center justify-between mb-2'>
              <label
                htmlFor='marketing-cookies-modal'
                className='text-base font-medium text-gray-800'
              >
                {t('cookieConsent.category.marketing', 'Mārketinga sīkfaili')}
              </label>
              <input
                type='checkbox'
                id='marketing-cookies-modal'
                checked={modalSettings.marketing} // Izmanto modālā loga stāvokli
                onChange={() => handleToggleCategory('marketing')} // Atjaunina modālā loga stāvokli
                className='form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary'
              />
            </div>
            <p className='text-xs text-gray-600'>
              {t(
                'cookieConsent.category.marketingDescription',
                'Šie sīkfaili tiek izmantoti, lai izsekotu apmeklētājus tīmekļa vietnēs. Mērķis ir rādīt reklāmas, kas ir atbilstošas un saistošas individuālajam lietotājam.'
              )}
            </p>
          </div>

          <div className='flex justify-end mt-6'>
            <button
              onClick={handleSaveClick} // Izsauc saglabāšanas funkciju
              className='bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors duration-200'
            >
              {t('cookieConsent.saveSettingsButton', 'Saglabāt iestatījumus')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieSettingsModal
