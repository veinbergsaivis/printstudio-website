import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// Importējam arī BlogPost tipu, ja tas nav globāli pieejams
import { blogPosts, BlogPost } from '../data/blogPosts';
import { cn } from '../lib/utils'; // Pārliecinies par ceļu
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const BlogPostPage: React.FC = () => {
  // useParams tips ir pareizs
  const { postId } = useParams<{ postId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Atrodam postu. find() ir OK nelielam skaitam postu.
  // Ja postu būtu ļoti daudz, varētu apsvērt efektīvāku meklēšanu (piem., objekts ar id kā atslēgu).
  const post: BlogPost | undefined = blogPosts.find(p => p.id === postId);

  // Efekts loga ritināšanai un dokumenta virsraksta maiņai
  useEffect(() => {
    window.scrollTo(0, 0); // Ritinām uz augšu, ielādējot lapu
    if (post) {
      // Dinamisks virsraksts, ja posts atrasts
      document.title = `${post.title} | PrintStudio Blog`;
    } else {
      // Virsraksts, ja posts nav atrasts
      document.title = t('blogPost.notFoundTitle', 'Ieraksts nav atrasts') + ' | PrintStudio Blog';
    }
    // Tīrīšanas funkcija atjauno sākotnējo lapas virsrakstu, kad komponents tiek noņemts
    // Apsver, vai šis ir vēlamais efekts, vai arī virsrakstam jāpaliek pēdējam iestatītajam.
    // Ja virsrakstu pārvalda maršrutētājs vai cits globāls mehānisms, šo tīrīšanu var noņemt.
    return () => { document.title = "PrintStudio | Think Bigger. Print Bolder."; };
    // Atkarības ir pareizas
  }, [postId, post, t]);

  // Funkcija HTML satura drošai (?) ievietošanai.
  // Atceries par XSS riskiem, ja saturs nāk no neuzticama avota vai lietotāju ievades.
  // Ja saturs ir tikai no tevis kontrolēta blogPosts.ts, risks ir mazāks.
  const createMarkup = (htmlContent: string | undefined) => ({ __html: htmlContent || '' });

  // === Gadījums, ja ieraksts nav atrasts ===
  if (!post) {
    return (
      // Krāsas jau nomainītas uz semantiskajām
      <main className="flex flex-col min-h-screen bg-background pt-20 md:pt-24 text-text-base">
        <SEO 
          title={t('blogPost.notFoundTitle', 'Ieraksts nav atrasts') + ' | PrintStudio Blog'}
          description={t('blogPost.notFoundText', 'Meklētais bloga ieraksts neeksistē.')}
          type="article"
        />
        <div className="container mx-auto px-4 md:px-8 py-10 flex-grow flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-bold mb-4">{t('blogPost.notFoundTitle', 'Ieraksts nav atrasts')}</h1>
          {/* Krāsas jau nomainītas */}
          <p className="text-text-muted mb-6">{t('blogPost.notFoundText', 'Meklētais bloga ieraksts neeksistē.')}</p>
          {/* Izmantojam Link komponentu, krāsas jau nomainītas */}
          <Link
            to="/blog"
            className="inline-flex items-center px-4 py-2 bg-primary text-background rounded-lg font-medium hover:bg-primary/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background" // Pievienoti fokusa stili
          >
            <ArrowLeft size={18} className="mr-2" />
            {t('blogPost.backToBlog', 'Atpakaļ uz blogu')}
          </Link>
        </div>
      </main>
    );
  }

  // === Gadījums, ja ieraksts ir atrasts ===
  return (
    // Krāsas jau nomainītas
    <main className="flex flex-col min-h-screen bg-background pt-20 md:pt-24 text-text-base">
      <SEO 
        title={`${post.title} | PrintStudio Blog`}
        description={post.excerpt || post.content?.substring(0, 160)}
        image={post.image}
        type="article"
      />
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-12 pb-16 md:pb-24 max-w-4xl flex-grow">

        {/* Atpakaļ poga */}
        <button
           onClick={() => navigate('/blog')}
           // Krāsas jau nomainītas, pievienoti fokusa stili
           className="inline-flex items-center space-x-1 text-sm text-primary hover:underline mb-6 group focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
        >
           <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
           <span>{t('blogPost.backToBlog', 'Atpakaļ uz blogu')}</span>
        </button>

        {/* Galvenais attēls */}
        {/* Pievienojam pārbaudi, vai post.image eksistē */}
        {post.image && (
          <div className="mb-6 md:mb-8 rounded-xl overflow-hidden aspect-video shadow-lg bg-surface"> {/* Pievienots fons, ja attēls lādējas lēni */}
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" loading="lazy" /> {/* Pievienots lazy loading */}
          </div>
        )}

        {/* Virsraksts */}
        {/* Krāsas jau nomainītas */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-text-base">
          {post.title}
        </h1>

        {/* Metadati */}
        {/* Krāsas jau nomainītas */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-muted mb-6 md:mb-8 border-b border-t border-border-color py-3">
           {/* Datums - pievienota pārbaude, vai datums ir derīgs */}
           {post.date && !isNaN(new Date(post.date).getTime()) && (
             <div className="flex items-center space-x-1.5"> <Calendar size={15} /> <span>{new Date(post.date).toLocaleDateString('lv-LV', { year: 'numeric', month: 'long', day: 'numeric' })}</span> </div>
           )}
           {/* Autors - pievienota pārbaude */}
           {post.author && (
             <div className="flex items-center space-x-1.5"> <User size={15} /> <span>{post.author}</span> </div>
           )}
           {/* Tagi - pārbaude jau bija */}
           {post.tags && post.tags.length > 0 && (
             <div className="flex items-center space-x-1.5">
               <Tag size={15} />
               <span>{post.tags.join(', ')}</span>
             </div>
           )}
        </div>

        {/* Satura daļa - @tailwindcss/typography */}
        {/* Pārbaudām, vai saturs eksistē */}
        {post.content && (
          <div
            // Klases @tailwindcss/typography pielāgošanai
            // Pārliecinies, ka esi instalējis un konfigurējis @tailwindcss/typography pluginu
            className={cn(
              "prose prose-invert prose-lg max-w-none", // Pamata stili tumšam fonam, lielāks fonts
              // Specifiskāki pielāgojumi semantiskajām krāsām
              "prose-headings:text-text-base",      // Virsraksti
              "prose-p:text-text-muted",          // Paragrāfi
              "prose-strong:text-text-base",      // Treknraksts
              "prose-em:text-text-muted",         // Kursīvs (ja nepieciešams pielāgot)
              "prose-ul:text-text-muted",         // Nenumurētie saraksti
              "prose-ol:text-text-muted",         // Numurētie saraksti
              "prose-li:my-1 prose-li::marker:text-text-muted", // Saraksta elementi un to marķieri
              "prose-a:text-primary hover:prose-a:underline prose-a:font-medium", // Saites (pievienots font-medium)
              "prose-blockquote:border-l-secondary prose-blockquote:text-text-muted prose-blockquote:pl-4 prose-blockquote:italic", // Citāti (pievienots italic)
              "prose-code:text-secondary prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm", // Kods (precizēts stils)
              "prose-pre:bg-surface prose-pre:text-text-muted prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto", // Koda bloki
              "prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto", // Attēli saturā (pievienots mx-auto centrēšanai)
              "prose-table:border prose-table:border-collapse prose-table:border-border-color", // Tabulas
              "prose-thead:border-b prose-thead:border-border-color", // Tabulas galvene
              "prose-th:text-text-base prose-th:p-2 prose-th:text-left", // Tabulas galvenes šūnas
              "prose-td:p-2 prose-td:border prose-td:border-border-color" // Tabulas datu šūnas
            )}
            // Izmantojam dangerouslySetInnerHTML ar pārbaudītu saturu
            dangerouslySetInnerHTML={createMarkup(post.content)}
          />
        )}
      </div>
    </main>
  );
};

export default BlogPostPage;