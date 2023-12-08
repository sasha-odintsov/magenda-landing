/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "montserrat": ["Montserrat", "sans-serif"],
      },
      colors: {
        "blue-main": "#2B579A",
        "blue-light": "#F5F9FF",
        "gray": "#7D7D7D",
        "gray-100": "#E0E0E0"
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
}

