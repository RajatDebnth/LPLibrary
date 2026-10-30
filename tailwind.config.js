/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        showroom: {
          void: '#050608',       // Pure ultra-deep black/obsidian
          surface: '#0B0D13',    // Dark obsidian card/panel background
          card: '#10131B',       // Elevated surface
          cardHover: '#151924',  // Active/hover surface
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(0, 245, 255, 0.3)',
          subtle: '#7E8698',
          muted: '#4B5364',
          highlight: 'rgba(255, 255, 255, 0.04)',
        },
        accent: {
          cyan: '#00F5FF',
          sky: '#38BDF8',
          blue: '#2563EB',
          glow: 'rgba(0, 245, 255, 0.15)',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'monospace'],
      },
      boxShadow: {
        'luxury-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
        'luxury-hover': '0 30px 60px -15px rgba(0, 0, 0, 0.9), 0 0 25px -5px rgba(0, 245, 255, 0.25), 0 0 1px 1px rgba(0, 245, 255, 0.4)',
        'cyan-glow': '0 0 30px -5px rgba(0, 245, 255, 0.35)',
        'subtle-glow': '0 0 50px -10px rgba(56, 189, 248, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};

