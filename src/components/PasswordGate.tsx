import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'

const PASSWORD_KEY = 'site_password_verified'
const CORRECT_PASSWORD = 'printstudio2025' // Mainiet uz savu paroli!

interface PasswordGateProps {
  children: React.ReactNode
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [password, setPassword] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Pārbauda, vai lietotājs jau ir verificēts
    const verified = sessionStorage.getItem(PASSWORD_KEY)
    if (verified === 'true') {
      setIsVerified(true)
    }
    setIsLoading(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem(PASSWORD_KEY, 'true')
      setIsVerified(true)
      setError('')
    } else {
      setError('Nepareiza parole!')
      setPassword('')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (isVerified) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Lapa Testēšanā
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Ievadiet paroli, lai turpinātu
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Parole
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  error ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ievadiet paroli..."
                autoFocus
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm mt-2 flex items-center gap-1"
                >
                  ⚠️ {error}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Ienākt
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Mājas lapa pašlaik ir izstrādes režīmā
          </p>
        </div>

        {/* Dev info (only visible in dev mode) */}
        {import.meta.env.DEV && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
            <p className="font-semibold">🔧 Dev Mode:</p>
            <p>Parole: <code className="bg-yellow-100 px-2 py-1 rounded">printstudio2025</code></p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
