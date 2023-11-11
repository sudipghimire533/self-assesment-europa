/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#F1F4ED',
        primarydark: '#738E50',
      }
    }
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('hovcus', ['&:hover', '&:focus', '&.active'])
    })
  ],
}

