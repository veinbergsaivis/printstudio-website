// src/sections/ServicesSection.tsx
import React from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '../lib/utils' // Pārbaudi ceļu

// Importēsim ikonas no lucide-react (vari izvēlēties citas vai savas SVG)
// Izvēlēsimies ikonas, kas labāk atbilst jaunajiem pakalpojumiem
import {
  Printer, // Vispārējai drukai
  Layout, // Dizainam/maketēšanai
  Shirt, // Apģērbu drukai
  ShoppingBag, // Reklāmas materiāliem
  Megaphone, // Lielformāta drukai
  BookOpen, // Brošūrām/kataloģiem
  CreditCard, // Vizītkartēm
  Gift, // Dāvanu priekšmetiem
} from 'lucide-react'

interface ServiceItemProps {
  id: string // Pakalpojuma ID tulkojumiem
  icon: React.ReactNode
  // title un description tiks ņemti no tulkojumiem
}

// Datu masīvs pakalpojumiem ar reālistiskākiem ID un ikonām
const servicesData: ServiceItemProps[] = [
  { id: 'vizitkartes', icon: <CreditCard size={36} /> },
  { id: 'skrejlapasBroshuras', icon: <BookOpen size={36} /> },
  { id: 'lielformataDrukas', icon: <Megaphone size={36} /> },
  { id: 'apgerbuDrukas', icon: <Shirt size={36} /> },
  { id: 'reklamasMateriali', icon: <ShoppingBag size={36} /> },
  { id: 'grafiskaisDizains', icon: <Layout size={36} /> },
  { id: 'suveniriDrukas', icon: <Gift size={36} /> },
  { id: 'citiDrukasPakalpojumi', icon: <Printer size={36} /> }, // Vispārējais pakalpojums
]

// Atsevišķs komponents vienam pakalpojuma elementam (kartītei)
const ServiceItemCard: React.FC<ServiceItemProps> = ({ id, icon }) => {
  const { t } = useTranslation()
  // Izmantojam ID, lai iegūtu tulkojumus
  const title = t(`services.items.${id}.title`, id) // Noklusējums ir pats ID, ja tulkojums nav atrasts
  const description = t(
    `services.items.${id}.description`,
    'Detalizēts pakalpojuma apraksts drīzumā...'
  ) // Noklusējuma apraksts

  // Klons ikonas elementam, lai varētu pievienot klases
  const clonedIcon = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<any>, {
        className: cn(
          (icon as React.ReactElement<any>).props.className,
          'text-primary group-hover:text-white transition-colors duration-300' // Ikonas krāsa mainās uz hover
        ),
      })
    : icon

  return (
    <div
      className={cn(
        'group bg-surface rounded-xl p-6 md:p-8 shadow-md border border-border-color',
        'transition-all duration-300 ease-in-out',
        'hover:bg-primary hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1'
      )}
    >
      <div className='flex flex-col items-center text-center md:flex-row md:text-left md:items-start gap-4 md:gap-6'>
        {/* Ikonas bloks */}
        <div
          className={cn(
            'flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center',
            'transition-colors duration-300 group-hover:bg-white/20' // Fons mainās uz hover
          )}
        >
          {clonedIcon}
        </div>
        {/* Teksta bloks */}
        <div className='flex-1'>
          <h3 className='text-xl font-semibold text-text-base mb-2 group-hover:text-white transition-colors duration-300'>
            {title}
          </h3>
          <p className='text-text-muted text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300'>
            {description}
          </p>
          {/* TODO: Varētu pievienot "Uzzināt vairāk" saiti, ja ir detalizētākas lapas par katru pakalpojumu */}
        </div>
      </div>
    </div>
  )
}

const ServicesSection: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section id='services' className='relative py-16 md:py-20 bg-accent/10'>
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

      <div className='container mx-auto px-4 md:px-8 relative z-[2]'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-text-base mb-4'>
            {t('services.title', 'Mūsu Pakalpojumi')}
          </h2>
          <p className='text-lg text-text-muted max-w-2xl mx-auto mb-6'>
            {t(
              'services.description',
              'Mēs piedāvājam plašu drukas un dizaina pakalpojumu klāstu, lai apmierinātu visas jūsu vajadzības. No vizītkartēm līdz lielformāta drukai – mēs esam šeit, lai palīdzētu jūsu idejām materializēties.'
            )}
          </p>
          {/* Akcenta līnija (tāda pati kā GallerySection) */}
          <div className='hidden'></div>
        </div>

        {servicesData.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8'>
            {servicesData.map(service => (
              <ServiceItemCard key={service.id} id={service.id} icon={service.icon} />
            ))}
          </div>
        ) : (
          <p className='text-center text-text-muted'>
            {t('services.empty', 'Pakalpojumu saraksts pašlaik tiek atjaunots.')}
          </p>
        )}
      </div>
    </section>
  )
}

export default ServicesSection
