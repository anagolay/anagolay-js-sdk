const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    // require('@tailwindcss/forms'), // enabling this will mess up the daisyUI styles
    require('daisyui')
  ],
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: '',
    darkTheme: 'anagolay',
    themes: [
      'dark',
      {
        anagolay: {
          primary: '#23ACF6',
          secondary: '#F2FF40',
          accent: '#36D399',
          neutral: '#191D24',
          'base-100': '#2A303C',
          info: '#00cef7',
          success: '#8CFF00', // switch with accent
          warning: '#FBBD23',
          error: '#F87272'
        }
      }
    ]
  },

  theme: {
    extend: {
      colors: {}
    },
    fontFamily: {
      mono: ['Fira Mono', ...defaultTheme.fontFamily.mono]
    }
  }
};
