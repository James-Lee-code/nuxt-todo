// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 明確指定：純前端 SPA（CSR）
  ssr: false,

  // Netlify / 靜態站點用
  nitro: {
    preset: 'static'
  },

  // 🔑 關鍵：Supabase 一定要在 runtimeConfig 宣告
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
