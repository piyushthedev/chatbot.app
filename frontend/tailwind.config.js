/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#111111",
        primary: "#ff3333",
        secondary: "#ffffff",
      },
    },
  },
  plugins: [],
}
