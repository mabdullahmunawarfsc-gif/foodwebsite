/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF5F0',
          100: '#FFE8DB',
          200: '#FFD1B8',
          300: '#FFB08A',
          400: '#FF8A5C',
          500: '#FF6B35',
          600: '#E85D2A',
          700: '#C44D22',
          800: '#9A3D1C',
          900: '#7A3218',
        },
        cream: '#FFF9F5',
        charcoal: '#1A1A2E',
        gold: {
          400: '#F5C518',
          500: '#E8B800',
          600: '#CCA300',
        },
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
        'lift': '0 12px 40px -12px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
    },
  },
  plugins: [],
}
