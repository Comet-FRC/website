/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: { 
          DEFAULT: '#4E3E78', 
          50: '#FBFBFD',
          100: '#E7E3F1',
          200: '#BEB4D8',
          300: '#9585C0',
          400: '#6D56A7',
          500: '#4E3E78',
          600: '#3F3260',
          700: '#2F2649',
          800: '#201A31',
          900: '#110D1A',
          950: '#09070E'
        },
        secondary: {
          DEFAULT: '#7AC6BB',
          50: '#FBFDFD',
          100: '#ECF7F5',
          200: '#D0EBE7',
          300: '#B3DED8',
          400: '#97D2CA',
          500: '#7AC6BB',
          600: '#4CB2A3',
          700: '#388378',
          800: '#24554E',
          900: '#102623',
          950: '#060F0E'
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        'dark-neutral': {
          DEFAULT: '#1A1A1A',
          50: '#F4F4F4',
          100: '#DCDCDC',
          200: '#ABABAB',
          300: '#7B7B7B',
          400: '#4A4A4A',
          500: '#1A1A1A',
          600: '#151515',
          700: '#101010',
          800: '#0B0B0B',
          900: '#060606',
          950: '#030303'
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Source Sans Pro"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};