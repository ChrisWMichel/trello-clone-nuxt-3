// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/vello.css', '~/assets/css/main.css'], 
  modules: ['@pinia/nuxt', "@nuxt/ui",  '@vueuse/nuxt', '@nuxtjs/tailwindcss'],
  colorMode: {
    preference: 'system',
    fallback: 'light',
  },
  //ssr: false,
})