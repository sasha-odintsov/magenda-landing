/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "montserrat": ["Montserrat", "sans-serif"],
      },
      colors: {
        "blue": {
          "main": "#2B579A",
          "dark": "#173D77",
          "light": "#F5F9FF",
          "contrast": "#5E7ED3",
        },
        "gray": {
          DEFAULT: "#7D7D7D",
          100: "#E0E0E0",
        },
      },
      boxShadow: {
        "around": "0px 0px 15px 5px rgba(43,87,154,0.1);"
      }
    },
  },
  plugins: [],
}

