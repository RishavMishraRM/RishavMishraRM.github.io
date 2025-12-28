/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.{html,md}",
    "./themes/hugoplate/layouts/**/*.html",
    "./themes/hugoplate/content/**/*.{html,md}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0b0b0b",
        light: "#ffffff",
        primary: "#2563eb",
        secondary: "#1e1e1e",
        accent: "#a855f7",
        surface: "#111111",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
