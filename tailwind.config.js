/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fall': 'fall 2s ease-in forwards',
        'pop': 'pop 0.3s ease-out forwards',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        fall: {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '1' },
        },
        pop: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(0)', opacity: '0' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '75%': { transform: 'translateX(10px)' },
        },
      },
    },
  },
  plugins: [],
}
