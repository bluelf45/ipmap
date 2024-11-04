/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mobile': '375px',
      // => @media (min-width: 640px) { ... }

      'desktop': '1440px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      backgroundImage: {
        'desktop': "url('../src/assets/images/pattern-bg-desktop.png')",
        'mobile': "url('../public/images/hero.jpg')",
      },
    },
  },
  plugins: [],
}

