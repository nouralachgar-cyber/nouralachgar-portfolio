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
        // Futuristic Moroccan palette — fixed decorative tokens
        navy: {
          primary: '#07111F',
          secondary: '#0D1B2A',
          deep: '#0A1220',
          subtle: '#0D1B2A',
        },

        // Theme-aware tokens (switch with light/dark via CSS variables)
        cyan: 'rgb(var(--accent-cyan-rgb) / <alpha-value>)',
        violet: 'rgb(var(--accent-violet-rgb) / <alpha-value>)',
        champagne: 'rgb(var(--accent-champagne-rgb) / <alpha-value>)',
        terracotta: 'rgb(var(--accent-terracotta-rgb) / <alpha-value>)',
        ivory: 'rgb(var(--ivory-rgb) / <alpha-value>)',
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        muted: 'rgb(var(--muted-rgb) / <alpha-value>)',
        paper: 'rgb(var(--paper-rgb) / <alpha-value>)',
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

        mono: [
          '"SF Mono"',
          'Menlo',
          'Monaco',
          'monospace',
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
        cyan: '0 0 40px rgba(76, 201, 240, 0.15)',
        violet: '0 0 40px rgba(139, 94, 246, 0.15)',
      },

      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(-4px)' },
          '50%': { transform: 'translateY(5px)' },
        },
        'drift-cyan': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(24px, 18px, 0)' },
        },
        'drift-violet': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(-18px, -22px, 0)' },
        },
        'marquee-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },

      animation: {
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'drift-cyan': 'drift-cyan 16s ease-in-out infinite',
        'drift-violet': 'drift-violet 19s ease-in-out infinite',
        'marquee-x': 'marquee-x 38s linear infinite',
      },
    },
  },

  plugins: [],
};
