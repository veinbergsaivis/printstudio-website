// src/sections/GallerySection.tsx
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import GalleryItem from '../components/GalleryItem';
import Button from '../components/Button';
import { cn } from '../lib/utils';

// Lightbox + spraudņi
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// === LOKĀLIE ASSETI (tagad WEBP formātā) ===
// Pārliecinies, ka šie faili ir: src/assets/GD.webp, PS.webp, GDB.webp
import GD from '@/assets/GD.webp';
import PS from '@/assets/PS.webp';
import GDB from '@/assets/GDB.webp';

// Datu tips
interface GalleryItemData {
  id: string;
  image: string;
  category: string;
}

// === DATI ===
const galleryItemsData: GalleryItemData[] = [
  { id: 'gd-card', image: GD, category: 'Vizitkartes' },
  { id: 'ps-card', image: PS, category: 'Vizitkartes' },
  { id: 'gdb-banner', image: GDB, category: 'Baneri' },
];

const GallerySection: React.FC = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Unikālās kategorijas (saglabā sākotnējo secību)
  const categories = useMemo(() => {
    const seen = new Set<string>();
    const orderedUnique = galleryItemsData
      .map((i) => i.category)
      .filter((cat) => (seen.has(cat) ? false : seen.add(cat)));
    return ['all', ...orderedUnique];
  }, []);

  // Filtrēti vienumi
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return galleryItemsData;
    return galleryItemsData.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  // Slaidi Lightboxam
  const lightboxSlides = useMemo(
    () =>
      filteredItems.map((item) => ({
        src: item.image,
        title: t(`gallery.items.${item.id}.title`, item.id),
      })),
    [filteredItems, t]
  );

  // Atvērt Lightbox konkrētam vienumam
  const openLightboxForItem = (itemId: string) => {
    const itemIndex = filteredItems.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      setLightboxIndex(itemIndex);
      setLightboxOpen(true);
    }
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* === VIRSRKASTS === */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-base mb-4">
            {t('gallery.title', 'Mūsu darbi')}
          </h2>

          <div className="hidden" />

          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            {t(
              'gallery.description',
              'Apskatiet mūsu portfolio ar augstākās kvalitātes drukas produktiem.'
            )}
          </p>
        </div>

        {/* === FILTRI === */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeFilter === category ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(category)}
              className={cn(
                'transition-all duration-200',
                activeFilter === category ? 'shadow-md shadow-primary/30' : 'hover:bg-primary/10'
              )}
            >
              {t(
                `gallery.categories.${category}`,
                category === 'all'
                  ? t('gallery.categories.all', 'All')
                  : category
              )}
            </Button>
          ))}
        </div>

        {/* === GALERIJA === */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl overflow-hidden shadow-md transition-all duration-300 ease-in-out"
              >
                <GalleryItem
                  image={item.image}
                  title={t(`gallery.items.${item.id}.title`, item.id)}
                  description={t(
                    `gallery.items.${item.id}.description`,
                    'Apraksts nav atrasts'
                  )}
                  onClick={() => openLightboxForItem(item.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-text-muted py-10">
            {t('gallery.noResults', 'Šajā kategorijā darbi nav atrasti.')}
          </p>
        )}
      </div>

      {/* === LIGHTBOX === */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
        plugins={[Thumbnails, Zoom]}
      />
    </section>
  );
};

export default GallerySection;
