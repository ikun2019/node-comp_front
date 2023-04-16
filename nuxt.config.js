export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'front',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/css/main.css' },
      { rel: 'stylesheet', href: '/css/product.css' },
      { rel: 'stylesheet', href: '/css/forms.css' },
      { rel: 'stylesheet', href: '/css/cart.css' },
      { rel: 'stylesheet', href: '/css/auth.css' }

    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // proxy: true,
    baseURL: 'http://localhost:3000',
    credentials: true
  },
  proxy: {
    '/api': 'http://localhost:3000'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-pdf']
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'new-password',
        path: '/auth/:token',
        component: resolve(__dirname, 'pages/auth/_token.vue')
      })
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            propertyName: 'token',
            url: '/api/auth/login'
          },
          logout: {
            url: '/api/auth/logout',
            method: 'post'
          }
        }
      }
    }
  }
}
