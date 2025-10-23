// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@pinia/nuxt", "@nuxtjs/tailwindcss"],

  // css: ["~/assets/css/main.css"], // Временно отключено

  runtimeConfig: {
    // Private keys (only available on server-side)
    yookassaShopId: process.env.YOOKASSA_SHOP_ID,
    yookassaSecretKey: process.env.YOOKASSA_SECRET_KEY,

    // Public keys (exposed to client-side)
    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL || "http://localhost:3000",
      yandexMetrikaId: process.env.YANDEX_METRIKA_ID,
    },
  },

  nitro: {
    experimental: {
      wasm: true,
    },
  },
});
