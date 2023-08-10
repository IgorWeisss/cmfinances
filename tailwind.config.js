/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        'gray-100': '#DDDDDD',
        'gray-600': '#4D4D4D',
        'zinc-900': '#1C1F23',
        'red-500': '#E92929',
        'orange-500': '#F97316',
        'orange-600': '#C2410C',
        'yellow-500': '#EAB308',
        'green-500': '#49AA26',
        'lime-500': '#22C55E',
        'lime-600': '#15803D',
        'emerald-500': '#009975',
        'cyan-500': '#06B6D4',
        'cyan-600': '#0E7490',
        'blue-800': '#1A2B40',
        'blue-900': '#112238',
        'purple-500': '#A855F7',
        'purple-600': '#7E22CE',
      },
      boxShadow: {
        'entry-box': '0 15px 20px rgba(0, 0, 0, 0.5)',
        'filter-box': '0 0 8px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
