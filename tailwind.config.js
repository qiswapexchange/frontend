/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const { maxWidth } = require('tailwindcss/defaultTheme');
/**
 * 颜色配置说明
 * main：主色
 * inverse：反色
 * assist：辅助色
 */
module.exports = {
  theme: {
    extend: {
      spacing: {
        72: '18rem',
        80: '20rem',
      },
      colors: {
        dark: {
          'main-100': '#000000',
          'main-200': '#181818',
          'main-300': '#1e1e1e',
          'main-400': '#272727',

          'assist-100': '#093DD1',
          'assist-200': '#2E62F6',
          'assist-300': '#3164F4',
          'assist-400': '#e9effd',

          'inverse-100': '#fff',
          'inverse-200': '#ccc',
          'inverse-300': '#aaa',
          'inverse-400': '#999',
          'inverse-500': '#686868',
        },
        light: {},
      },
      height: {
        xl: '90vh',
      },
      maxHeight: maxWidth,
      minHeight: maxWidth,
    },
  },
  variants: {
    rotate: ['responsive', 'hover', 'group-hover'],
    margin: ['responsive', 'hover', 'focus', 'first', 'last'],
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
    options: {
      whitelistPatterns: [/dark/, /light/],
    },
  },
};
