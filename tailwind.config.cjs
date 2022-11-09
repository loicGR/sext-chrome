const colors =  require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,ts,vue,html}"],
  theme: {
    colors: {
      s_green: '#74cebc',
      s_blue: '#83c0e6',
      s_orange: '#ef9b6c',
      s_red: '#f26b76',
      s_black: '#062b33',
      sbg_green: '#e7f8f6',
      sbg_blue: '#f1f7ff',
      sbg_orange: '#fff3e0',
      sbg_red: '#fdf4f6',
      sbg_black: '#f1f7ff',
    },
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
    },
    extend: {
      colors
    },
  },
  plugins: [],
}
