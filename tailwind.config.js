/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '1600': '1600px',
        '1520': '1520px',
        '930':'930px',
        '580': '580px',
        'lg': '1025px',
        'md': '769px',
        'sm':'426px'
      },
      colors: {
        'custom': {
          'red': '#ff5600',
          'brown': '#3F2E20',
          'cream': '#f4ebdd',
          'green': '#79ca1c',
          'sky': '#76cdfc',
          'brown': '#3f2e20',
          'grey': '#b6c7cc',
          'yellow': '#ffcf00',
          'light-green': '#ccff71',
          'light-yellow': '#ffff23',
        }
      },
      backgroundImage: {
        'banner': "url('/assets/images/webp/banner-bg.webp')",
        'banner-mob': "url('/assets/images/webp/bg-mob.webp')",
        'staking-reward': "url(/assets/images/staking-reward.png)",
        'tokenomic-bg': "url(/assets/images/webp/tokenomic-bg.webp)",
      },
      minHeight: {
        'banner': '1100px',
      },
      dropShadow: {
        'multi-black': [
          '0px 0px 1px #000000',
          '0px 6px 0 #000000',
        ],
      },
      height: {
        'screen-minus-58': 'calc(100vh - 58px)',
      },
      animation: {
        'marquee': 'marquee 10s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-stroke': {
          '-webkit-text-stroke': '1px',
        },
        '.text-stroke-2': {
          '-webkit-text-stroke': '2px',
        },
        '.text-stroke-3': {
          '-webkit-text-stroke': '3px',
        },
        '.text-stroke-4': {
          '-webkit-text-stroke': '4px',
        },
        '.text-stroke-5': {
          '-webkit-text-stroke': '5px',
        },
        '.text-stroke-6': {
          '-webkit-text-stroke': '6px',
        },
        '.text-stroke-9': {
          '-webkit-text-stroke': '9px',
        },
        '.text-stroke-black': {
          '-webkit-text-stroke-color': 'black',
        },
        '.text-stroke-white': {
          '-webkit-text-stroke-color': 'white',
        },
        '.paint-order-stroke': {
          'paint-order': 'stroke fill',
        },
        '.drop-shadow': {
          'filter': 'drop-shadow(0px 0px 1px #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 0px 0 #000000) drop-shadow(0px 6px 0 #000000)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 