import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  FileText,
  Image,
  Type,
  Ruler,
  Droplets,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Upload,
} from 'lucide-react'
import { cn } from '../lib/utils'
import SEO from '../components/SEO'

const Card: React.FC<{
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  className?: string
}> = ({ title, icon, children, className }) => (
  <article
    className={cn(
      'bg-surface border border-border-color rounded-2xl p-5 md:p-6 shadow-lg hover:shadow-xl transition-shadow',
      className
    )}
  >
    <header className='flex items-center gap-3 mb-3'>
      <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary'>
        {icon}
      </div>
      <h2 className='text-xl font-semibold text-text-base'>{title}</h2>
    </header>
    <div className='prose prose-sm max-w-none text-text-muted'>{children}</div>
  </article>
)

const Bullet: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <li className={cn('flex items-start gap-2', className)}>
    <span className='mt-1.5 inline-flex h-2.5 w-2.5 rounded-full bg-primary/70' />
    <span className='text-sm'>{children}</span>
  </li>
)

const FileGuidelinesPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <section className='py-16 md:py-20 bg-background'>
      <SEO
        title={`${t('fileGuidelines.title') as string} | PrintStudio`}
        description={t('fileGuidelines.subtitle') as string}
        url='/file-guidelines'
      />
      <div className='container mx-auto px-4 md:px-8'>
        {/* Header */}
        <div className='text-center mb-10 md:mb-14'>
          <h1 className='text-3xl md:text-4xl font-bold text-text-base mb-3'>
            {t('fileGuidelines.title')}
          </h1>
          <p className='text-lg text-text-base  max-w-3xl mx-auto'>
            {t('fileGuidelines.subtitle')}
          </p>
        </div>

        {/* Grid: pamata prasības */}
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
          <Card title={t('fileGuidelines.fileFormat.title')} icon={<FileText size={20} />}>
            <ul className='space-y-2'>
              <Bullet>
                <strong>{t('fileGuidelines.fileFormat.pdf')}</strong>
              </Bullet>
              <Bullet>{t('fileGuidelines.fileFormat.noWord')}</Bullet>
            </ul>
          </Card>

          <Card title={t('fileGuidelines.colorMode.title')} icon={<Droplets size={20} />}>
            <ul className='space-y-2'>
              <Bullet>{t('fileGuidelines.colorMode.cmyk')}</Bullet>
              <Bullet>{t('fileGuidelines.colorMode.difference')}</Bullet>
            </ul>
          </Card>

          <Card title={t('fileGuidelines.resolution.title')} icon={<Image size={20} />}>
            <ul className='space-y-2'>
              <Bullet>{t('fileGuidelines.resolution.dpi')}</Bullet>
              <Bullet>{t('fileGuidelines.resolution.avoid')}</Bullet>
            </ul>
          </Card>

          <Card title={t('fileGuidelines.bleed.title')} icon={<Ruler size={20} />}>
            <ul className='space-y-2'>
              <Bullet>{t('fileGuidelines.bleed.bleedSize')}</Bullet>
              <Bullet>{t('fileGuidelines.bleed.safeMargin')}</Bullet>
              <Bullet>{t('fileGuidelines.bleed.cropMarks')}</Bullet>
            </ul>
          </Card>

          <Card title={t('fileGuidelines.fonts.title')} icon={<Type size={20} />}>
            <ul className='space-y-2'>
              <Bullet>{t('fileGuidelines.fonts.outlines')}</Bullet>
              <Bullet>{t('fileGuidelines.fonts.embed')}</Bullet>
            </ul>
          </Card>

          <Card title={t('fileGuidelines.overprint.title')} icon={<Layers size={20} />}>
            <ul className='space-y-2'>
              <Bullet>{t('fileGuidelines.overprint.usage')}</Bullet>
              <Bullet>{t('fileGuidelines.overprint.richBlack')}</Bullet>
            </ul>
          </Card>
        </div>

        {/* Checklist + Upload info */}
        <div className='mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <article className='bg-surface border border-border-color rounded-2xl p-5 md:p-6 shadow-lg'>
            <header className='flex items-center gap-3 mb-3'>
              <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary'>
                <CheckCircle2 size={20} />
              </div>
              <h2 className='text-xl font-semibold text-text-base'>
                {t('fileGuidelines.checklist.title')}
              </h2>
            </header>
            <ul className='grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-text-muted'>
              <li>✓ {t('fileGuidelines.checklist.format')}</li>
              <li>✓ {t('fileGuidelines.checklist.colorMode')}</li>
              <li>✓ {t('fileGuidelines.checklist.resolution')}</li>
              <li>✓ {t('fileGuidelines.checklist.bleed')}</li>
              <li>✓ {t('fileGuidelines.checklist.fonts')}</li>
            </ul>
          </article>

          <article className='bg-surface border border-border-color rounded-2xl p-5 md:p-6 shadow-lg'>
            <header className='flex items-center gap-3 mb-3'>
              <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary'>
                <Upload size={20} />
              </div>
              <h2 className='text-xl font-semibold text-text-base'>
                {t('fileGuidelines.upload.title')}
              </h2>
            </header>
            <div className='prose prose-sm max-w-none text-text-muted'>
              <ol className='list-decimal pl-5 space-y-2'>
                <li>{t('fileGuidelines.upload.email')}</li>
                <li>{t('fileGuidelines.upload.transfer')}</li>
                <li>{t('fileGuidelines.upload.naming')}</li>
              </ol>
            </div>
          </article>
        </div>

        {/* Lejupielādes sagataves */}
        <div className='mt-10'>
          <h2 className='text-2xl font-semibold text-text-base mb-4'>
            {t('fileGuidelines.templates.title')}
          </h2>
          <p className='text-text-muted mb-4'>{t('fileGuidelines.templates.subtitle')}</p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {[
              {
                title: t('fileGuidelines.templates.businessCard'),
                href: '/templates/visiitkarte-90x50.zip',
              },
              { title: t('fileGuidelines.templates.flyer'), href: '/templates/skrejlapa-a4.zip' },
              { title: t('fileGuidelines.templates.poster'), href: '/templates/plakats-a3.zip' },
              { title: t('fileGuidelines.templates.rollup'), href: '/templates/rollup-85x200.zip' },
            ].map((template, i) => (
              <a
                key={i}
                href={template.href}
                className='group block rounded-xl border border-border-color bg-surface p-4 shadow hover:shadow-lg transition'
              >
                <div className='mb-2 font-medium text-text-base group-hover:text-primary'>
                  {template.title}
                </div>
                <div className='text-sm text-text-muted'>
                  {t('fileGuidelines.templates.formats')}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Brīdinājums / noderīga info */}
        <div className='mt-10 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 flex items-start gap-3'>
          <AlertTriangle className='mt-0.5' size={18} />
          <p className='text-sm'>{t('fileGuidelines.warning')}</p>
        </div>

        {/* CTA */}
        <div className='mt-10 text-center'>
          <a
            href='mailto:info@printstudio.lv'
            className='inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-white font-semibold hover:opacity-95 transition'
          >
            {t('fileGuidelines.cta')}
          </a>
        </div>
      </div>
    </section>
  )
}

export default FileGuidelinesPage
