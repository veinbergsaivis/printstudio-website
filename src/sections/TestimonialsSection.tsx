// src/sections/TestimonialsSection.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import TestimonialCard, { Testimonial } from '../components/TestimonialCard'; // Pārliecinies par pareizu ceļu
import { cn } from '../lib/utils'; // Pārliecinies par pareizu ceļu

// Pagaidu dati - aizstāj ar reāliem datiem un tulkojumu atslēgām
const testimonialsData: Testimonial[] = [
  {
    id: 'testimonial1',
    clientNameKey: 'testimonials.client1.name',
    clientCompanyKey: 'testimonials.client1.company',
    testimonialTextKey: 'testimonials.client1.text',
    rating: 5,
  },
  {
    id: 'testimonial2',
    clientNameKey: 'testimonials.client2.name',
	clientCompanyKey: 'testimonials.client2.company',
    testimonialTextKey: 'testimonials.client2.text',
    rating: 5,
  },
  {
    id: 'testimonial3',
    clientNameKey: 'testimonials.client3.name',
    clientCompanyKey: 'testimonials.client3.company',
    testimonialTextKey: 'testimonials.client3.text',
    // avatarUrl: nav obligāts, tiks rādīts UserCircle2
    rating: 5,
  },
  // Pievieno vairāk atsauksmju pēc nepieciešamības
];

const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-accent/20"> {/* Fons nedaudz atšķirīgs no bg-background */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-base mb-4">
            {t('testimonials.title', 'Ko par mums saka klienti')}
          </h2>
          <div
            className="hidden"
          ></div>
        </div>

        {testimonialsData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        ) : (
          <p className="text-center text-text-muted">
            {t('testimonials.noData', 'Pagaidām nav pievienotas atsauksmes.')}
          </p>
        )}

        {/* Pēc izvēles: Poga "Skatīt visas atsauksmes", ja ir vairāk un tās ir atsevišķā lapā */}
        {/* <div className="text-center mt-12">
          <Button variant="outline">
            {t('testimonials.seeAll', 'Skatīt visas atsauksmes')}
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default TestimonialsSection;