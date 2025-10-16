// src/components/CookieConsent.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import CookieSettingsModal from './CookieSettingsModal';
import { useCookieConsent, CookieCategories } from '../contexts/CookieConsentContext';
import { FaCookieBite } from 'react-icons/fa'; // Importējam sīkfailu ikonu no React Icons (Font Awesome)

const COOKIE_CONSENT_KEY = 'cookie_consent_settings';

const CookieConsent: React.FC = () => {
  console.log('CookieConsent tiek atveidots');
  const { t } = useTranslation();
  const { settings, updateSettings, isLoaded } = useCookieConsent();
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  console.log('CookieConsent - isBannerVisible:', isBannerVisible, 'isModalVisible:', isModalVisible, 'isLoaded:', isLoaded, 'settings:', settings);

  useEffect(() => {
    console.log('CookieConsent useEffect izpildās (atkarīgs no isLoaded)');

    if (!isLoaded) {
      console.log('CookieConsent useEffect - Context vēl nav ielādēts, izlaiž.');
      return;
    }

    console.log('CookieConsent useEffect - Context ielādēts.');

    const hasSavedSettings = localStorage.getItem(COOKIE_CONSENT_KEY) !== null;
    console.log('CookieConsent useEffect - hasSavedSettings:', hasSavedSettings);


    if (!hasSavedSettings) {
      console.log('Nav saglabātu iestatījumu localStorage, parāda baneri pēc aizkaves.');
      const timer = setTimeout(() => {
        setIsBannerVisible(true);
        console.log('Baneris tagad ir redzams.');
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      console.log('Saglabāti iestatījumi atrasti, baneris netiks parādīts.');
    }

  }, [isLoaded]);

  const handleAcceptAll = () => {
    console.log('Nospieda "Pieņemt visus"');
    const allSettings: CookieCategories = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    updateSettings(allSettings);
    setIsBannerVisible(false);
    setIsModalVisible(false);
    console.log('Pieņemti visi sīkfaili.');
  };

  const handleSaveSettings = (modalSettings: CookieCategories) => {
    console.log('Nospieda "Saglabāt iestatījumus" modālajā logā');
    updateSettings(modalSettings);
    setIsBannerVisible(false);
    setIsModalVisible(false);
    console.log('Sīkfailu iestatījumi saglabāti:', modalSettings);
  };

  const openSettingsModal = () => {
    console.log('Atver modālo logu');
    setIsModalVisible(true);
    setIsBannerVisible(false);
  };

  const closeSettingsModal = () => {
    console.log('Aizver modālo logu');
    setIsModalVisible(false);
    const hasSavedSettings = localStorage.getItem(COOKIE_CONSENT_KEY) !== null;
     if (!hasSavedSettings) {
       setIsBannerVisible(true);
     }
  };

  return (
    <>
      {/* Pamata paziņojuma josla */}
      {isBannerVisible && (
        <div className={cn(
          'fixed bottom-4 left-4 right-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 bg-gray-800 text-white p-6 rounded-lg shadow-xl z-[9999]',
          'transform transition-transform duration-300 ease-in-out',
          isBannerVisible ? 'translate-y-0' : 'translate-y-full'
        )}>
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-0">
            {/* Ikonas un teksta konteiners */}
            <div className="flex items-center mb-4 md:mb-0 md:mr-6"> {/* Pielāgotas atstarpes un izlīdzināšana */}
              <FaCookieBite className="text-primary text-2xl mr-3 flex-shrink-0" /> {/* Sīkfailu ikona */}
              <p className="text-xs sm:text-sm text-center md:text-left flex-grow"> {/* Pielāgotas klases tekstam */}
                {t('cookieConsent.text', 'Šī vietne izmanto sīkfailus, lai uzlabotu jūsu pieredzi. Turpinot lietot vietni, jūs piekrītat sīkfailu izmantošanai.')}
                {' '}
                <a href="/privacy-policy" className="text-primary hover:underline whitespace-nowrap"> {/* Pievienots whitespace-nowrap */}
                  {t('cookieConsent.policyLink', 'Uzzināt vairāk')}
                </a>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0"> {/* Pievienots flex-shrink-0 */}
              <button
                onClick={openSettingsModal}
                className="bg-gray-600 text-white px-5 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 transition-colors duration-200 flex-shrink-0 text-sm w-full sm:w-auto"
              >
                {t('cookieConsent.customizeButton', 'Pielāgot')}
              </button>
              <button
                onClick={handleAcceptAll}
                className="bg-primary text-white px-5 py-2 rounded-md hover:bg-primary-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 transition-colors duration-200 flex-shrink-0 text-sm w-full sm:w-auto"
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
  );
};

export default CookieConsent;