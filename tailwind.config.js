/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FDFBF7',
          100: '#F9F6F0',
          200: '#F3ECE0',
          300: '#E9DECE',
          400: '#D5C4AD',
          800: '#3A352F',
          900: '#221F1C',
        },
        charcoal: {
          DEFAULT: '#262422',
          light: '#4A4642',
          muted: '#767069',
          deep: '#161412',
          border: '#D3C9BC'
        },
        graphite: '#3B3835',
        pencil: '#524E48',
        sepiaTone: '#8A725A',
        accentGold: '#9A7846',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        handwritten: ['"Caveat"', 'cursive'],
        editorial: ['"Cinzel"', 'serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      boxShadow: {
        'sketch': '2px 3px 0px rgba(38, 36, 34, 0.85)',
        'paper-elevated': '0 10px 30px -10px rgba(58, 53, 47, 0.12), 0 2px 4px rgba(58, 53, 47, 0.06)',
        'paper-deep': '0 20px 40px -15px rgba(38, 36, 34, 0.18)',
      }
    },
  },
  plugins: [],
}
