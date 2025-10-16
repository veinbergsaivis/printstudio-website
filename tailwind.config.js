// tailwind.config.js
/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'
import lineClamp from '@tailwindcss/line-clamp'
import textShadow from 'tailwindcss-textshadow'

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '2rem',
        lg: '2rem',
        xl: '3rem',
        '2xl': '4rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      fontFamily: {
        // Montserrat tiek paņemts no index.html <link> (Google Fonts)
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Tava palete
        'da-white': '#FFFFFF',
        'da-offwhite': '#F8F9FA',
        'da-black': '#1A1A1A',
        'da-red': '#D92121',
        'da-medium-gray': '#737373',
        'da-light-gray': '#C5CED6',

        'background': '#F8F9FA',
        'surface': '#FFFFFF',
        'primary': '#D92121',
        'secondary': '#737373',
        'accent': '#C5CED6',

        'text-base': '#1A1A1A',
        'text-muted': '#737373',
        'text-link': '#D92121',

        'border-color': '#C5CED6',
      },
      boxShadow: {
        // Tavas ēnas
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        none: 'none',
      },
      keyframes: {
        // Aizpildīti keyframes
        blob: {
          '0%':   { transform: 'translate(0px, 0px) scale(1)' },
          '33%':  { transform: 'translate(20px, -30px) scale(1.05)' },
          '66%':  { transform: 'translate(-15px, 15px) scale(0.97)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blob: 'blob 7s ease-in-out infinite',
        fadeIn: 'fadeIn 1.5s ease-in-out both',
      },
      // Ja vēlies ērtus utilīšu nosaukumus arī bez plugin klases
      textShadow: {
        sm: '0 1px 1px rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 2px rgba(0, 0, 0, 0.1)',
        none: 'none',
      },
    },
  },
  plugins: [
    textShadow,
    typography,
    lineClamp,
  ],
}
