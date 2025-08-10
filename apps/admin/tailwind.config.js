/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pitch: '#0C7C59',
        accent: 'hsl(var(--accent))',
        ink: '#1E293B',
        bgLight: '#F4F6FA',
        bgDark: '#0B1220',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#0C7C59',
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
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },
      boxShadow: {
        card: '0 10px 30px rgba(12,124,89,0.08)',
        glow: '0 0 0 3px rgba(182,255,64,0.35)',
      },
      borderRadius: {
        xl: '16px',
        '2xl': '24px',
      },
      backgroundImage: {
        'radial-grid':
          'radial-gradient(1200px 400px at 80% -10%, rgba(182,255,64,.15), transparent), radial-gradient(800px 300px at -10% 110%, rgba(12,124,89,.20), transparent)',
        'striped-pitch':
          'repeating-linear-gradient(90deg, rgba(12,124,89,.05) 0 40px, rgba(12,124,89,.12) 40px 80px)',
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
};
