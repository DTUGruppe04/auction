const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
      flowbite.content(),
  ],
  theme: {
    extend: {
      screens: {
        '2k-height': { 'raw': '(min-height: 1220px)' },
      },
    },
  },
  plugins: [
    flowbite.plugin()
  ],
}

