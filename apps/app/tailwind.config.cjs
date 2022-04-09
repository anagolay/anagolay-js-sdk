const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/forms'),
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
    // themes: [
    //   {
    //     anagolay: {
    //       primary: '#054F77',
    //       secondary: '#093954',
    //       accent: '#8CFF00',
    //       neutral: '#052233',
    //       'base-100': '#2D3B43',
    //       info: '#3ABFF8',
    //       success: '#36D399',
    //       warning: '#FBBD23',
    //       error: '#F87272',
    //     },
    //   },
    // ],
  },

  theme: {
    extend: {},
    fontFamily: {
      sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
    },
  },
};
