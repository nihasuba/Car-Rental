/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",      // include pages folder
    "./src/components/**/*.{js,jsx,ts,tsx}", // include components folder
    "./src/app/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors:{
        primary:'#2563EB',
        primarydull:'#1F58D8',
        light:'#F1F5F9',
        borderColor:'#c4c7d2'
      },
      fontFamily:{
        font:['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
