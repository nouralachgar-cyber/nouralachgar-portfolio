/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // New Futuristic Moroccan palette
        navy: {
          primary: '#07111F',
          secondary: '#0D1B2A',
          deep: '#101B2D',
        },

        cyan: '#4CC9F0',
        violet: '#8B5CF6',

        ivory: '#F5EBDD',
        champagne: '#D6A77A',
        terracotta: '#C98262',
        muted: '#8FA3B8',

        // Derived/neutral extensions
        'navy-deep': '#0a0e1a',
        'surface-elevated': '#111e2e',

        // Light mode
        light: {
          primary: '#F5EBDD',
          secondary: '#E8D8C9',
          deep: '#F0E0D0',
        },

        // Used by Navbar / components
        'navy-subtle': '#0D1B2A',

        // Extra aliases for the new UI
        'navy-primary': '#07111F',
        'navy-secondary': '#0D1B2A',
        'surface-deep': '#101B2D',
      },

      fontFamily: {
        editorial: [
          'Fraunces',
          'Georgia',
          'serif',
        ],

        sans: [
          'Manrope',
          'Inter',
          'system-ui',
          'sans-serif',
        ],

        arabic: [
          '"IBM Plex Sans Arabic"',
          'sans-serif',
        ],

        'arabic-display': [
          '"Noto Naskh Arabic"',
          'serif',
        ],
      },

      letterSpacing: {
        editorial: '-0.03em',
      },

      maxWidth: {
        shell: '1240px',
      },

      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
        smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },

      boxShadow: {
        soft: '0 30px 80px -50px rgba(7, 17, 31, 0.5)',
        lift: '0 22px 50px -30px rgba(13, 27, 42, 0.4)',
        glass: '0 4px 20px rgba(0, 0, 0, 0.4)',
        cyan: '0 0 40px rgba(76, 201, 240, 0.15)',
        violet: '0 0 40px rgba(139, 94, 246, 0.15)',
        terracotta: '0 0 30px rgba(201, 130, 98, 0.1)',
      },
    },
  },

  plugins: [],
};