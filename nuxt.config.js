import messages from './locales';

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head() {
    return {
      title: 'Qiswap',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: this.$t('common.description'),
        },
      ],
      link: [{ rel: 'icon', href: '/favicon.svg' }],
    };
  },
  loading: '~/components/loading.vue',
  /*
   ** Global CSS
   */
  css: ['animate.css/animate.css', 'aos/dist/aos.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/vue.js',
    { src: '~/plugins/aos.js', ssr: false },
  ],
  extendPlugins(plugins) {
    const pluginIndex = plugins.findIndex((src) => src === '~/plugins/i18n.js');
    const shouldBeFirstPlugin = plugins[pluginIndex];
    plugins.splice(pluginIndex, 1);
    plugins.unshift(shouldBeFirstPlugin);
    return plugins;
  },
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: [
    '~/components',
    { path: '~/components/header/', prefix: 'header' },
    { path: '~/components/icon/', prefix: 'icon' },
    { path: '~/components/home/', prefix: 'home' },
    { path: '~/components/swap/', prefix: 'swap' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-i18n',
    ['vue-scrollto/nuxt', { duration: 600, easing: 'ease-out' }],
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    browserBaseURL: '/',
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    babel: {
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
      ],
    },
    transpile: [/vue-particles/],
  },
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
      },
      {
        code: 'es',
        iso: 'es-ES',
        name: 'Spanish',
      },
      {
        code: 'zh',
        iso: 'zh-CN',
        name: '中文',
      },
    ],
    defaultLocale: 'en',
    strategy: 'prefix',
    vueI18n: {
      fallbackLocale: 'en',
      messages,
    },
    detectBrowserLanguage: {
      useCookie: true,
      // alwaysRedirect: true,
    },
    seo: true,
  },
  server: {
    host: '0.0.0.0',
    port: 3300,
  },
};
