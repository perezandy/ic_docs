/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    
    extend: {
      colors: {
      'primary' : '#ef4444',      // controls the main red color for the sidebar and other menus (default: #ef4444)
      'secondary' : '#f3f4f6',    // controls the subtle gray background seen everywhere (default: #f3f4f6 )
      'tertiary' : '#6b7280',    // controls the darker gray box labels, etc... as seen in the home page (default: #6b7280)
      'accent' : '#e5e7eb',       // controls the background for the divs in the homepage, under "getting Started", for example (default:#e5e7eb)
      },  
    },

    fontFamily:{
      'custom' : 'mono' // Controls everything basically. I don't know how to add a custom font, but know it is possible - just need to include it in app.component.css
    },
    

    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}

