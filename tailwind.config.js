/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dribbble: {
          pink: '#EA4C89',
          pinkHover: '#F06292',
          pinkLight: 'rgba(234, 76, 137, 0.12)',
          dark: '#0D0C22',
          surface: '#151426',
          card: '#1C1B30',
          cardHover: '#22213A',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(234, 76, 137, 0.4)',
          text: '#F3F4F6',
          muted: '#9E9EA7',
          tag: 'rgba(255, 255, 255, 0.06)',
        },
        showroom: {
          void: '#0A0915',
          surface: '#121124',
          card: '#18172E',
          cardHover: '#201F3B',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(234, 76, 137, 0.35)',
        },
      },
      fontFamily: {
        sans: [
          'Outfit',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      boxShadow: {
        'dribbble-shot': '0 12px 32px -8px rgba(0, 0, 0, 0.5), 0 0 1px 1px rgba(255, 255, 255, 0.06)',
        'dribbble-hover': '0 24px 48px -12px rgba(0, 0, 0, 0.8), 0 0 25px -4px rgba(234, 76, 137, 0.25), 0 0 1px 1px rgba(234, 76, 137, 0.35)',
        'pink-glow': '0 0 25px -3px rgba(234, 76, 137, 0.45)',
        'pill': '0 4px 14px 0 rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'heart-burst': 'heartBurst 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heartBurst: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.35)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
