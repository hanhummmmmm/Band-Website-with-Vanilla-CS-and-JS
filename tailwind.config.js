const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': 'Lato, sans-serif',
      'serif': 'Roboto\ Slab, serif',
      'cursive': 'Caveat, cursive'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      pink: '#a28e92',
      gray: colors.coolGray,
      purple: {
        light: '#685665',
        DEFAULT: '#3c3c50',
        dark: '#372e46',
      }

    },
    extend: {
      backgroundImage: theme => ({
        'header': "url('images/header-background.jpg')",
       })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    
  ],
}
