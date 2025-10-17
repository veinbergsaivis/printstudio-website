import React, { useState, useMemo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { blogPosts, getAllTags, BlogPost } from '../data/blogPosts'
import BlogPostCard from '../components/BlogPostCard'
import { BlogPostCardSkeleton } from '../components/Skeleton'
import { cn } from '../lib/utils'
import SEO from '../components/SEO'

const BlogPage: React.FC = () => {
  const { t } = useTranslation()
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [query, setQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulējam datu ielādi
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // useMemo ir laba prakse, lai lieki nepārrēķinātu tagus
  const allTags = useMemo(() => getAllTags(), [])

  // useMemo ir laba prakse, lai lieki nefiltrētu postus katrā renderēšanā
  const filteredPosts = useMemo(() => {
    // Pārbaudām, vai blogPosts vispār ir masīvs (drošības pārbaude)
    if (!Array.isArray(blogPosts)) return []
    let result = blogPosts
    if (selectedTag)
      result = result.filter(post => Array.isArray(post.tags) && post.tags.includes(selectedTag))
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      result = result.filter(
        p =>
          (p.title || '').toLowerCase().includes(q) ||
          (p.excerpt || '').toLowerCase().includes(q) ||
          (p.content || '').toLowerCase().includes(q)
      )
    }
    return result
  }, [selectedTag, query]) // Iekļaujam query atkarībā, lai filtrēšana būtu korekta

  return (
    // === KRĀSAS NOMAINĪTAS ===
    // Galvenais fons un teksts
    <main className='flex flex-col min-h-screen bg-background pt-20 md:pt-24 text-text-base'>
      <SEO
        title={`${t('blog.title', 'Our Blog') as string} | PrintStudio`}
        description={
          t(
            'blog.description',
            'Explore our latest articles, insights, and trends in the printing industry'
          ) as string
        }
        url='/blog'
      />
      {/* Konteiners saturam */}
      <div className='container mx-auto px-4 md:px-8 py-10 md:py-16 pb-16 md:pb-24 flex-grow'>
        {/* === KRĀSAS NOMAINĪTAS === */}
        <h1 className='text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-text-base'>
          {/* Pievienojam noklusējuma vērtību t() funkcijai, ja atslēga nav atrasta */}
          {t('blog.title', 'Jaunākie Raksti')}
        </h1>

        {/* Search */}
        <div className='max-w-xl mx-auto mb-6'>
          <label htmlFor='blog-search' className='sr-only'>
            {t('blog.search', 'Meklēt')}
          </label>
          <input
            id='blog-search'
            type='search'
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('blog.searchPlaceholder', 'Meklēt rakstus pēc nosaukuma vai satura...')}
            className='w-full px-4 py-3 rounded-lg bg-surface border border-border-color text-text-base placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-primary'
          />
        </div>

        {/* Tagu Filtrs */}
        {allTags.length > 0 && (
          <div className='flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14'>
            {/* "Visi" poga */}
            <button
              onClick={() => setSelectedTag(null)}
              // Pievienots aria-pressed pieejamībai
              aria-pressed={!selectedTag}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm transition-colors duration-200 border',
                // === KRĀSAS NOMAINĪTAS (Tagu pogas) ===
                !selectedTag
                  ? // Aktīvā stāvokļa stili
                    'bg-primary text-background border-primary font-medium' // Fons (primārais), Teksts (fona krāsa kontrastam), Apmale (primārā)
                  : // Neaktīvā stāvokļa stili
                    'bg-surface/50 border-border-color text-text-muted hover:border-primary hover:text-text-base' // Fons (virsma ar caurspīdīgumu), Apmale (robežas krāsa), Teksts (pieklusināts), Hover apmale (primārā), Hover teksts (pamata)
              )}
            >
              {/* Pievienojam noklusējuma vērtību */}
              {t('blog.categories.all', 'Visi')}
            </button>
            {/* Pārējās tagu pogas */}
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                // Pievienots aria-pressed pieejamībai
                aria-pressed={selectedTag === tag}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm transition-colors duration-200 border',
                  // === KRĀSAS NOMAINĪTAS (Tagu pogas) ===
                  selectedTag === tag
                    ? // Aktīvā stāvokļa stili
                      'bg-primary text-background border-primary font-medium'
                    : // Neaktīvā stāvokļa stili
                      'bg-surface/50 border-border-color text-text-muted hover:border-primary hover:text-text-base'
                )}
              >
                {/* Pieņemam, ka tagi paši par sevi ir tulkojami vai nav jātulko */}
                {/* Ja tagi jātulko, varētu lietot t(`blog.categories.${tag.toLowerCase()}`, tag) */}
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Bloga ierakstu režģis */}
        {isLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {[...Array(6)].map((_, index) => (
              <BlogPostCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {/* Pārliecinies, ka BlogPostCard ir atjaunots ar semantiskajām krāsām */}
            {filteredPosts.map((post: BlogPost) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          // === KRĀSAS NOMAINĪTAS ===
          <p className='text-center text-text-muted mt-10'>
            {/* Pievienojam noklusējuma vērtību */}
            {t('blog.noResults', 'Netika atrasti ieraksti ar izvēlēto tagu.')}
          </p>
        )}
      </div>
      {/* Footer komponents tiks renderēts ārpus šī <main> elementa */}
    </main>
  )
}

export default BlogPage
