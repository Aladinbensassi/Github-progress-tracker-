/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      colors: {
        "primary-light": "#151515",
        "shade2-light": "#515151",
        "shade3-light": "#D1D1D1",
        "shade4-light": "#EEE",
        "shade5-light": "#FFF",
        "error-light": "#D62617",
        "primary-dark": "#F2F2F2",
        "shade2-dark": "#B0B0B0",
        "shade3-dark": "#383838",
        "shade4-dark": "#222222",
        "shade5-dark": "#151515",
        "error-dark": "#E75B4F"
      },
    },
  },
  plugins: [],
}