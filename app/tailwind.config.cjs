const defaultTheme = require('tailwindcss/defaultTheme');
const { '[data-theme=dark]': darkTheme } = require('daisyui/src/colors/themes');

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/forms'), // enabling this will mess up the daisyUI styles
    require('daisyui'),
  ],
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
    themes: [
      {
        dark: darkTheme,
      },
    ],
  },

  theme: {
    extend: {
      backgroundImage: {
        hero: "url('https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80')",
      },
    },
    fontFamily: {
      sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
    },
  },
};
