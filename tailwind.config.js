/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic tokens are driven by CSS variables (see index.css) so the
        // same class names respond to the light / dark theme toggle.
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          soft: 'rgb(var(--ink-soft) / <alpha-value>)',
          muted: 'rgb(var(--ink-muted) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          raised: 'rgb(var(--surface-raised) / <alpha-value>)',
          sunken: 'rgb(var(--surface-sunken) / <alpha-value>)',
        },
        line: 'rgb(var(--line) / <alpha-value>)',
        content: {
          DEFAULT: 'rgb(var(--content) / <alpha-value>)',
          soft: 'rgb(var(--content-soft) / <alpha-value>)',
          muted: 'rgb(var(--content-muted) / <alpha-value>)',
        },
        // Brand accents — warm amber/gold primary, soft teal secondary.
        gold: {
          50: '#fbf6ec',
          100: '#f5e8cf',
          200: '#ecd39d',
          300: '#e2bb6b',
          400: '#d9a648',
          500: '#c98a2b',
          600: '#a86d22',
          700: '#85521f',
          800: '#6d4320',
          900: '#5c391f',
        },
        teal: {
          50: '#edfbf7',
          100: '#d2f4ea',
          200: '#a8e8d7',
          300: '#71d4bd',
          400: '#3fb89e',
          500: '#249c85',
          600: '#1a7d6c',
          700: '#186458',
          800: '#175048',
          900: '#16423d',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Playfair Display', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '28px',
      },
      boxShadow: {
        glass: '0 8px 30px -10px rgb(0 0 0 / 0.35), inset 0 1px 0 0 rgb(255 255 255 / 0.07)',
        'glass-hover':
          '0 18px 50px -14px rgb(0 0 0 / 0.42), inset 0 1px 0 0 rgb(255 255 255 / 0.12)',
        'glow-gold': '0 0 0 1px rgb(217 166 72 / 0.25), 0 8px 40px -8px rgb(217 166 72 / 0.35)',
        'glow-teal': '0 0 0 1px rgb(63 184 158 / 0.25), 0 8px 40px -8px rgb(63 184 158 / 0.3)',
        soft: '0 4px 20px -4px rgb(0 0 0 / 0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.75' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.8s infinite',
        'fade-in': 'fade-in 0.5s ease-out both',
        'fade-up': 'fade-up 0.5s ease-out both',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
      },
      backgroundImage: {
        'radial-gold': 'radial-gradient(circle at 30% 20%, rgb(217 166 72 / 0.12), transparent 60%)',
        'aurora':
          'radial-gradient(60% 60% at 20% 10%, rgb(217 166 72 / 0.10), transparent 60%), radial-gradient(50% 50% at 85% 20%, rgb(63 184 158 / 0.08), transparent 55%)',
      },
    },
  },
  plugins: [],
};
