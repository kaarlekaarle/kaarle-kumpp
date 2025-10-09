/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        paper: "#f5f3f0", 
        ink: "#111111", 
        accent: "#1F37FF" 
      },
      container: { 
        center: true, 
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1400px",
        }
      },
          fontFamily: { 
            // Prefer serif as fallback everywhere to ensure glyph coverage
            sans: ["var(--font-sans)", "var(--font-serif)", "Georgia", "serif"],
            heading: ["var(--font-sans)", "var(--font-serif)", "Georgia", "serif"],
            serif: ["var(--font-serif)", "Georgia", "serif"]
          },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
