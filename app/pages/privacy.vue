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
          Политика конфиденциальности
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

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              1. Общие положения
            </h2>
            <p class="text-gray-700 mb-4">
              Настоящая Политика конфиденциальности описывает, какие данные мы
              собираем при использовании сервиса "Энерготипинг" (далее —
              "Сервис"), как мы их используем и защищаем.
            </p>
            <p class="text-gray-700">
              Используя наш Сервис, вы соглашаетесь с условиями данной Политики
              конфиденциальности.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              2. Какие данные мы собираем
            </h2>

            <h3 class="text-xl font-semibold text-gray-900 mb-3 mt-6">
              2.1. Данные, которые вы предоставляете
            </h3>
            <ul class="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>
                Базовая информация: пол и возраст (для персонализации вопросов)
              </li>
              <li>Ответы на вопросы теста</li>
              <li>
                Email (опционально, только если вы захотите получить результаты
                на почту)
              </li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-900 mb-3 mt-6">
              2.2. Технические данные
            </h3>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>IP-адрес (для предотвращения злоупотреблений)</li>
              <li>Информация о браузере и устройстве</li>
              <li>Дата и время прохождения теста</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              3. Как мы используем ваши данные
            </h2>
            <p class="text-gray-700 mb-4">
              Мы используем собранные данные исключительно для:
            </p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>Формирования персонализированного результата теста</li>
              <li>Улучшения качества Сервиса</li>
              <li>
                Анализа общей статистики использования (в обезличенном виде)
              </li>
              <li>Предотвращения злоупотреблений и мошенничества</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              4. Что мы НЕ делаем с вашими данными
            </h2>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>Не продаём ваши данные третьим лицам</li>
              <li>Не передаём данные рекламным сетям</li>
              <li>Не используем данные для таргетированной рекламы</li>
              <li>Не публикуем ваши личные данные без вашего согласия</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              5. Хранение данных
            </h2>
            <p class="text-gray-700 mb-4">
              Все данные хранятся на защищённых серверах. Мы применяем
              современные методы шифрования и защиты информации.
            </p>
            <p class="text-gray-700">
              Данные хранятся в течение периода, необходимого для выполнения
              целей, указанных в данной Политике, если более длительный срок не
              требуется законодательством.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              6. Ваши права
            </h2>
            <p class="text-gray-700 mb-4">Вы имеете право:</p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>Запросить копию ваших персональных данных</li>
              <li>Запросить исправление неточных данных</li>
              <li>Запросить удаление ваших данных</li>
              <li>Отозвать согласие на обработку данных</li>
            </ul>
            <p class="text-gray-700 mt-4">
              Для реализации этих прав свяжитесь с нами по адресу:
              <a
                href="mailto:nika.nika1711+info@gmail.com"
                class="text-indigo-600 hover:underline"
              >
                nika.nika1711+info@gmail.com
              </a>
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              7. Cookies и аналитика
            </h2>
            <p class="text-gray-700 mb-4">
              Мы используем минимальное количество cookies для обеспечения
              работы Сервиса и анализа его использования (Яндекс.Метрика).
            </p>
            <p class="text-gray-700">
              Вы можете отключить cookies в настройках браузера, но это может
              повлиять на функциональность Сервиса.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              8. Безопасность несовершеннолетних
            </h2>
            <p class="text-gray-700">
              Наш Сервис предназначен для лиц старше 18 лет. Мы сознательно не
              собираем данные от лиц младше 18 лет. Если вы являетесь родителем
              и обнаружили, что ваш ребёнок предоставил нам данные, свяжитесь с
              нами для их удаления.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              9. Изменения в Политике
            </h2>
            <p class="text-gray-700">
              Мы можем обновлять данную Политику конфиденциальности. О
              существенных изменениях мы уведомим вас путём размещения
              уведомления на сайте.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              10. Контакты
            </h2>
            <p class="text-gray-700">
              Если у вас есть вопросы о данной Политике конфиденциальности,
              свяжитесь с нами:
            </p>
            <p class="text-gray-700 mt-2">
              Email:
              <a
                href="mailto:nika.nika1711+info@gmail.com"
                class="text-indigo-600 hover:underline"
              >
                nika.nika1711+info@gmail.com
              </a>
            </p>
          </section>

          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-8">
            <p class="text-sm text-gray-700">
              <strong>Важно:</strong> Данная Политика конфиденциальности
              является примером и должна быть адаптирована под ваши конкретные
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
  title: "Политика конфиденциальности — Энерготипинг",
  meta: [
    {
      name: "description",
      content:
        "Политика конфиденциальности сервиса Энерготипинг. Как мы собираем, используем и защищаем ваши данные.",
    },
    {
      name: "robots",
      content: "noindex, follow",
    },
  ],
});
</script>
