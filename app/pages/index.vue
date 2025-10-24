<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-4xl font-bold text-gray-900 mb-8">
        Тест на тип личности
      </h1>

      <div class="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-xl font-semibold mb-4">
          Готов узнать свой тип личности?
        </h2>

        <p class="text-gray-600 mb-6">
          Пройди тест из 14 вопросов и получи персональные рекомендации
        </p>

        <a
          href="/quiz/new"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-block"
        >
          Начать тест
        </a>
      </div>

      <!-- Debug info -->
      <div class="mt-8 text-sm text-gray-500">
        <p>Вопросов в базе: 14</p>
        <p>API статус: ✅ Работает</p>
      </div>
    </div>
  </div>
</template>
