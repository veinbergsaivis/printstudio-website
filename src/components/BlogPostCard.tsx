import React from 'react'
import { Link } from 'react-router-dom'
import { BlogPost } from '../data/blogPosts' // Importējam tipu
import { cn } from '../lib/utils'
import { Calendar, User } from 'lucide-react'

interface BlogPostCardProps {
  post: BlogPost
  className?: string
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, className }) => {
  return (
    <Link
      to={`/blog/${post.id}`} // Saite uz individuālo bloga lapu
      className={cn(
        // === KRĀSAS NOMAINĪTAS ===
        'block bg-surface rounded-xl overflow-hidden shadow-lg group', // Kartītes fons
        'border border-transparent hover:border-primary/50 transition-all duration-300 ease-in-out', // Apmale uz hover (izmanto primāro krāsu ar caurspīdīgumu)
        'transform hover:-translate-y-1', // Neliels pacelšanas efekts
        className
      )}
    >
      {/* Attēla daļa */}
      <div className='aspect-video overflow-hidden'>
        <img
          src={post.image}
          alt={post.title}
          loading='lazy'
          decoding='async'
          sizes='(min-width: 1280px) 384px, (min-width: 1024px) 320px, (min-width: 768px) 240px, calc(100vw - 32px)'
          className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
        />
      </div>
      {/* Satura daļa */}
      <div className='p-4 md:p-5'>
        {/* Tagi */}
        {post.tags && post.tags.length > 0 && (
          <div className='flex flex-wrap gap-1.5 mb-2'>
            {post.tags.slice(0, 3).map(
              (
                tag // Rādām max 3 tagus
              ) => (
                // === KRĀSAS NOMAINĪTAS ===
                <span
                  key={tag}
                  className='text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full'
                >
                  {' '}
                  {/* Taga fons un teksts (izmanto primāro krāsu) */}
                  {tag}
                </span>
              )
            )}
          </div>
        )}
        {/* Virsraksts */}
        {/* === KRĀSAS NOMAINĪTAS === */}
        <h2 className='text-lg font-semibold text-text-base mb-2 group-hover:text-primary transition-colors'>
          {' '}
          {/* Virsraksta teksts (pamata un primārais uz hover) */}
          {post.title}
        </h2>
        {/* Izvilkums */}
        {/* === KRĀSAS NOMAINĪTAS === */}
        <p className='text-sm text-text-muted mb-3 line-clamp-3'>
          {' '}
          {/* Izvilkuma teksts (pieklusināts) */}
          {post.excerpt}
        </p>
        {/* Meta informācija (datums, autors) */}
        {/* === KRĀSAS NOMAINĪTAS === */}
        <div className='flex items-center justify-between text-xs text-text-muted mt-4'>
          {' '}
          {/* Meta teksts (pieklusināts) - varbūt nepieciešams vēl pieklusinātāks variants? */}
          <div className='flex items-center space-x-1.5'>
            <Calendar size={14} className='flex-shrink-0' />
            <span>
              {new Date(post.date).toLocaleDateString('lv-LV', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className='flex items-center space-x-1.5'>
            <User size={14} className='flex-shrink-0' />
            <span>{post.author}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogPostCard
