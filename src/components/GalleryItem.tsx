// src/components/GalleryItem.tsx
import React from 'react';
import { cn } from '../lib/utils';

interface GalleryItemProps {
  image: string;
  title: string;
  description: string;
  onClick: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image, title, description, onClick }) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg cursor-pointer shadow-md", // Pievienoju nelielu ēnu vienmēr
        "bg-surface", // Fons kartītei, ja attēls to pilnībā nenosedz vai ir caurspīdīgs
        "transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/20" // Uzlabots hover ēnas efekts
      )}
      onClick={onClick}
    >
      {/* Attēla konteiners */}
      <div className="aspect-[4/3] overflow-hidden"> {/* Mainīju aspect-square uz 4/3, kas ir biežāk sastopams attēliem */}
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          sizes="(min-width: 1280px) 384px, (min-width: 1024px) 320px, (min-width: 768px) 240px, calc(100vw - 32px)"
        />
      </div>

      {/* Pārklājums ar gradientu un tekstu */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-end", // Izlīdzina saturu uz leju
          "bg-gradient-to-t from-black/80 via-black/50 to-transparent", // Tumšāks gradients labākam kontrastam
          "opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100" // Parādās uz hover
        )}
      >
        <div
          className={cn(
            "p-4 md:p-5", // Nedaudz samazināts padding, lai vairāk vietas tekstam
            "transform translate-y-6 opacity-0 transition-all duration-500 ease-in-out delay-100", // Sākotnēji paslēpts un nobīdīts
            "group-hover:translate-y-0 group-hover:opacity-100" // Parādās un iebīdās vietā uz hover
          )}
        >
          <h3 className="text-lg md:text-xl font-bold text-white mb-1.5"> {/* Teksta krāsa - balta */}
            {title}
          </h3>
          {/* Akcenta līnija zem virsraksta */}
          <div className="h-0.5 w-12 bg-primary mb-2.5 transition-all duration-300 ease-in-out delay-200 transform scale-x-0 group-hover:scale-x-100 origin-left"></div>
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-2"> {/* Teksta krāsa - gaiši pelēka, line-clamp ierobežo rindiņas */}
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;