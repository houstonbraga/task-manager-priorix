/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        brand: {
          yellow: "#5d512d",
          green: "#3a5948",
        },
      },
    },
  },
  plugins: [],
}
