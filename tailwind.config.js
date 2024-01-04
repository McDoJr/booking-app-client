/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '414px'
      },
      colors: {
        primary: '#F2AF5C',
        'primary-light': '#ffd199'
      },
      fontFamily: {
        heading: "Kaushan Script",
        body: "Open Sans",
        consolas: 'Consolas',
        rubik: 'Rubik'
      },
      backgroundImage: {
        home: "url('./assets/home.png')",
        reservation: "url('./assets/reservation_bg.jpg')",
        reserve: "url('./assets/reserve.jpg')"
      }
    },
  },
  plugins: [],
}


