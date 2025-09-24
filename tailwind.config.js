/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: { paper: "#F4F4F4", ink: "#111111", accent: "#1F37FF" },
      container: { center: true, padding: "1rem" },
      fontFamily: { sans: ["ui-sans-serif","system-ui","Arial"] },
    },
  },
  plugins: [],
};
