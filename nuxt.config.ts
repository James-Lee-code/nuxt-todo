// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  nitro: {
    preset: 'static'
  },

  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/'
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  css: ['~/assets/css/main.css'],

  devtools: {
    enabled: true
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
