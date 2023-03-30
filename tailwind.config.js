/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // tailwindcss conflict https://github.com/element-plus/element-plus/issues/5693
    // see also https://github.com/tailwindlabs/tailwindcss/issues/6602
    preflight: false,
  },
}
