/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // ── STRICT COLOR SYSTEM ──────────────────────────────────────
      colors: {
        // Brand
        primary:   '#0F172A',
        accent:    '#0F172A',

        // Backgrounds
        bg:        '#FFFFFF',
        'bg-soft': '#F8FAFC',

        // Text
        'text-primary':   '#0F172A',
        'text-secondary': '#64748B',
        'text-muted':     '#94A3B8',

        // UI
        border:    '#E2E8F0',
        success:   '#16A34A',
        error:     '#DC2626',
        warning:   '#D97706',

        // Semantic aliases for older code
        textDark:        '#0F172A',
        textMuted:       '#64748B',
        textLight:       '#94A3B8',
        bgLight:         '#F8FAFC',
        secondaryAccent: '#0F172A',
      },

      // ── STRICT SPACING (4px grid) ────────────────────────────────
      spacing: {
        // Override only to document — Tailwind defaults already match
        // 1 = 4px, 2 = 8px, 4 = 16px, 6 = 24px, 8 = 32px, 12 = 48px
        // Additional named tokens for clarity:
        'xs':  '4px',
        'sm':  '8px',
        'md':  '16px',
        'lg':  '24px',
        'xl':  '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '80px',
      },

      // ── TYPOGRAPHY ───────────────────────────────────────────────
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Body sizes
        xs:   ['12px', { lineHeight: '1.5' }],
        sm:   ['14px', { lineHeight: '1.6' }],
        base: ['16px', { lineHeight: '1.6' }],
        // Heading sizes
        h3:   ['18px', { lineHeight: '1.3', fontWeight: '700' }],
        h2:   ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        h1:   ['32px', { lineHeight: '1.1', fontWeight: '800' }],
        'h1-lg': ['40px', { lineHeight: '1.05', fontWeight: '900' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.03em',
        tight:    '-0.02em',
      },

      // ── BORDER RADIUS ─────────────────────────────────────────────
      borderRadius: {
        // Primary: 10px per spec
        DEFAULT: '10px',
        sm:      '6px',
        md:      '10px',
        lg:      '14px',
        xl:      '20px',
        '2xl':   '24px',
        '3xl':   '32px',
        full:    '9999px',
      },

      // ── SHADOWS ───────────────────────────────────────────────────
      boxShadow: {
        sm:  '0 1px 2px rgba(0,0,0,0.05)',
        md:  '0 2px 8px rgba(0,0,0,0.06)',
        lg:  '0 4px 16px rgba(0,0,0,0.08)',
        xl:  '0 8px 32px rgba(0,0,0,0.10)',
        card: '0 2px 8px rgba(15,23,42,0.05), 0 0 0 1px rgba(15,23,42,0.04)',
        'card-hover': '0 8px 24px rgba(15,23,42,0.10)',
      },

      // ── TRANSITIONS ───────────────────────────────────────────────
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        250: '250ms',
        400: '400ms',
      },

      // ── ANIMATIONS ────────────────────────────────────────────────
      animation: {
        'float':     'float 6s ease-in-out infinite',
        'fade-in':   'fadeIn 0.4s ease forwards',
        'slide-up':  'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        'shimmer':   'shimmer 2s linear infinite',
        'pulse-ring':'pulseRing 1.5s ease-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        pulseRing: {
          '0%':   { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },

      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};
