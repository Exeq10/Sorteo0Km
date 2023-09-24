/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,jsx,tx}"],
  theme: {
    extend: {


      colors: 


{
        
        'principal': '#007DB4'
      }
    },



    fontFamily : {

      'poppins': 'Poppins', 
    }
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

