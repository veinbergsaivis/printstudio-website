// src/sections/BlogSection.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
// Importējam arī BlogPost tipu
import { blogPosts, BlogPost } from '../data/blogPosts';
import BlogPostCard from '../components/BlogPostCard'; // Pārbaudām ceļu
import Button from '../components/Button'; // Pārbaudām ceļu
import { cn } from '../lib/utils'; // Pārbaudām ceļu

const BlogSection: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Loģika priekšskatījuma ierakstiem ir pareiza
  const previewPosts: BlogPost[] = blogPosts.slice(0, 3); // Pievienojam tipu

  return (
    // Fons - background, Teksts - text-base
    <section id="blog" className="py-16 md:py-24 bg-background text-text-base">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-base mb-4"> {/* Palielināts virsraksta izmērs */}
            {/* Pievienojam noklusējuma vērtību */}
            {t('blog.title', 'Jaunākie Raksti')}
          </h2>
          {/* === AKCENTA LĪNIJA === */}
          {/* Tāda pati kā GallerySection/ServicesSection/AboutSection konsekvencei */}
          <div
            className="hidden" // Pievienota apakšējā atstarpe
          ></div>
          {/* === AKCENTA LĪNIJA BEIGAS === */}
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            {/* Pievienojam noklusējuma vērtību. Atslēga 'blog.subtitle' varētu būt jāpielāgo atbilstoši tavam i18n failam. */}
            {t('blog.description', 'Izpētiet mūsu jaunākos rakstus, ieskatus un tendences drukas nozarē')}
          </p>
        </div>

        {/* Bloga ierakstu režģis */}
        {previewPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Pieņemam, ka BlogPostCard ir atjaunots ar semantiskajām krāsām */}
            {/* Tā fons (piem., bg-surface) labi izcelsies uz bg-background */}
            {previewPosts.map((post: BlogPost) => ( // Pievienots tips
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          // Ziņojums, ja nav ierakstu
          <p className="text-center text-text-muted">
            {/* Pievienojam noklusējuma vērtību */}
            {t('blog.noPosts', 'Pašlaik nav pieejami bloga ieraksti.')}
          </p>
        )}

        {/* Poga "Rādīt visus" */}
        {/* Loģika pogas rādīšanai ir pareiza */}
        {blogPosts.length > previewPosts.length && (
          <div className="text-center mt-10 md:mt-16">
            {/* Izmantojam Button komponentu ar variant="primary" vai "secondary" */}
            <Button
              variant="primary" // Vai "secondary", atkarībā no vēlamā akcenta
              size="lg"
              onClick={() => navigate('/blog')}
              // className="rounded-lg" // Noņemam, ja Button komponents jau pārvalda noapaļojumu
            >
              {/* Pievienojam noklusējuma vērtību */}
              {t('blog.showAll', 'Rādīt visus ierakstus')} {/* Izmantojam 'blog.showAll' atslēgu no i18n */}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;