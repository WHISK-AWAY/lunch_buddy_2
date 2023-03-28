/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    transform: (content) => content.replace(/taos:/g, ''),
  },
  theme: {
    fontFamily: {
      fredericka: ['Fredericka the Great', 'cursive'],
      tenor: ['Tenor Sans', 'sans-serif'],
      monserrat: ['Montserrat', 'sans-serif'],
      cormo: ['Cormorant', 'serif'],
      clicker: ['Clicker Script', 'cursive'],
      poppins: ['Poppins', 'sans-serif'],
    },
    fontWeight: {
      thin: 100,
      xtralight: 200,
      light: 300,
      semibold: 600,
    },
    extend: {
      colors: {
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
        '3xl': '1900px',
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
    // ...
  ],
};
