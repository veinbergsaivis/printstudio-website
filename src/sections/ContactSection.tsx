// src/sections/ContactSection.tsx
import React from 'react'
import { useTranslation } from 'react-i18next'
import ContactForm from '../components/ContactForm'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Linkedin } from 'lucide-react'
import { cn } from '../lib/utils'

// ── Apakškomponents: viena rindas vienība (ikona + virsraksts + saturs) ─────────
interface ContactRowProps {
  icon: React.ReactNode
  title: string
  lines: string | string[]
  href?: string
}
const ContactRow: React.FC<ContactRowProps> = ({ icon, title, lines, href }) => {
  const iconEl = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<any>, { size: 20, className: 'text-primary' })
    : icon

  const arr = Array.isArray(lines) ? lines : [lines]
  const isLink = !!href && typeof lines === 'string'

  return (
    <div className='flex items-start gap-4'>
      <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0'>
        {iconEl}
      </div>
      <div>
        <h4 className='text-text-base font-semibold mb-0.5'>{title}</h4>
        <div className='text-text-muted space-y-0.5'>
          {arr.map((l, i) =>
            isLink ? (
              <a key={i} href={href!} className='break-words hover:text-primary transition-colors'>
                {l}
              </a>
            ) : (
              <p key={i} className='break-words'>
                {l}
              </p>
            )
          )}
        </div>
      </div>
    </div>
  )
}

// ── Apakškomponents: sociālo ikonu poga ────────────────────────────────────────
interface SocialLinkProps {
  href: string
  label: string
  icon: React.ReactNode
}
const SocialLink: React.FC<SocialLinkProps> = ({ href, label, icon }) => {
  const iconEl = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<any>, {
        size: 18,
        className: 'text-text-muted group-hover:text-primary transition-colors duration-300',
      })
    : icon

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={cn(
        'w-9 h-9 flex items-center justify-center rounded-full bg-surface text-text-muted shadow-md',
        'transition-all duration-300 ease-in-out group hover:text-primary hover:bg-primary/10 hover:shadow-lg',
        'focus:outline-none focus:ring-2 focus:ring-primary/40'
      )}
      aria-label={label}
    >
      {iconEl}
    </a>
  )
}

// ── Galvenais komponents ───────────────────────────────────────────────────────
const ContactSection: React.FC = () => {
  const { t } = useTranslation()

  // Darba laiks var būt string vai string[] (no lv.ts)
  const hoursVal = t('contact.info.hours.value', { returnObjects: true }) as string[] | string

  return (
    <section id='contact' className='py-16 md:py-20 bg-surface relative overflow-hidden'>
      {/* White fade overlay augšā - pāreja no bg-accent/10 */}
      <div
        className='absolute inset-x-0 top-0 pointer-events-none z-[1]'
        style={{
          height: '150px',
          background:
            'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
        }}
      />

      <div className='container mx-auto px-4 md:px-8 relative z-10'>
        {/* Header */}
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-text-base mb-4'>
            {t('contact.title', 'Sazinies ar Mums')}
          </h2>
          <p className='text-lg text-text-muted max-w-2xl mx-auto mb-6'>
            {t(
              'contact.description',
              'Vai jums ir projekta ideja? Sazinieties ar mums — radīsim ko lielisku.'
            )}
          </p>
          <div className='hidden' />
        </div>

        {/* Divkolonnu layout: pa kreisi info, pa labi forma */}
        <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
          {/* LEFT: Kontaktinformācijas kartīte (Liepāja) */}
          <article className='bg-surface border border-border-color rounded-2xl p-6 md:p-8 shadow-lg'>
            <h3 className='text-2xl font-semibold text-text-base mb-6'>
              {t('contact.info.title', 'Kontaktinformācija')}
            </h3>

            <div className='space-y-6'>
              <ContactRow
                icon={<MapPin />}
                title={t('contact.info.location.title', 'Adrese')}
                lines={t('contact.info.location.value', 'Tirgoņu iela 18, Liepāja, LV-3401')}
              />
              <ContactRow
                icon={<Phone />}
                title={t('contact.info.phone.title', 'Tālrunis')}
                lines={t('contact.info.phone.value', '(+371) 29 901 071')}
                href={`tel:${t('contact.info.phone.value', '+371 29 901 071').replace(/\s|\(|\)/g, '')}`}
              />
              <ContactRow
                icon={<Mail />}
                title={t('contact.info.email.title', 'E-pasts')}
                lines={t('contact.info.email.value', 'info@printstudio.lv')}
                href={`mailto:${t('contact.info.email.value', 'info@printstudio.lv')}`}
              />
              <ContactRow
                icon={<Clock />}
                title={t('contact.info.hours.title', 'Darba Laiks')}
                lines={hoursVal}
              />
            </div>

            {/* Socials */}
            <div className='mt-10 pt-6 border-t border-border-color'>
              <h4 className='text-lg font-semibold text-text-base mb-4'>
                {t('contact.social.title', 'Seko Mums')}
              </h4>
              <div className='flex gap-3'>
                <SocialLink
                  href='#'
                  label={t('contact.social.instagram', 'Instagram')}
                  icon={<Instagram />}
                />
                <SocialLink
                  href='#'
                  label={t('contact.social.facebook', 'Facebook')}
                  icon={<Facebook />}
                />
                <SocialLink
                  href='#'
                  label={t('contact.social.linkedin', 'LinkedIn')}
                  icon={<Linkedin />}
                />
              </div>
            </div>
          </article>

          {/* RIGHT: Forma (sticky UX) */}
          <aside className='bg-surface border border-border-color rounded-2xl p-6 md:p-8 shadow-lg sticky top-6'>
            <h3 className='text-2xl font-semibold text-text-base mb-6'>
              {t('contact.form.title', 'Sūti mums ziņu')}
            </h3>
            <ContactForm />
          </aside>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
