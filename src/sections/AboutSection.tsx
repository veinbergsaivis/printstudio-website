import { cn } from '../lib/utils'
// src/sections/AboutSection.tsx
import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Zap, // Ātrums
  Award, // Kvalitāte/Balvas
  Users, // Klienti/Komanda
  CheckSquare, // Garantija/Precizitāte
  Palette, // Dizains
  Printer, // Tehnoloģijas
} from 'lucide-react'

// === StatItem apakškomponents ===
interface StatItemProps {
  valueKey: string // Atslēga vērtībai no tulkojumiem
  labelKey: string // Atslēga etiķetei no tulkojumiem
}
const StatItem: React.FC<StatItemProps> = ({ valueKey, labelKey }) => {
  const { t } = useTranslation()
  return (
    <div
      className={cn(
        'bg-surface border border-border-color rounded-lg px-4 py-3 flex-1 text-center',
        'transition-all duration-300 hover:shadow-md hover:border-primary/50'
      )}
      role='listitem'
    >
      <span className='block text-2xl md:text-3xl font-bold text-text-base'>{t(valueKey)}</span>
      <p className='text-sm text-text-muted'>{t(labelKey)}</p>
    </div>
  )
}

// === FeatureCard apakškomponents ===
interface FeatureCardProps {
  icon: React.ReactNode
  titleKey: string
  descriptionKey: string
}
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, titleKey, descriptionKey }) => {
  const { t } = useTranslation()
  const clonedIcon = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<any>, {
        className: cn((icon as React.ReactElement<any>).props.className, 'text-primary'),
        size: 28,
        'aria-hidden': true,
      })
    : icon

  return (
    <div
      className={cn(
        'group bg-surface border border-border-color rounded-xl p-6 shadow-sm',
        'transition-all duration-300 ease-in-out',
        'hover:shadow-lg hover:border-primary hover:bg-accent/10 hover:-translate-y-1'
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5',
          'transition-colors duration-300 group-hover:bg-primary/20'
        )}
      >
        {clonedIcon}
      </div>
      <h3 className='text-xl font-semibold text-text-base mb-2'>{t(titleKey)}</h3>
      <p className='text-text-muted text-sm leading-relaxed'>{t(descriptionKey)}</p>
    </div>
  )
}

// === Galvenais AboutSection komponents ===
const AboutSection: React.FC = () => {
  const { t } = useTranslation()

  const features = [
    {
      id: 'modernasTehnologijas',
      icon: <Printer />,
      titleKey: 'about.features.modernasTehnologijas.title',
      descriptionKey: 'about.features.modernasTehnologijas.description',
    },
    {
      id: 'izcilaKvalitate',
      icon: <Award />,
      titleKey: 'about.features.izcilaKvalitate.title',
      descriptionKey: 'about.features.izcilaKvalitate.description',
    },
    {
      id: 'personalizetaPieeja',
      icon: <Users />,
      titleKey: 'about.features.personalizetaPieeja.title',
      descriptionKey: 'about.features.personalizetaPieeja.description',
    },
    {
      id: 'atraIzpilde',
      icon: <Zap />,
      titleKey: 'about.features.atraIzpilde.title',
      descriptionKey: 'about.features.atraIzpilde.description',
    },
    {
      id: 'profesionalaisDizains',
      icon: <Palette />,
      titleKey: 'about.features.profesionalaisDizains.title',
      descriptionKey: 'about.features.profesionalaisDizains.description',
    },
    {
      id: 'garantija',
      icon: <CheckSquare />,
      titleKey: 'about.features.garantija.title',
      descriptionKey: 'about.features.garantija.description',
    },
  ]

  const stats = [
    { id: 'klienti', valueKey: 'about.stats.klienti.value', labelKey: 'about.stats.klienti.label' },
    {
      id: 'projekti',
      valueKey: 'about.stats.projekti.value',
      labelKey: 'about.stats.projekti.label',
    },
    {
      id: 'apmierinatiba',
      valueKey: 'about.stats.apmierinatiba.value',
      labelKey: 'about.stats.apmierinatiba.label',
    },
  ]

  return (
    <section
      id='about'
      className='relative py-16 md:py-24 bg-surface'
      aria-labelledby='about-heading'
    >
      {/* White fade overlay at top for smooth transition from hero */}
      <div
        className='absolute inset-x-0 top-0 pointer-events-none z-[1]'
        style={{
          height: '150px',
          background:
            'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
        }}
      />

      {/* White fade overlay at bottom for smooth transition to next section */}
      <div
        className='absolute inset-x-0 bottom-0 pointer-events-none z-[1]'
        style={{
          height: '150px',
          background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
        }}
      />

      <div className='container mx-auto px-4 md:px-8 relative z-[2]'>
        <div className='text-center mb-12 md:mb-16'>
          <h2
            id='about-heading'
            className='text-3xl md:text-4xl lg:text-5xl font-bold text-text-base mb-4'
          >
            {t('about.title', 'Par PrintStudio')}
          </h2>
          <p className='max-w-2xl mx-auto text-text-muted'>
            {t(
              'about.subtitle',
              'Pilna servisa apdruka uzņēmumiem un privātpersonām — no dizaina līdz gatavam produktam.'
            )}
          </p>
          <div aria-hidden className='hidden' />
        </div>

        <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-start'>
          {/* Teksts + Statistika + B2B/B2C */}
          <div className='order-2 lg:order-1 space-y-6'>
            <p className='text-text-muted text-lg leading-relaxed'>
              {t(
                'about.paragraph1',
                'Kopš dibināšanas 2018. gadā PrintStudio palīdz gan uzņēmumiem, gan privātpersonām radīt kvalitatīvus drukas risinājumus: no vienas unikālas vienības līdz lielām sērijām.'
              )}
            </p>
            <p className='text-text-muted text-lg leading-relaxed'>
              {t(
                'about.paragraph2',
                'Apvienojam mūsdienīgas tehnoloģijas ar precīzu meistarību. Palīdzam ar dizainu, failu sagatavošanu un materiālu izvēli, lai rezultāts kalpotu ilgi un izskatītos profesionāli.'
              )}
            </p>

            {/* Statistika */}
            <div
              className='flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2'
              role='list'
              aria-label={t('about.stats.aria', 'Statistika')}
            >
              {stats.map(stat => (
                <StatItem key={stat.id} valueKey={stat.valueKey} labelKey={stat.labelKey} />
              ))}
            </div>

            {/* B2B / B2C buckets */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4'>
              <div className='bg-surface border border-border-color rounded-xl p-5'>
                <h3 className='text-lg font-semibold text-text-base mb-3'>
                  {t('about.buckets.b2b.title', 'Uzņēmumiem (B2B)')}
                </h3>
                <ul className='list-disc list-inside text-sm text-text-muted space-y-1'>
                  <li>{t('about.buckets.b2b.items.0', 'Individuāla pieeja jūsu uzņēmumam')}</li>
                  <li>{t('about.buckets.b2b.items.1', 'Formas apģērbs un merch komandām')}</li>
                  <li>
                    {t(
                      'about.buckets.b2b.items.2',
                      'Sērijveida pasūtījumi un noliktavas papildinājumi'
                    )}
                  </li>
                  <li>
                    {t('about.buckets.b2b.items.3', 'Dāvanu komplekti klientiem un darbiniekiem')}
                  </li>
                </ul>
              </div>
              <div className='bg-surface border border-border-color rounded-xl p-5'>
                <h3 className='text-lg font-semibold text-text-base mb-3'>
                  {t('about.buckets.b2c.title', 'Privātpersonām (B2C)')}
                </h3>
                <ul className='list-disc list-inside text-sm text-text-muted space-y-1'>
                  <li>
                    {t(
                      'about.buckets.b2c.items.0',
                      'Personalizētas dāvanas un vienas vienības druka'
                    )}
                  </li>
                  <li>{t('about.buckets.b2c.items.1', 'Kāzas, jubilejas, svinības, sports')}</li>
                  <li>{t('about.buckets.b2c.items.2', 'Konsultējam materiālu/krāsu izvēlē')}</li>
                  <li>{t('about.buckets.b2c.items.3', 'Ātri termiņi un vienkārša pasūtīšana')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Priekšrocību kartītes */}
          <div className='order-1 lg:order-2'>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {features.map(feature => (
                <FeatureCard
                  key={feature.id}
                  icon={feature.icon}
                  titleKey={feature.titleKey}
                  descriptionKey={feature.descriptionKey}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className='mt-12 text-center'>
          <p className='text-text-muted mb-4'>
            {t('about.cta.subtitle', 'Nosūti savu ideju — atbildēsim ar cenu un termiņu.')}
          </p>
          <a
            href='#contact'
            className={cn(
              'inline-block rounded-xl border border-transparent bg-primary px-6 py-3 text-white font-semibold',
              'hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary'
            )}
          >
            {t('about.cta.button', 'Sazināties')}
          </a>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
