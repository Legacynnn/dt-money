/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        white: '#FFFFFF',
        gray: {
          100: '#E1E1E6',
          300: '#C4C4CC',
          400: '#8D8D99',
          500: '#7C7C8A',
          600: '#323238',
          700: '#29292E',
          800: '#202024',
          900: '#121214',
        },
        green: {
          300: '#00B37E',
          500: '#00875F',
          700: '#015F43',
        },
        red: {
          500: '#F75A68',
          700: '#AA2834',
        },
      },
    },
  },
  plugins: [
    // Initialize with default values (see options below)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('tailwindcss-radix')(),
  ],
}
