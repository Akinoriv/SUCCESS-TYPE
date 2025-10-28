<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Твой тип личности</h1>
        <p class="text-lg text-gray-600">Результат теста готов!</p>
      </div>

      <!-- Result Content -->
      <div v-if="result" class="max-w-4xl mx-auto">
        <!-- Result Card -->
        <div class="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div class="text-center mb-6">
            <div class="text-6xl mb-4">{{ result.emoji }}</div>
            <h2 class="text-3xl font-bold text-gray-900 mb-2">
              {{ result.title }}
            </h2>
            <p class="text-lg text-gray-600">{{ result.description }}</p>
          </div>

          <!-- Strengths -->
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              🌟 Твои суперсилы:
            </h3>
            <ul class="space-y-2">
              <li
                v-for="strength in result.strengths"
                :key="strength"
                class="flex items-center"
              >
                <span class="text-green-500 mr-2">✓</span>
                <span>{{ strength }}</span>
              </li>
            </ul>
          </div>

          <!-- Weaknesses -->
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              ⚠️ Слабые стороны:
            </h3>
            <ul class="space-y-2">
              <li
                v-for="weakness in result.weaknesses"
                :key="weakness"
                class="flex items-center"
              >
                <span class="text-orange-500 mr-2">•</span>
                <span>{{ weakness }}</span>
              </li>
            </ul>
          </div>

          <!-- Recommendations -->
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              💡 Рекомендации:
            </h3>
            <ul class="space-y-2">
              <li
                v-for="recommendation in result.recommendations"
                :key="recommendation"
                class="flex items-start"
              >
                <span class="text-blue-500 mr-2 mt-1">→</span>
                <span>{{ recommendation }}</span>
              </li>
            </ul>
          </div>

          <!-- Careers -->
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">
              💼 Подходящие профессии:
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="career in result.careers"
                :key="career"
                class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {{ career }}
              </span>
            </div>
          </div>

          <!-- Income Info -->
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 class="font-semibold text-gray-900 mb-2">
              💰 Потенциальный доход:
            </h4>
            <p class="text-gray-700">{{ result.income }}</p>
            <p class="text-sm text-gray-500 mt-1">{{ result.timeline }}</p>
          </div>
        </div>

        <!-- Extended Report Section (Placeholder) -->
        <div
          class="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg shadow-lg p-8 mb-6"
        >
          <div class="text-center mb-6">
            <div class="text-5xl mb-4">📚</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">
              Получить ещё больше результатов
            </h3>
            <p class="text-gray-700 mb-4">
              Расширенный отчёт включает детальный анализ и персональные
              рекомендации
            </p>
          </div>

          <!-- Placeholder Content Area -->
          <div class="bg-white rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
            <div class="prose prose-sm max-w-none">
              <h4 class="text-xl font-semibold text-gray-900 mb-4">
                В расширенном отчёте вы получите:
              </h4>

              <div class="space-y-4 text-gray-700">
                <div class="flex items-start">
                  <span class="text-green-500 mr-3 text-xl">✓</span>
                  <div>
                    <h5 class="font-semibold mb-1">
                      Детальный анализ вашего типа личности
                    </h5>
                    <p class="text-sm">
                      Углублённое понимание ваших сильных и слабых сторон с
                      конкретными примерами из жизни
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <span class="text-green-500 mr-3 text-xl">✓</span>
                  <div>
                    <h5 class="font-semibold mb-1">
                      Персональный план развития
                    </h5>
                    <p class="text-sm">
                      Пошаговая стратегия работы над собой с учётом вашего типа
                      и текущей ситуации
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <span class="text-green-500 mr-3 text-xl">✓</span>
                  <div>
                    <h5 class="font-semibold mb-1">
                      Совместимость с другими типами
                    </h5>
                    <p class="text-sm">
                      Как эффективно взаимодействовать с людьми разных типов в
                      работе и жизни
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <span class="text-green-500 mr-3 text-xl">✓</span>
                  <div>
                    <h5 class="font-semibold mb-1">Карьерные траектории</h5>
                    <p class="text-sm">
                      Детальный разбор профессий с анализом подходящих ниш и
                      направлений развития
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <span class="text-green-500 mr-3 text-xl">✓</span>
                  <div>
                    <h5 class="font-semibold mb-1">Стратегии монетизации</h5>
                    <p class="text-sm">
                      Конкретные способы заработка, которые максимально подходят
                      вашему типу
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <span class="text-green-500 mr-3 text-xl">✓</span>
                  <div>
                    <h5 class="font-semibold mb-1">Работа с ограничениями</h5>
                    <p class="text-sm">
                      Практические техники преодоления типичных для вашего типа
                      сложностей
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <span class="text-green-500 mr-3 text-xl">✓</span>
                  <div>
                    <h5 class="font-semibold mb-1">Примеры успешных людей</h5>
                    <p class="text-sm">
                      Истории известных личностей с вашим типом и их путь к
                      успеху
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <span class="text-green-500 mr-3 text-xl">✓</span>
                  <div>
                    <h5 class="font-semibold mb-1">Рекомендации по обучению</h5>
                    <p class="text-sm">
                      Курсы, книги и материалы, которые помогут вам развиваться
                      эффективнее
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded"
              >
                <p class="text-sm text-gray-700">
                  <strong>Примечание:</strong> Функция получения расширенного
                  отчёта находится в разработке. Скоро вы сможете получить
                  полный доступ ко всем материалам!
                </p>
              </div>
            </div>
          </div>

          <!-- CTA Button (Disabled for now) -->
          <button
            disabled
            class="w-full bg-gray-400 text-white font-semibold py-4 px-8 rounded-lg text-lg cursor-not-allowed opacity-60"
          >
            Скоро будет доступно
          </button>
        </div>

        <!-- Actions -->
        <div class="text-center space-y-4">
          <button
            @click="shareResult"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Поделиться результатом
          </button>

          <button
            @click="retakeQuiz"
            class="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Пройти тест заново
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else-if="loading" class="text-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
        ></div>
        <p class="text-gray-600">Загружаем результат...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-red-500 text-xl mb-4">⚠️</div>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button
          @click="retry"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Попробовать снова
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Route
const route = useRoute();

// State
const resultId = computed(() => route.query.id);
const error = ref("");

// Load result data
const {
  data: result,
  pending: loading,
  error: fetchError,
  refresh,
} = await useLazyFetch(`/api/results/${resultId.value}`, {
  key: `result-${resultId.value}`,
  transform: (response) => {
    if (!response.success) {
      throw new Error(response.statusMessage || "Ошибка загрузки результата");
    }

    const resultData = response.data.resultData;
    return {
      id: response.data.id,
      resultType: response.data.resultType,
      ...resultData,
    };
  },
});

// Handle errors
watch(fetchError, (err) => {
  if (err) {
    error.value = "Ошибка при загрузке результата";
    console.error("Error loading result:", err);
  }
});

const shareResult = () => {
  if (navigator.share) {
    navigator.share({
      title: "Мой тип личности",
      text: `Я прошёл тест и узнал, что я ${result.value?.title}`,
      url: window.location.href,
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href);
    alert("Ссылка скопирована в буфер обмена");
  }
};

const retakeQuiz = async () => {
  // Clear session data
  if (process.client) {
    sessionStorage.removeItem("quizSessionId");
    sessionStorage.removeItem("quizUserId");
  }

  // Navigate to onboarding
  await navigateTo("/quiz/onboarding");
};

const retry = () => {
  error.value = "";
  // Refresh the data
  refresh();
};
</script>
