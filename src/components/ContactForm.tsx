import React, { useState } from 'react'
import Button from './Button' // Importējam pielāgoto pogu
import { cn } from '../lib/utils' // Importējam cn, ja nepieciešams
import { useForm } from 'react-hook-form'
import ReCaptchaV3 from './ReCaptchaV3'
import { useTranslation } from 'react-i18next'

type FormValues = {
  name: string
  email: string
  message: string
  company?: string // honeypot
  file?: FileList
  recaptchaToken?: string
}

const ContactForm: React.FC = () => {
  const { t } = useTranslation()
  // reCAPTCHA temporarily disabled - need to register key for printstudio.lv domain
  const RECAPTCHA_SITE_KEY = '' // '6LcA2OOrAAAAANbWMHQqlSOIDOtGIQtJjQRisbnA3';
  const [recaptchaToken, setRecaptchaToken] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    watch,
  } = useForm<FormValues>()

  const [serverError, setServerError] = useState<string | null>(null)
  const [serverOk, setServerOk] = useState<boolean>(false)
  const [selectedFileName, setSelectedFileName] = useState<string>('')

  // Client-side file limits (keep in sync with server)
  const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25 MB
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]

  const watchedFile = watch('file') as FileList | undefined
  React.useEffect(() => {
    if (watchedFile && watchedFile.length > 0) {
      const f = watchedFile[0]
      setSelectedFileName(f.name)
    } else {
      setSelectedFileName('')
    }
  }, [watchedFile])

  const onSubmit = async (data: FormValues) => {
    setServerError(null)
    setServerOk(false)
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('message', data.message)
      formData.append('company', data.company || '')
      if (data.file && data.file.length > 0) {
        formData.append('file', data.file[0])
      }
      formData.append('recaptchaToken', recaptchaToken)

      const res = await fetch('/contact.php', {
        method: 'POST',
        body: formData,
      })

      let json
      try {
        json = await res.json()
      } catch (e) {
        console.error('JSON parse error:', e, 'Response status:', res.status)
        throw new Error(`Server error (${res.status}): Invalid response`)
      }

      if (!res.ok || !json.ok) {
        const errorMsg = json.error || json.message || `Error: ${res.status}`
        throw new Error(errorMsg)
      }

      setServerOk(true)
      reset()
      setRecaptchaToken('')
      // Auto-hide success message after 5 seconds
      setTimeout(() => setServerOk(false), 5000)
    } catch (err: any) {
      console.error('Form error:', err)
      setServerError(err?.message || t('errorMessage', 'Radās kļūda sūtot ziņu'))
    }
  }

  // Bāzes stili ievades laukiem, lai neatkārtotos
  const inputBaseStyles = cn(
    'w-full px-4 py-3 rounded-lg text-sm md:text-base', // Pievienots text-sm md:text-base responsīvam fonta izmēram
    // === KRĀSAS NOMAINĪTAS ===
    'bg-surface border border-border-color text-text-base placeholder-text-muted', // Fons, apmale, teksts, placeholder
    'focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary', // Fokusa stili (izmanto primāro krāsu)
    'transition-all duration-300'
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-5 md:space-y-6'>
      {/* Google reCAPTCHA v3 token - temporarily disabled */}
      {RECAPTCHA_SITE_KEY && (
        <ReCaptchaV3 siteKey={RECAPTCHA_SITE_KEY} onToken={setRecaptchaToken} />
      )}
      {/* Honeypot lauks */}
      <input
        type='text'
        tabIndex={-1}
        autoComplete='off'
        className='hidden'
        aria-hidden='true'
        {...register('company')}
      />
      {serverOk && (
        <div className='rounded-md bg-green-50 border border-green-200 text-green-800 px-4 py-2 text-sm'>
          {t('contact.form.success', 'Paldies! Ziņojums nosūtīts.')}
        </div>
      )}
      {serverError && (
        <div className='rounded-md bg-red-50 border border-red-200 text-red-800 px-4 py-2 text-sm'>
          {serverError}
        </div>
      )}
      <div>
        <label htmlFor='name' className='block text-sm font-medium mb-1.5 text-text-base'>
          {t('contact.form.name', 'Vārds')}
        </label>
        <input
          type='text'
          id='name'
          {...register('name', {
            required: t('contact.form.errors.required', 'Lauks ir obligāts'),
          })}
          className={inputBaseStyles}
          placeholder={t('contact.form.placeholders.name', 'Jūsu vārds')}
          autoComplete='name'
        />
        {errors.name && <p className='mt-1 text-sm text-da-red'>{String(errors.name.message)}</p>}
      </div>
      <div>
        <label htmlFor='email' className='block text-sm font-medium mb-1.5 text-text-base'>
          {t('contact.form.email', 'E-pasts')}
        </label>
        <input
          type='email'
          id='email'
          {...register('email', {
            required: t('contact.form.errors.required', 'Lauks ir obligāts'),
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: t('contact.form.errors.email', 'Nederīgs e-pasts'),
            },
          })}
          className={inputBaseStyles}
          placeholder={t('contact.form.placeholders.email', 'Jūsu e-pasts')}
          autoComplete='email'
        />
        {errors.email && <p className='mt-1 text-sm text-da-red'>{String(errors.email.message)}</p>}
      </div>
      <div>
        <label htmlFor='message' className='block text-sm font-medium mb-1.5 text-text-base'>
          {t('contact.form.message', 'Ziņa')}
        </label>
        <textarea
          id='message'
          rows={4}
          {...register('message', {
            required: t('contact.form.errors.required', 'Lauks ir obligāts'),
            minLength: {
              value: 10,
              message: t('contact.form.errors.messageShort', 'Ziņa ir pārāk īsa'),
            },
          })}
          className={inputBaseStyles}
          placeholder={t('contact.form.placeholders.message', 'Pastāstiet par savu projektu')}
          autoComplete='off'
        />
        {errors.message && (
          <p className='mt-1 text-sm text-da-red'>{String(errors.message.message)}</p>
        )}
      </div>
      <div>
        <label htmlFor='file' className='block text-sm font-medium mb-1.5 text-text-base'>
          {t('contact.form.file', 'Pievienot failu')}
        </label>
        <div className='flex items-center gap-3'>
          <input
            type='file'
            id='file'
            accept='.pdf,.jpg,.jpeg,.png,.doc,.docx'
            {...register('file', {
              onChange: (e: any) => {
                const fl = e.target.files
                if (!fl || fl.length === 0) {
                  setSelectedFileName('')
                  return
                }
                const f = fl[0]
                // Client-side validation
                if (f.size > MAX_FILE_SIZE) {
                  setError('file', {
                    type: 'manual',
                    message: `Fails ir pārāk liels (max ${Math.round(MAX_FILE_SIZE / 1024 / 1024)} MB)`,
                  })
                } else if (allowedTypes.length && !allowedTypes.includes(f.type)) {
                  setError('file', { type: 'manual', message: 'Faila tips nav atļauts' })
                } else {
                  // clear any previous file errors
                  if (errors.file) {
                    // @ts-ignore
                    delete errors.file
                  }
                }
                setSelectedFileName(f.name)
              },
            })}
            className='hidden'
          />

          <button
            type='button'
            onClick={() => document.getElementById('file')?.click()}
            className='inline-flex items-center gap-2 px-4 py-2 rounded bg-primary text-white text-sm font-medium hover:brightness-110 transition-all'
          >
            {t('contact.form.chooseFile', 'Choose File')}
          </button>

          <div className='text-sm text-text-base'>
            {selectedFileName ||
              `${Math.round(MAX_FILE_SIZE / 1024 / 1024)} MB, PDF/JPG/PNG/DOC/DOCX`}
          </div>
        </div>
        {errors.file && <p className='mt-1 text-sm text-da-red'>{String(errors.file.message)}</p>}
      </div>
      <Button type='submit' variant='primary' size='md' className='w-full' disabled={isSubmitting}>
        {isSubmitting
          ? t('contact.form.sending', 'Sūtīšana...')
          : t('contact.form.submit', 'Sūtīt Ziņu')}
      </Button>
    </form>
  )
}

export default ContactForm
