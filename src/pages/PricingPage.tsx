import React from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '../lib/utils'
import SEO from '../components/SEO'

type Row = { name: string; price: string }
type CategoryKey = 'kopesana' | 'skenesana' | 'druka' | 'foto' | 'laminesana' | 'citi'

const PricingPage: React.FC = () => {
  const { t } = useTranslation()
  const categories: CategoryKey[] = ['kopesana', 'skenesana', 'druka', 'foto', 'laminesana', 'citi']

  return (
    <section className='py-16 md:py-20 bg-background'>
      <SEO
        title={`${t('pricing.title', 'Cenrādis')} | PrintStudio`}
        description={t('pricing.description', 'Apskati mūsu pakalpojumu cenas.') as string}
        url='/pricing'
      />
      <div className='container mx-auto px-4 md:px-8'>
        {/* Header */}
        <div className='text-center mb-10 md:mb-14'>
          <h1 className='text-3xl md:text-4xl font-bold text-text-base mb-3'>
            {t('pricing.title', 'Cenrādis')}
          </h1>
          <p className='text-lg text-text-muted max-w-3xl mx-auto'>
            {t('pricing.description', 'Apskati mūsu pakalpojumu cenas.')}
          </p>
          <p className='text-xs text-text-muted/70 mt-2'>
            {t('pricing.note', 'Cenas norādītas ar PVN.')}
          </p>
        </div>

        {/* Grid of cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {categories.map(key => {
            const title = t(`pricing.categories.${key}.title`) as string
            const rows = t(`pricing.categories.${key}.rows`, { returnObjects: true }) as Row[]

            return (
              <article
                key={key}
                className={cn(
                  'bg-surface border border-border-color rounded-2xl p-5 md:p-6 shadow-lg',
                  'hover:shadow-xl transition-shadow'
                )}
              >
                <h2 className='text-xl font-semibold text-text-base mb-4'>{title}</h2>

                <div className='overflow-hidden rounded-lg border border-border-color'>
                  <table className='w-full text-sm'>
                    <thead className='bg-muted/40 text-[#d72638]'>
                      <tr>
                        <th className='text-left px-4 py-2 font-medium'>
                          {t('pricing.table.service', 'Pakalpojums')}
                        </th>
                        <th className='text-right px-4 py-2 font-medium w-32'>
                          {t('pricing.table.price', 'Cena')}
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-border-color'>
                      {rows.map((r, i) => (
                        <tr key={i} className='hover:bg-muted/40 text-[#6b7280]'>
                          <td className='px-4 py-2'>{r.name}</td>
                          <td className='px-4 py-2 text-right font-semibold text-text-base'>
                            {r.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PricingPage
