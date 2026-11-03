/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F7F5',
        surface: '#FFFFFF',
        foreground: '#171717',
        secondary: '#777777',
        muted: '#A1A1A1',
        border: '#E5E5E5',
        dark: {
          DEFAULT: '#171717',
          surface: '#252525'
        },
        capy: {
          brown: '#B88A62',
          pink: '#E9A6B7',
          blue: '#B8DDE8'
        }
      },
      fontFamily: {
        serif: ['"Instrument Serif"', '"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', '"Geist"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 2s infinite',
        'float-reverse': 'floatRev 7.5s ease-in-out 1s infinite',
        'ripple': 'ripple 1.4s cubic-bezier(0, 0.2, 0.8, 1) forwards',
        'water-flow': 'waterFlow 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatRev: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.1)', opacity: '0.8' },
          '100%': { transform: 'scale(3.5)', opacity: '0' },
        },
        waterFlow: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        }
      }
    },
  },
  plugins: [],
}
