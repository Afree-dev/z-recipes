/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './pages/*.html',
    './assets/js/*.js',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        md: '1.5rem',
        lg: '2rem',
      },
    },
    extend: {
      colors: {
        'primary': '#E1410D',
        'siteBlack': '#100e09',
        'siteWhite': '#f0f0e7',
      },
      fontFamily: {
        poppinsbold: ['poppinsbold'],
        poppinssemibold: ['poppinssemibold'],
        poppinsregular: ['poppinsregular'],
        poppinsthin: ['poppinsthin']
      }
    },
  },
  plugins: [],
}

