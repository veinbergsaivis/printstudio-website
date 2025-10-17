import React, { useState } from 'react'
import Button from './Button' // Importējam pielāgoto pogu
import { cn } from '../lib/utils' // Importējam cn, ja nepieciešams
import { useForm } from 'react-hook-form'

type FormValues = {
  name: string
  email: string
  message: string
  company?: string // honeypot
}

const ContactForm: React.FC = () => {
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
      const res = await fetch('/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json().catch(() => ({ ok: false, error: 'Invalid response' }))
      if (!res.ok || !json.ok) {
        throw new Error(json.error || 'Failed to send')
      }
      setServerOk(true)
      reset()
    } catch (err: any) {
      console.error(err)
      setServerError(err?.message || 'Sorry, something went wrong. Please try again later.')
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
      {' '}
      {/* Nedaudz pielāgota atstarpe */}
      {/* Honeypot field - hidden from users */}
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
          Paldies! Ziņojums nosūtīts.
        </div>
      )}
      {serverError && (
        <div className='rounded-md bg-red-50 border border-red-200 text-red-800 px-4 py-2 text-sm'>
          {serverError}
        </div>
      )}
      <div>
        <label htmlFor='name' className='block text-sm font-medium mb-1.5 text-text-base'>
          Name
        </label>
        <input
          type='text'
          id='name'
          {...register('name', { required: 'Required' })}
          className={inputBaseStyles}
          placeholder='Jūsu vārds vai uzņēmuma nosaukums'
          autoComplete='name'
        />
        {errors.name && <p className='mt-1 text-sm text-da-red'>{String(errors.name.message)}</p>}
      </div>
      <div>
        <label htmlFor='email' className='block text-sm font-medium mb-1.5 text-text-base'>
          Email
        </label>
        <input
          type='email'
          id='email'
          {...register('email', {
            required: 'Required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' },
          })}
          className={inputBaseStyles}
          placeholder='Jūsu e-pasts'
          autoComplete='email'
        />
        {errors.email && <p className='mt-1 text-sm text-da-red'>{String(errors.email.message)}</p>}
      </div>
      <div>
        <label htmlFor='message' className='block text-sm font-medium mb-1.5 text-text-base'>
          Message
        </label>
        <textarea
          id='message'
          rows={4}
          {...register('message', {
            required: 'Required',
            minLength: { value: 10, message: 'Message is too short' },
          })}
          className={inputBaseStyles}
          placeholder='Jūsu ziņojums'
          autoComplete='off'
        />
        {errors.message && (
          <p className='mt-1 text-sm text-da-red'>{String(errors.message.message)}</p>
        )}
      </div>
      {/* Izmantojam pielāgoto Button komponentu */}
      {/* Pārliecinies, ka Button komponentā 'primary' variants ir tas, ko vēlies šeit (piem., electric-blue) */}
      <Button type='submit' variant='primary' size='md' className='w-full' disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}

export default ContactForm
