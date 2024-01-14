/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cgrey: '#4C5260',
        clightergrey: '#9CA3A3',
        cred: '#EF3B23',
        cpalered: '#EE8686',
        clightestgrey: '#F2F2F2',
        cdarkergrey: '#3B4658',
        cmidgrey: '#F7F6F4',
        csomegrey: '#F7F6F4',
        csomegrey2: {
          1: '#5B5E5F',
          2: '#A8AEAE'
        },
        cgreen: {
          1: '#92B682'
        },
        csomered: {
          1: '#EE8686'
        }
      },
      fontFamily: {
        grtskmegabold: ['GrtskMegaBold', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        inder: ['Inder', 'sans-serif']
      }
    },
  },
  plugins: [],
}