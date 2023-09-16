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
      fredericka: ['Fredericka the Great', 'cursive'], // unused
      tenor: ['Tenor Sans', 'sans-serif'], // unused
      monserrat: ['Montserrat', 'sans-serif'], // unused
      cormo: ['Cormorant', 'serif'], // unused
      clicker: ['Clicker Script', 'cursive'], // unused
      poppins: ['Poppins', 'sans-serif'], // unused
      abril: ['Abril Fatface', 'cursive'], // unused
      serif: ['DM Serif Display', 'serif'], // unused
      jo: ['Josefin Sans', 'sans-serif'], // unused
      po: ['Poiret One', 'cursive'], // unused
      ultra: ['Ultra', 'serif'], // unused
      fed: ['Federo', 'sans - serif'], // unused
      archivo: ['archivo Black', 'monospace'], // unused
      cutive: ['Cutive Mono', 'monospace'], // unused
      dm: ['DM Mono', 'monospace'], // unused
      pt: ['PT Mono', 'monospace'], // unused
      hat: ['Red Hat Mono', 'monospace'], // unused
      roboto: ['Roboto Mono', 'monospce'], // unused
      inso: ['Inconsolata', 'monospace'], // unused
      jost: ['Jost', 'monospace'], // the only font we use apparently
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
      custom: ['custom-clip-path'],
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
        short: { raw: '(max-height: 768px) and (min-width: 1440px)' },
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
