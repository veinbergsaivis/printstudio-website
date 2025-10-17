import React, { useEffect } from 'react'

interface Props {
  siteKey: string
  onToken: (token: string) => void
}

const ReCaptchaV3: React.FC<Props> = ({ siteKey, onToken }) => {
  useEffect(() => {
    if (!window.grecaptcha) {
      const script = document.createElement('script')
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
      script.async = true
      script.onload = () => {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(siteKey, { action: 'contact' }).then(onToken)
        })
      }
      document.body.appendChild(script)
    } else {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(siteKey, { action: 'contact' }).then(onToken)
      })
    }
  }, [siteKey, onToken])
  return null
}

export default ReCaptchaV3
