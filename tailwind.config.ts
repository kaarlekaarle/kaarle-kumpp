import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F4F4F4",
        ink: "#111111",
        accent: "#1F37FF"
      },
      fontFamily: { sans: ["ui-sans-serif","system-ui","Arial"] },
      container: { center: true, padding: "1rem" }
    }
  },
  plugins: []
};
export default config;
