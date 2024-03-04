/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'carbonx-green': "#C1F48F",
        "carbonx-dark-green": "#18AA00",
        'carbonx-khaki': "#93A768",
        'carbonx-light-green': "#dbf4be",
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/forms')],
  daisyui: {
    themes: [{
      'carbonx': {
        'primary': '#C1F48F',
        'primary-focus': '#A7E66F',
        'primary-content': '#000000',
        'secondary': '#93A768',

        'secondary-content': '#ffffff',
        'accent': '#37cdbe',

        'accent-content': '#ffffff',
        'neutral': '#3d4451',

        'neutral-content': '#ffffff',
        'base-100': '#ffffff',
        'base-200': '#f9fafb',
        'base-300': '#d1d5db',
        'base-content': '#1f2937',
        'info': '#2094f3',
        'success': '#009485',
        'warning': '#ff9900',
        'error': '#ff5724',
      }
    }]
  }
}

