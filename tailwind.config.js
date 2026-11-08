/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F4EE',
        sand: '#E8DDCC',
        taupe: {
          light: '#C8B093',
          DEFAULT: '#B79B79',
          dark: '#8C6F4F',
        },
        charcoal: {
          DEFAULT: '#292722',
          deep: '#1C1B18',
          light: '#3D3B35',
        },
        softgrey: '#88847D',
        warmwhite: '#FFFFFF',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 4px 20px -2px rgba(41, 39, 34, 0.05)',
        'luxury': '0 20px 40px -15px rgba(41, 39, 34, 0.08)',
        'elevated': '0 30px 60px -12px rgba(41, 39, 34, 0.12)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      }
    },
  },
  plugins: [],
}
