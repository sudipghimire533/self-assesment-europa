/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#0F2960',
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

