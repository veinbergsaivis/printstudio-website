// src/sections/FaqSection.tsx
import React, { useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { Plus, Minus } from 'lucide-react'
import { cn } from '../lib/utils'

// Importē datus un interfeisu no atsevišķa faila
import faqData, { FaqItem } from '../data/faqData'

// Komponents vienam FAQ elementam (Accordion Item)
interface FaqAccordionItemProps {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
}

const FaqAccordionItem: React.FC<FaqAccordionItemProps> = ({ item, isOpen, onToggle }) => {
  const { t } = useTranslation()

  // Izmantojam <Trans> drošai HTML/renderēšanai ar komponentēm (piem., <a>)

  return (
    <div className='border border-border rounded-lg shadow-sm mb-4 overflow-hidden'>
      <button
        className='flex justify-between items-center w-full py-4 px-6 text-left font-semibold text-text-base hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors duration-200'
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span>{t(item.questionKey, 'Jautājums nav pieejams')}</span>
        <div
          className={cn(
            'transform transition-transform duration-200',
            isOpen ? 'rotate-180 text-primary' : 'rotate-0'
          )}
        >
          {isOpen ? (
            <Minus size={20} className='flex-shrink-0' />
          ) : (
            <Plus size={20} className='flex-shrink-0' />
          )}
        </div>
      </button>

      <div
        id={`faq-answer-${item.id}`}
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out text-text-muted px-6',
          isOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0'
        )}
        aria-hidden={!isOpen}
      >
        <div className='leading-relaxed'>
          <Trans
            i18nKey={item.answerKey}
            components={{ a: <a className='text-primary hover:underline font-medium' /> }}
            defaults={t(item.answerKey, 'Atbilde nav pieejama') as string}
          />
        </div>
      </div>
    </div>
  )
}

// Galvenais FAQ sadaļas komponents
const FaqSection: React.FC = () => {
  const { t } = useTranslation()
  const [openItemId, setOpenItemId] = useState<string | null>(null)

  const handleToggle = (id: string) => {
    setOpenItemId(openItemId === id ? null : id)
  }

  return (
    <section id='faq' className='relative py-16 md:py-24 bg-accent/10'>
      {/* White fade overlay augšā - pāreja no bg-surface */}
      <div
        className='absolute inset-x-0 top-0 pointer-events-none z-[1]'
        style={{
          height: '150px',
          background:
            'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* White fade overlay apakšā - pāreja uz bg-surface */}
      <div
        className='absolute inset-x-0 bottom-0 pointer-events-none z-[1]'
        style={{
          height: '150px',
          background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
        }}
      />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-[2]'>
        <div className='max-w-3xl mx-auto text-center'>
          <h2 className='text-3xl md:text-4xl font-bold text-text-base mb-4'>
            {t('faq.title', 'Biežāk uzdotie jautājumi')}
          </h2>
          <p className='text-lg text-text-muted mb-8'>
            {t(
              'faq.description',
              'Šeit atradīsiet atbildes uz visbiežāk uzdotajiem jautājumiem par mūsu pakalpojumiem.'
            )}
          </p>
          <div className='hidden' />
        </div>

        {/* FAQ saraksts */}
        <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
          {faqData.map(item => (
            <FaqAccordionItem
              key={item.id}
              item={item}
              isOpen={openItemId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqSection
