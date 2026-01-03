// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 純前端 SPA（CSR）
  ssr: false,

  // 產生靜態站點（給 Netlify 用）
  nitro: {
    preset: 'static'
  },

  /**
   * 🔑 Supabase runtimeConfig
   * ❗不要在這裡填值
   * ❗值由 .env / Netlify Environment Variables 提供
   */
  runtimeConfig: {
    public: {
      supabaseUrl: '',
      supabaseAnonKey: ''
    }
  },

  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/'
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint'
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
