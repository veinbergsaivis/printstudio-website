// src/pages/NotFoundPage.tsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Frown } from 'lucide-react'; // Vari izmantot kādu citu ikonu, ja vēlies

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  // Dinamiski iegūst Navbar un Footer augstumu
  useEffect(() => {
    const navbarElement = document.querySelector('nav[style*="position: fixed"]');
    const footerElement = document.querySelector('footer');

    if (navbarElement) {
      setNavbarHeight(navbarElement.clientHeight);
    }
    if (footerElement) {
      setFooterHeight(footerElement.clientHeight);
    }

    // Atjaunina augstumu, ja loga izmērs mainās
    const handleResize = () => {
        if (navbarElement) setNavbarHeight(navbarElement.clientHeight);
        if (footerElement) setFooterHeight(footerElement.clientHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []); // Tukšs masīvs nozīmē, ka efekts izpildās tikai vienu reizi pēc komponenta montēšanas

  // Aprēķina minimālo augstumu saturam
  const contentMinHeight = `calc(100vh - ${navbarHeight}px - ${footerHeight}px)`;

  return (
    // Centra saturu vertikāli un horizontāli, izmantojot aprēķināto minimālo augstumu
    <div
      className="flex flex-col items-center justify-center py-12 px-4 text-center bg-background text-text-base"
      style={{ minHeight: contentMinHeight }} // Izmanto aprēķināto augstumu
    >
      <Frown size={80} className="text-primary mb-6" /> {/* Lielāka ikona, primārā krāsa */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-base">{t('notFound.title', '404 - Lapa nav atrasta')}</h1> {/* Lielāks virsraksts, pamata teksta krāsa */}
      <p className="text-lg md:text-xl text-text-muted mb-8 max-w-md">{t('notFound.description', 'Lapa, kuru meklējat, neeksistē.')}</p> {/* Lielāks teksts, pieklusināta krāsa, ierobežots platums */}

      {/* Navigācijas saite uz sākumlapu */}
      <div> {/* Vienkāršs div, lai saturētu pogu */}
        <Link
          to="/"
          className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-colors duration-200"
        >
          {t('notFound.goHomeButton', 'Doties uz sākumlapu')} {/* Poga uz sākumlapu */}
        </Link>
      </div>

      {/* Vari pievienot attēlu vai grafiku šeit */}
      {/* <img src="/path/to/your/404-image.png" alt="404 Illustration" className="mt-12 max-w-xs md:max-w-sm" /> */}
    </div>
  );
};

export default NotFoundPage;