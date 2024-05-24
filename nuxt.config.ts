// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Pollster survey'
    }
  },
  devtools: { enabled: true },
  ssr:false,
  runtimeConfig: {
    public: {
      pocketBaseURL: process.env.VITE_POCKETBASE_URL,
    },
  },

  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    exposeConfig: true,
    viewer:true,
  }
})