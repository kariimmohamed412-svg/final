/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#09090b',
          card: '#121214',
          border: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(0, 245, 160, 0.15)',
        },
        mint: {
          DEFAULT: '#00f5a0',
          hover: '#00d68c',
          glow: 'rgba(0, 245, 160, 0.25)',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}

