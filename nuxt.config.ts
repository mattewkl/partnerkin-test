// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    [
      'nuxt-openapi-docs-module',
      {
        folder: './docs/openapi',
        name: 'OpenApiDocs',
        files: function() {
          return { 
            'api': 'Tasks API'
          }
        },
        tags: ['Tasks', 'Users'],
        debug: true,
        list: true,
        ui: {
          title: 'Tasks API Documentation',
          primaryColor: '#4F46E5',
          tagGroups: [
            {
              name: 'Core',
              tags: ['Tasks', 'Users']
            }
          ]
        }
      }
    ]
  ],
  css: ['~/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/vars.scss";'
        }
      }
    }
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/partnerkin-test/' // Замените на имя вашего репозитория
  }
})
