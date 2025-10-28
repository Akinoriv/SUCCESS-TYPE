<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-2xl font-bold text-gray-900">
            Энерготипинг
          </NuxtLink>
          <NuxtLink
            to="/"
            class="text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← На главную
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="container mx-auto px-4 py-12">
      <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-8">
          Отказ от ответственности
        </h1>

        <div class="prose prose-gray max-w-none">
          <p class="text-sm text-gray-500 mb-8">
            Последнее обновление:
            {{
              new Date().toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            }}
          </p>

          <div class="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
            <h2 class="text-xl font-bold text-red-900 mb-3">
              ⚠️ Важное предупреждение
            </h2>
            <p class="text-red-800 font-medium">
              Данный тест НЕ является медицинским, психологическим или научным
              диагностическим инструментом. Результаты теста не должны
              использоваться для принятия медицинских решений или замены
              профессиональной помощи.
            </p>
          </div>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              1. Общий отказ от ответственности
            </h2>
            <p class="text-gray-700 mb-4">
              Сервис "Энерготипинг" предназначен исключительно для целей
              самопознания, развлечения и личностного роста. Все результаты и
              рекомендации носят информационный характер и не являются
              профессиональными консультациями.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              2. Не является медицинским советом
            </h2>
            <p class="text-gray-700 mb-4">
              Информация, предоставляемая Сервисом:
            </p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>НЕ заменяет консультацию врача или психолога</li>
              <li>НЕ должна использоваться для диагностики заболеваний</li>
              <li>НЕ является основанием для самолечения</li>
              <li>НЕ может использоваться для оценки психического здоровья</li>
            </ul>
            <p class="text-gray-700 mt-4">
              Если вы испытываете психологические трудности, обратитесь к
              квалифицированному специалисту.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              3. Не является научным тестом
            </h2>
            <p class="text-gray-700 mb-4">Данный тест:</p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>НЕ прошёл научную валидацию</li>
              <li>НЕ основан на рецензируемых исследованиях</li>
              <li>НЕ сертифицирован профессиональными организациями</li>
              <li>НЕ может использоваться в научных работах</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              4. Точность результатов
            </h2>
            <p class="text-gray-700 mb-4">Мы не гарантируем:</p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>Точность определения вашего типа</li>
              <li>Применимость рекомендаций к вашей ситуации</li>
              <li>Достижение обещанных результатов</li>
              <li>Соответствие описания вашей личности</li>
            </ul>
            <p class="text-gray-700 mt-4">
              Результаты основаны исключительно на ваших ответах и могут быть
              неточными или неполными.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              5. Профессиональные решения
            </h2>
            <p class="text-gray-700 mb-4">
              Результаты теста НЕ должны использоваться для:
            </p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>Принятия решений о приёме на работу</li>
              <li>Профессиональной оценки сотрудников</li>
              <li>Определения пригодности к профессии</li>
              <li>Любых юридически значимых решений</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              6. Финансовые решения
            </h2>
            <p class="text-gray-700">
              Любые упоминания о потенциальных доходах, зарплатах или финансовых
              возможностях носят исключительно информационный характер и не
              являются гарантией результатов. Ваши фактические результаты могут
              отличаться.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              7. Внешние ссылки
            </h2>
            <p class="text-gray-700">
              Сервис может содержать ссылки на внешние ресурсы. Мы не несём
              ответственности за содержание, точность или доступность этих
              ресурсов.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              8. Использование на свой риск
            </h2>
            <p class="text-gray-700">
              Используя Сервис, вы принимаете на себя полную ответственность за
              любые решения, принятые на основе результатов теста. Мы не несём
              ответственности за последствия использования информации,
              предоставленной Сервисом.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              9. Рекомендуем
            </h2>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                Воспринимайте результаты как повод для размышления, а не как
                абсолютную истину
              </li>
              <li>Обращайтесь к профессионалам для важных решений</li>
              <li>
                Используйте результаты в сочетании с другими источниками
                информации
              </li>
              <li>Помните, что вы лучше знаете себя, чем любой тест</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              10. Контакты
            </h2>
            <p class="text-gray-700">
              Если у вас есть вопросы об этом Отказе от ответственности:
            </p>
            <p class="text-gray-700 mt-2">
              Email:
              <a
                href="mailto:info@example.com"
                class="text-indigo-600 hover:underline"
              >
                info@example.com
              </a>
            </p>
          </section>

          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-8">
            <p class="text-sm text-gray-700">
              <strong>Важно:</strong> Данный Отказ от ответственности является
              примером и должен быть адаптирован под ваши конкретные
              бизнес-процессы и требования законодательства. Рекомендуем
              проконсультироваться с юристом перед публикацией.
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
useHead({
  title: "Отказ от ответственности — Энерготипинг",
  meta: [
    {
      name: "description",
      content:
        "Отказ от ответственности за использование сервиса Энерготипинг.",
    },
    {
      name: "robots",
      content: "noindex, follow",
    },
  ],
});
</script>
