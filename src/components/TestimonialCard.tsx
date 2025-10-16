// src/components/TestimonialCard.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, UserCircle2 } from 'lucide-react'; // UserCircle2 kā placeholder, ja nav avatara
import { cn } from '../lib/utils'; // Pārliecinies par pareizu ceļu

export interface Testimonial {
  id: string;
  clientNameKey: string;
  clientCompanyKey?: string;
  testimonialTextKey: string;
  avatarUrl?: string;
  rating?: number;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { t } = useTranslation();

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={18}
          className={cn(
            i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300', // Pielāgo krāsas pēc vajadzības
            'transition-colors duration-150'
          )}
        />
      );
    }
    return <div className="flex items-center mb-3">{stars}</div>;
  };

  return (
    <div className={cn(
      "bg-surface border border-border-color rounded-xl p-6 shadow-sm h-full", // h-full, lai kartītes būtu vienāda augstuma režģī
      "flex flex-col", // Lai pēdiņas būtu apakšā, ja teksts ir īsāks
      "transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary/70"
    )}>
      {testimonial.rating && renderStars(testimonial.rating)}

      {/* Atsauksmes teksts ar pēdiņām */}
      <div className="relative flex-grow mb-4">
        <span className="absolute -top-2 -left-3 text-6xl text-primary/20 font-serif select-none opacity-80">“</span>
        <p className="text-text-muted leading-relaxed italic">
          {t(testimonial.testimonialTextKey, "Atsauksmes teksts šeit...")}
        </p>
        <span className="absolute -bottom-5 -right-1 text-6xl text-primary/20 font-serif select-none opacity-80 transform scale-x-[-1]">”</span>
      </div>


      <div className="mt-auto pt-4 border-t border-border-color/50"> {/* Atdalītājs */}
        <div className="flex items-center">
          {testimonial.avatarUrl ? (
            <img
              src={testimonial.avatarUrl}
              alt={t(testimonial.clientNameKey, "Klients")}
              className="w-12 h-12 rounded-full mr-4 object-cover bg-accent/20"
            />
          ) : (
            <UserCircle2 size={48} className="text-primary/50 mr-4" />
          )}
          <div>
            <h4 className="font-semibold text-text-base">
              {t(testimonial.clientNameKey, "Klienta Vārds")}
            </h4>
            {testimonial.clientCompanyKey && (
              <p className="text-sm text-text-muted">
                {t(testimonial.clientCompanyKey, "Uzņēmums/Amats")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;