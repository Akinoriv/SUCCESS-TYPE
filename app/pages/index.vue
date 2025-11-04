<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
    <div class="max-w-4xl mx-auto px-4 py-20 text-center">
      <!-- Logo/Brand -->
      <div class="mb-12">
        <h1 class="text-5xl md:text-7xl font-black text-white mb-4">
          Энерготипинг
        </h1>
        <p class="text-xl text-white/80">
          Узнай, как ты работаешь на самом деле
        </p>
      </div>

      <!-- Available Landings -->
      <div class="grid md:grid-cols-2 gap-6 mb-12">
        <!-- Courses Landing -->
        <NuxtLink
          to="/courses"
          class="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105"
        >
          <div class="text-5xl mb-4">📚</div>
          <h2 class="text-2xl font-bold text-white mb-2">
            Для тех, кто бросает курсы
          </h2>
          <p class="text-white/70 mb-4">
            "Купил курс за 20к, прошёл 3 урока, бросил. Чувствуешь вину?"
          </p>
          <span class="inline-block bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-semibold group-hover:bg-yellow-300 transition-colors">
            Пройти тест →
          </span>
        </NuxtLink>

        <!-- Coming Soon: Career Landing -->
        <div class="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 opacity-50 cursor-not-allowed">
          <div class="text-5xl mb-4">💼</div>
          <h2 class="text-2xl font-bold text-white mb-2">
            Для тех, кто ищет призвание
          </h2>
          <p class="text-white/70 mb-4">
            "Прошёл курс, работа не получилась. Может, не твоя профессия?"
          </p>
          <span class="inline-block bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold">
            Скоро...
          </span>
        </div>
      </div>

      <!-- Info Block -->
      <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-white/80 text-sm max-w-2xl mx-auto">
        <p class="mb-2">
          <strong class="text-white">Энерготипинг</strong> — это тест для самопознания и повышения продуктивности
        </p>
        <p class="text-white/60 text-xs">
          5 минут • 12 вопросов • Бесплатно • Результат сразу
        </p>
      </div>

      <!-- Footer Links -->
      <div class="mt-12 flex flex-wrap justify-center gap-6 text-white/50 text-sm">
        <NuxtLink to="/privacy" class="hover:text-white/80 transition-colors">
          Политика конфиденциальности
        </NuxtLink>
        <NuxtLink to="/terms" class="hover:text-white/80 transition-colors">
          Условия использования
        </NuxtLink>
        <NuxtLink to="/disclaimer" class="hover:text-white/80 transition-colors">
          Disclaimer
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Yandex Metrika tracking
onMounted(() => {
  if (process.client && window.ym) {
    ym(98611746, 'reachGoal', 'view_hub_landing')
  }
})

// SEO Meta tags
useHead({
  title: "Энерготипинг — Узнай, как ты работаешь на самом деле",
  meta: [
    {
      name: "description",
      content:
        "Бесплатный тест на определение энерготипа. 5 минут — и ты поймёшь, почему тебе сложно работать как все. Честные ответы без обвинений.",
    },
    {
      property: "og:title",
      content: "Энерготипинг — Тест для самопознания и продуктивности",
    },
    {
      property: "og:description",
      content:
        "Узнай свой энерготип за 5 минут. Бесплатно, результат сразу.",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
