/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-agrandir-wide)", ...defaultTheme.fontFamily.sans],
        heading: ["var(--font-agrandir)", ...defaultTheme.fontFamily.sans],
        body: ["var(--font-beatrice)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
