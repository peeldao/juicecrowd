/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      boxShadow: {
        card: '0 4px 14px 0 rgba(0, 0, 0, 0.03)',
        cardHover: '0 6px 14px 0 rgba(0, 0, 0, 0.05)',
        nav: '0 4px 12px 0 rgba(0, 0, 0, 0.06)',
      },
      fontFamily: {
        display: ['var(--font-agrandir-wide)', ...defaultTheme.fontFamily.sans],
        heading: ['var(--font-agrandir)', ...defaultTheme.fontFamily.sans],
        body: ['var(--font-beatrice)', ...defaultTheme.fontFamily.sans],
      },

      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          hover: 'hsl(var(--primary-hover))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        tooltip: {
          DEFAULT: 'hsl(var(--tooltip))',
          foreground: 'hsl(var(--tooltip-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        bluebs: {
          25: '#EEF1FD',
          50: '#E3E9FF',
          100: '#CFD9FA',
          200: '#BBC8F6',
          300: '#9AAEF5',
          400: '#748EED',
          500: '#5777EB',
          600: '#4864C8',
          700: '#3A52A6',
          800: '#233575',
          900: '#152254',
          950: '#11172D',
        },
        melon: {
          25: '#F6FEF9',
          50: '#EBFAF1',
          100: '#E1F7EA',
          200: '#C6EDD5',
          300: '#A5E0BD',
          400: '#86D5A5',
          500: '#68CA8F',
          600: '#4AA16C',
          700: '#357951',
          800: '#2A5139',
          900: '#1F3D2B',
          950: '#15281D',
        },
        split: {
          25: '#FFFCF5',
          50: '#FFF7E8',
          100: '#FFEECC',
          200: '#FFE1A6',
          300: '#FFD27A',
          400: '#FFBB45',
          500: '#F0A41D',
          600: '#D98909',
          700: '#BD6800',
          800: '#7D4002',
          900: '#5C2C00',
          950: '#2E1605',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
