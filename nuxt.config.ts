// import { defineNuxtConfig } from 'nuxt'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
        shim: false
    },
    modules: ['@pinia/nuxt'],
    build: {
        transpile:
          process.env.NODE_ENV === 'production'
            ? [
                'naive-ui',
                'vueuc',
                '@css-render/vue3-ssr',
                '@juggle/resize-observer'
              ]
            : ['@juggle/resize-observer']
    },
    vite: {
        optimizeDeps: {
          include:
            process.env.NODE_ENV === 'development'
              ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
              : []
        }
    }

})
