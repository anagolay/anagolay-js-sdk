module.exports = {
  plugins: [
    process.env.NODE_ENV === 'production' ? null : require('postcss-import'),
    require('@tailwindcss/typography'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer')
  ]
};
