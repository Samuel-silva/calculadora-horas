/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#05445e",
        secondary: "#189ab4",
        success: "#0E9F6E",
        danger: "#F05252",
        warning: "#FCE96A",
        info: "#3F83F8",
        light: "#FAFAFA",
        dark: "#333",
      }
    },
  },
  plugins: [],
}