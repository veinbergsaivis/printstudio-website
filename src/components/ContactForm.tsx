import React, { useState } from 'react'
import Button from './Button' // Importējam pielāgoto pogu
import { cn } from '../lib/utils' // Importējam cn, ja nepieciešams
import { useForm } from 'react-hook-form'
import ReCaptchaV3 from './ReCaptchaV3'

type FormValues = {
  name: string
  email: string
  message: string
  company?: string // honeypot
  file?: FileList
  recaptchaToken?: string
}

const ContactForm: React.FC = () => {
  const RECAPTCHA_SITE_KEY = '6LcA2OOrAAAAANbWMHQqlSOIDOtGIQtJjQRisbnA3';
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
  // I18n import (pieņemam, ka tiek izmantots useTranslation)
  // Ja nav, pievieno: import { useTranslation } from 'react-i18next'
  // ...existing code...
  const { t } = require('react-i18next')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>()

  const [serverError, setServerError] = useState<string | null>(null)
  const [serverOk, setServerOk] = useState<boolean>(false)

  const onSubmit = async (data: FormValues) => {
    setServerError(null)
    setServerOk(false)
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('message', data.message);
      formData.append('company', data.company || '');
      if (data.file && data.file.length > 0) {
        formData.append('file', data.file[0]);
      }
      formData.append('recaptchaToken', recaptchaToken);
      const res = await fetch('/contact.php', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json().catch(() => ({ ok: false, error: t('errorMessage', 'Radās kļūda.') }));
      if (!res.ok || !json.ok) {
        throw new Error(json.error || t('errorMessage', 'Radās kļūda.'));
      }
      setServerOk(true);
      reset();
    } catch (err: any) {
      console.error(err);
      setServerError(err?.message || t('errorMessage', 'Radās kļūda.'));
    }
  };

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
      {/* Google reCAPTCHA v3 token */}
      <ReCaptchaV3 siteKey={RECAPTCHA_SITE_KEY} onToken={setRecaptchaToken} />
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
          {...register('name', { required: t('contact.form.errors.required', 'Lauks ir obligāts') })}
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
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('contact.form.errors.email', 'Nederīgs e-pasts') },
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
            minLength: { value: 10, message: t('contact.form.errors.messageShort', 'Ziņa ir pārāk īsa') },
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
        <input
          type='file'
          id='file'
          accept='.pdf,.jpg,.jpeg,.png,.doc,.docx'
          {...register('file')}
          className={inputBaseStyles}
        />
        {errors.file && <p className='mt-1 text-sm text-da-red'>{String(errors.file.message)}</p>}
      </div>
      <Button type='submit' variant='primary' size='md' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? t('contact.form.sending', 'Sūtīšana...') : t('contact.form.submit', 'Sūtīt Ziņu')}
      </Button>
    </form>
  )
}

export default ContactForm
