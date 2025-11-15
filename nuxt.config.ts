// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: process.env.NODE_ENV !== "production" },

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
    // Убираем prerender для production - он конфликтует с SSR
    // prerender: {
    //   crawlLinks: true,
    //   routes: ["/"],
    // },
    // Настройки для правильной работы статических файлов
    compressPublicAssets: true,
    // Правильная настройка для Railway
    preset: "node-server",
  },

  routeRules: {
    // Главная страница - кэшировать на 1 час
    "/": { swr: 3600 },
    // API - не кэшировать
    "/api/**": { cache: false },
    // Статические страницы - кэшировать на 1 день
    "/privacy": { swr: 86400 },
    "/terms": { swr: 86400 },
    "/disclaimer": { swr: 86400 },
    // Quiz страницы - SSR без кэша
    "/quiz/**": { ssr: true, cache: false },
  },

  experimental: {
    payloadExtraction: false,
    renderJsonPayloads: false,
  },

  // Настройки для production
  ssr: true,
  sourcemap: {
    server: false,
    client: false,
  },
});
