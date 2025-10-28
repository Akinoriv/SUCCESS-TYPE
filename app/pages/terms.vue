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
          Пользовательское соглашение
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
              1. Общие условия
            </h2>
            <p class="text-gray-700 mb-4">
              Используя сервис "Энерготипинг" (далее — "Сервис"), вы принимаете
              условия настоящего Пользовательского соглашения. Если вы не
              согласны с этими условиями, пожалуйста, не используйте Сервис.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              2. Описание Сервиса
            </h2>
            <p class="text-gray-700 mb-4">
              Сервис предоставляет онлайн-тест для самопознания, который
              помогает пользователям лучше понять свои особенности работы с
              энергией и концентрацией.
            </p>
            <p class="text-gray-700">
              <strong>Важно:</strong> Сервис НЕ является:
            </p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2 mt-2">
              <li>Медицинским диагностическим инструментом</li>
              <li>Психологическим тестированием</li>
              <li>Научным исследованием</li>
              <li>Заменой профессиональной консультации</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              3. Ограничения использования
            </h2>
            <p class="text-gray-700 mb-4">Вы соглашаетесь НЕ:</p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>Использовать Сервис в коммерческих целях без разрешения</li>
              <li>
                Копировать, воспроизводить или распространять контент Сервиса
              </li>
              <li>Пытаться получить несанкционированный доступ к системе</li>
              <li>
                Использовать автоматизированные средства для прохождения теста
              </li>
              <li>Использовать результаты для принятия медицинских решений</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              4. Интеллектуальная собственность
            </h2>
            <p class="text-gray-700 mb-4">
              Все материалы Сервиса, включая тексты, изображения, дизайн,
              алгоритмы тестирования, защищены авторским правом и принадлежат
              владельцу Сервиса.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              5. Отказ от гарантий
            </h2>
            <p class="text-gray-700 mb-4">
              Сервис предоставляется "как есть", без каких-либо гарантий. Мы не
              гарантируем:
            </p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>Точность или полноту результатов теста</li>
              <li>Непрерывную работу Сервиса</li>
              <li>Отсутствие ошибок</li>
              <li>Соответствие вашим ожиданиям</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              6. Ограничение ответственности
            </h2>
            <p class="text-gray-700 mb-4">Мы не несём ответственности за:</p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>Решения, принятые на основе результатов теста</li>
              <li>Любые последствия использования рекомендаций</li>
              <li>Технические сбои или потерю данных</li>
              <li>Косвенные или случайные убытки</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              7. Платные услуги
            </h2>
            <p class="text-gray-700 mb-4">
              Некоторые функции Сервиса могут быть платными. При оплате вы
              соглашаетесь:
            </p>
            <ul class="list-disc pl-6 text-gray-700 space-y-2">
              <li>Оплата производится через безопасные платёжные системы</li>
              <li>
                Возврат средств осуществляется в соответствии с
                законодательством РФ
              </li>
              <li>Цены могут быть изменены без предварительного уведомления</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              8. Изменения условий
            </h2>
            <p class="text-gray-700">
              Мы оставляем за собой право изменять условия настоящего
              Соглашения. О существенных изменениях мы уведомим вас путём
              размещения уведомления на сайте.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              9. Применимое право
            </h2>
            <p class="text-gray-700">
              Настоящее Соглашение регулируется законодательством Российской
              Федерации.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
              10. Контакты
            </h2>
            <p class="text-gray-700">
              По всем вопросам, связанным с настоящим Соглашением, обращайтесь:
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
              <strong>Важно:</strong> Данное Пользовательское соглашение
              является примером и должно быть адаптировано под ваши конкретные
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
  title: "Пользовательское соглашение — Энерготипинг",
  meta: [
    {
      name: "description",
      content: "Условия использования сервиса Энерготипинг.",
    },
    {
      name: "robots",
      content: "noindex, follow",
    },
  ],
});
</script>
