/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: {
    files: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    transform: (content) => content.replace(/taos:/g, ''),
  },
  darkMode: 'class',
  theme: {
    fontFamily: {
      fredericka: ['Fredericka the Great', 'cursive'],
      tenor: ['Tenor Sans', 'sans-serif'],
      monserrat: ['Montserrat', 'sans-serif'],
      cormo: ['Cormorant', 'serif'],
      clicker: ['Clicker Script', 'cursive'],
      poppins: ['Poppins', 'sans-serif'],
      abril: ['Abril Fatface', 'cursive'],
      serif: ['DM Serif Display', 'serif'],
      jo: ['Josefin Sans', 'sans-serif'],
      po: ['Poiret One', 'cursive'],
      ultra: ['Ultra', 'serif'],
      fed: ['Federo', 'sans - serif'],
      archivo: ['archivo Black', 'monospace'],
      cutive: ['Cutive Mono', 'monospace'],
      dm: ['DM Mono', 'monospace'],
      pt: ['PT Mono', 'monospace'],
      hat: ['Red Hat Mono', 'monospace'],
      roboto: ['Roboto Mono', 'monospce'],
      inso: ['Inconsolata', 'monospace'],
      jost: ['Jost', 'monospace'],
    },
    fontWeight: {
      thin: 100,
      xtralight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      xtrabold: 800,
      black: 900,
    },
    extend: {
      colors: {
        dark: '#0a0908',
        headers: '#F68080',
        'primary-gray': '#4A4B51',
        label: '#F68080',
        'light-gray': 'rgba(196, 196, 196, 12%)',
        'user-acc-bg': 'rgba(246, 126, 128, 8%)',
        'sender-message': '#ffb398',
        'buddy-message': '#e9e7e6',
        blobs: 'rgba(255, 118, 80, 8%)',
        'primary-black': '#000000',
        'primary-white': '#FFFFFF',
      },
      transitionProperty: {
        height: 'height',
      },
      screens: {
        xxs: '360px',
        xs: '375px',
        sm: '412px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1536px',
        '4xl': '1920px',
        '5xl': '2560px',
        '6xl': '3440px',
      },
    },
  },
  safelist: [
    '!duration-0',
    '!delay-0',
    'html.js :where([class*="taos:"]:not(.taos-init))',
  ],
  plugins: [
    require('@tailwindcss/forms')({ strategy: 'class' }),
    require('taos/plugin'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',

          'scrollbar-width': 'none',

          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};
