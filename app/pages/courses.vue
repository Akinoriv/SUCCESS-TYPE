<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section
      class="hero-section min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <!-- Background gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"
      >
        <div class="absolute inset-0 opacity-20">
          <div
            class="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"
          ></div>
          <div
            class="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"
          ></div>
          <div
            class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"
          ></div>
        </div>
      </div>

      <div class="container mx-auto px-4 py-20 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Badge с эмоцией -->
          <div
            class="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm mb-6 animate-fade-in"
          >
            Ты знаешь это чувство?
          </div>

          <!-- БОЛЬ + КОНКРЕТИКА - узнавание себя -->
          <h1
            class="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight animate-fade-in-up"
          >
            Купил курс за 20к.<br />
            Прошёл 3 урока. Бросил.<br />
            <span class="text-yellow-300">Чувствуешь вину?</span>
          </h1>

          <!-- ВАЛИДАЦИЯ - это не твоя вина -->
          <div
            class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200"
          >
            <p class="text-xl md:text-2xl text-white/95 mb-3">
              Ты не ленивый. Ты не безвольный.
            </p>
            <p class="text-lg text-white/80">
              С тобой всё в порядке. Просто ты работаешь<br />
              <span class="text-yellow-300 font-semibold"
                >не по своему энерготипу</span
              >.
            </p>
          </div>

          <!-- ЛЮБОПЫТСТВО + РЕШЕНИЕ -->
          <p
            class="text-lg text-white/70 mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-300"
          >
            5-минутный тест покажет,
            <span class="text-white/90 font-medium">КАК ты работаешь</span> на
            самом деле:<br />
            твой ритм, фокус и энергию. И объяснит, почему не получалось раньше.
          </p>

          <!-- CTA Button - ВОЛШЕБНАЯ ТАБЛЕТКА -->
          <div
            class="flex flex-col items-center animate-fade-in-up animation-delay-400"
          >
            <NuxtLink
              to="/quiz/onboarding?source=courses"
              class="group relative inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold px-10 py-5 rounded-xl text-xl shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105"
            >
              <span>Узнать свой энерготип</span>
              <svg
                class="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                ></path>
              </svg>
            </NuxtLink>

            <p class="text-white/60 text-sm mt-4">
              ⚡ 5 минут • 12 вопросов • Результат сразу • Бесплатно
            </p>
          </div>

          <!-- Социальное доказательство -->
          <div
            class="mt-12 inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-3 animate-fade-in animation-delay-500"
          >
            <p class="text-white/70 text-sm">
              <span class="text-yellow-300 font-semibold">2,500+ человек</span>
              уже прошли тест
            </p>
          </div>

          <!-- Trust indicators -->
          <div
            class="mt-8 flex flex-wrap justify-center gap-6 text-white/50 text-sm animate-fade-in animation-delay-600"
          >
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                ></path>
              </svg>
              <span>Без регистрации</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                ></path>
              </svg>
              <span>Честно и безопасно</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
                ></path>
              </svg>
              <span>Результат сразу</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <svg
          class="w-6 h-6 text-white/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </div>
    </section>

    <!-- Problem Section - КОНКРЕТИКА БЕЗ ОБВИНЕНИЙ -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <div
              class="inline-block bg-gray-100 px-4 py-2 rounded-full text-gray-600 text-sm mb-4"
            >
              Это не лень. Это не безволие.
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Узнаёшь себя?
            </h2>
            <p class="text-xl text-gray-600">
              С тобой всё в порядке. Просто ты не знал свой
              <span class="text-indigo-600 font-semibold">энерготип</span>.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div
              class="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl border border-red-200"
            >
              <div class="text-3xl mb-4">😫</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                "После 4 часов работы уже нет сил"
              </h3>
              <p class="text-gray-700">
                Коллеги работают по 8-10 часов, а у тебя энергии хватает на 3-4.
                Начинаешь думать: "Может, со мной что-то не так?"
              </p>
            </div>

            <div
              class="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200"
            >
              <div class="text-3xl mb-4">🔄</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                "Начинаешь с энтузиазмом, через неделю бросаешь"
              </h3>
              <p class="text-gray-700">
                Купил курс за 20k, прошёл 3 урока, забросил. Сейчас смотришь на
                него и чувствуешь вину. Знакомо?
              </p>
            </div>

            <div
              class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200"
            >
              <div class="text-3xl mb-4">🤔</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                "Думаешь неделями, не можешь начать"
              </h3>
              <p class="text-gray-700">
                Изучаешь, анализируешь, планируешь — но так и не делаешь первый
                шаг. Боишься, что выберешь неправильно.
              </p>
            </div>

            <div
              class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200"
            >
              <div class="text-3xl mb-4">😔</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                "Пробовал все методы — ничего не помогает"
              </h3>
              <p class="text-gray-700">
                Pomodoro, GTD, Deep Work, тайм-менеджмент — перепробовал всё. Не
                понимаешь, почему не работает.
              </p>
            </div>
          </div>

          <!-- ВАЛИДАЦИЯ + ОБЪЯСНЕНИЕ -->
          <div
            class="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-200"
          >
            <div class="flex items-start gap-4">
              <div class="text-4xl">💡</div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900 mb-3">
                  Это не лень. Это не безволие. Это твой энерготип.
                </h3>
                <p class="text-gray-700 text-lg mb-4">
                  Представь: ты <strong>Фокус</strong>. Тебе нужна глубокая
                  концентрация на одной задаче. Но на работе тебя заставляют
                  переключаться между 10 проектами. Твой мозг говорит: "Стоп" и
                  отключается.
                </p>
                <p class="text-gray-700 text-lg">
                  Это не проблема с тобой. Это
                  <strong>несоответствие</strong> между твоим типом и тем, как
                  ты работаешь.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Energy Types Section -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              4 энерготипа
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Мы делим людей по двум осям:
              <strong>Энергия</strong> (высокая/низкая) и
              <strong>Фокус</strong> (широкий/глубокий). Это даёт 4 уникальных
              типа.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <!-- Impulse -->
            <div
              class="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-yellow-400"
            >
              <div class="text-6xl mb-4">⚡</div>
              <h3 class="text-3xl font-bold text-gray-900 mb-3">ИМПУЛЬС</h3>
              <div class="text-sm text-gray-500 mb-4">
                Высокая энергия • Широкий фокус
              </div>
              <p class="text-gray-700 mb-6">
                Живая молния успеха. Ты — чистая энергия в действии. Пока другие
                думают, ты уже сделал три шага.
              </p>
              <div class="space-y-3">
                <div class="flex items-start gap-2">
                  <span class="text-green-500 mt-1">✓</span>
                  <span class="text-gray-700">Скорость реакции 3000%</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-green-500 mt-1">✓</span>
                  <span class="text-gray-700">Генератор идей</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-orange-500 mt-1">⚠</span>
                  <span class="text-gray-700">15 открытых вкладок</span>
                </div>
              </div>
            </div>

            <!-- Focus -->
            <div
              class="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-400"
            >
              <div class="text-6xl mb-4">💎</div>
              <h3 class="text-3xl font-bold text-gray-900 mb-3">ФОКУС</h3>
              <div class="text-sm text-gray-500 mb-4">
                Низкая энергия • Глубокий фокус
              </div>
              <p class="text-gray-700 mb-6">
                Лазерный луч точности. Ты — мастер глубины и концентрации.
                Строишь не быстро, но надолго.
              </p>
              <div class="space-y-3">
                <div class="flex items-start gap-2">
                  <span class="text-green-500 mt-1">✓</span>
                  <span class="text-gray-700">Лазерная концентрация</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-green-500 mt-1">✓</span>
                  <span class="text-gray-700">Качество 200%</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-orange-500 mt-1">⚠</span>
                  <span class="text-gray-700">Паралич анализа</span>
                </div>
              </div>
            </div>

            <!-- Titan -->
            <div
              class="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-400"
            >
              <div class="text-6xl mb-4">👑</div>
              <h3 class="text-3xl font-bold text-gray-900 mb-3">ТИТАН</h3>
              <div class="text-sm text-gray-500 mb-4">
                Высокая энергия • Глубокий фокус
              </div>
              <p class="text-gray-700 mb-6">
                Неостановимая сила. У тебя есть и энергия молнии, и фокус
                лазера. Ты устанавливаешь новые стандарты.
              </p>
              <div class="space-y-3">
                <div class="flex items-start gap-2">
                  <span class="text-green-500 mt-1">✓</span>
                  <span class="text-gray-700">Безграничная продуктивность</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-green-500 mt-1">✓</span>
                  <span class="text-gray-700">Системное мышление</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-orange-500 mt-1">⚠</span>
                  <span class="text-gray-700">Риск выгорания</span>
                </div>
              </div>
            </div>

            <!-- Aether -->
            <div
              class="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-indigo-400"
            >
              <div class="text-6xl mb-4">🌌</div>
              <h3 class="text-3xl font-bold text-gray-900 mb-3">ЭФИР</h3>
              <div class="text-sm text-gray-500 mb-4">
                Низкая энергия • Широкий фокус
              </div>
              <p class="text-gray-700 mb-6">
                Архитектор будущего. Ты видишь то, чего не видят другие.
                Создаёшь концепции, которые меняют мир.
              </p>
              <div class="space-y-3">
                <div class="flex items-start gap-2">
                  <span class="text-green-500 mt-1">✓</span>
                  <span class="text-gray-700">Видение паттернов</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-green-500 mt-1">✓</span>
                  <span class="text-gray-700">Прорывные идеи</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-orange-500 mt-1">⚠</span>
                  <span class="text-gray-700">Низкая исполнительность</span>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-12 text-center">
            <p class="text-gray-600 mb-6">Какой из них ты?</p>
            <NuxtLink
              to="/quiz/onboarding?source=courses"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Узнать свой энерготип
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                ></path>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works Section - ВОЛШЕБНАЯ ТАБЛЕТКА -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-16">
            <div
              class="inline-block bg-yellow-100 px-4 py-2 rounded-full text-yellow-800 text-sm mb-4 font-semibold"
            >
              ⚡ ВОЛШЕБНАЯ ТАБЛЕТКА: Мало времени → Быстрый результат
            </div>
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Как это работает?
            </h2>
            <p class="text-xl text-gray-600">3 простых шага за 5 минут</p>
          </div>

          <div class="space-y-8">
            <div class="flex items-start gap-6">
              <div
                class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
              >
                1
              </div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">
                  12 вопросов за 5 минут
                </h3>
                <p class="text-gray-600 text-lg">
                  Про твою энергию, фокус и работу. Без регистрации, без лишних
                  данных. Просто отвечай честно.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-6">
              <div
                class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
              >
                2
              </div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">
                  Узнай свой энерготип — мгновенно
                </h3>
                <p class="text-gray-600 text-lg">
                  Сразу после теста увидишь детальное описание: кто ты (Импульс?
                  Фокус? Титан? Эфир?), твои суперсилы, слабости, рекомендации.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-6">
              <div
                class="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg"
              >
                3
              </div>
              <div class="flex-1">
                <h3 class="text-2xl font-bold text-gray-900 mb-2">
                  Получи персональный план
                </h3>
                <p class="text-gray-600 text-lg">
                  Конкретные стратегии под ТВОЙ тип: как работать, как
                  восстанавливаться, какие профессии подходят. Перестань воевать
                  с собой.
                </p>
              </div>
            </div>
          </div>

          <!-- ВОЛШЕБНАЯ ТАБЛЕТКА: мало времени, быстро, легко -->
          <div
            class="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200"
          >
            <div
              class="flex items-center justify-center gap-6 text-center flex-wrap"
            >
              <div class="flex items-center gap-2">
                <span class="text-3xl">⚡</span>
                <span class="text-lg font-semibold text-gray-900">5 минут</span>
              </div>
              <div class="text-gray-400 text-2xl">•</div>
              <div class="flex items-center gap-2">
                <span class="text-3xl">🎯</span>
                <span class="text-lg font-semibold text-gray-900"
                  >12 вопросов</span
                >
              </div>
              <div class="text-gray-400 text-2xl">•</div>
              <div class="flex items-center gap-2">
                <span class="text-3xl">🎁</span>
                <span class="text-lg font-semibold text-gray-900"
                  >Результат сразу</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Value Section -->
    <section
      class="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Что ты получишь?
            </h2>
            <p class="text-xl text-gray-600">
              Это не просто "узнай себя". Это конкретный план действий.
            </p>
          </div>

          <div class="bg-white rounded-3xl p-8 md:p-12 shadow-2xl mb-8">
            <div class="flex items-start gap-4 mb-8">
              <div class="text-4xl">🎁</div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">
                  Бесплатно после теста:
                </h3>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="flex items-start gap-3">
                <svg
                  class="w-6 h-6 text-green-500 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  ></path>
                </svg>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">
                    Твой энерготип
                  </h4>
                  <p class="text-gray-600 text-sm">
                    Детальное описание кто ты и как устроен
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <svg
                  class="w-6 h-6 text-green-500 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  ></path>
                </svg>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">
                    Твои суперсилы
                  </h4>
                  <p class="text-gray-600 text-sm">
                    5 сильных сторон твоего типа
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <svg
                  class="w-6 h-6 text-green-500 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  ></path>
                </svg>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">
                    Слабые стороны
                  </h4>
                  <p class="text-gray-600 text-sm">
                    Честно про ограничения и как с ними работать
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <svg
                  class="w-6 h-6 text-green-500 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  ></path>
                </svg>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">
                    Карьерные рекомендации
                  </h4>
                  <p class="text-gray-600 text-sm">
                    Профессии и ниши под твой энерготип
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <svg
                  class="w-6 h-6 text-green-500 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  ></path>
                </svg>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">
                    Потенциальный доход
                  </h4>
                  <p class="text-gray-600 text-sm">
                    Реальные цифры для твоего типа
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <svg
                  class="w-6 h-6 text-green-500 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  ></path>
                </svg>
                <div>
                  <h4 class="font-semibold text-gray-900 mb-1">
                    Практические советы
                  </h4>
                  <p class="text-gray-600 text-sm">
                    Как работать именно с твоим типом
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center">
            <NuxtLink
              to="/quiz/onboarding?source=courses"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold px-10 py-5 rounded-xl text-xl shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105"
            >
              Узнать свой энерготип
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                ></path>
              </svg>
            </NuxtLink>
            <p class="text-gray-500 mt-4">
              ⚡ 5 минут • Бесплатно • Результат сразу
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Proof Section - ЧЕСТНОЕ ДОКАЗАТЕЛЬСТВО -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Что говорят те, кто прошёл тест
            </h2>
            <p class="text-xl text-gray-600">
              Реальные отзывы от реальных людей
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <!-- Отзыв 1 -->
            <div
              class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg"
                >
                  М
                </div>
                <div>
                  <div class="font-semibold text-gray-900">Мария, 32</div>
                  <div class="text-sm text-gray-500">Маркетолог</div>
                </div>
              </div>
              <p class="text-gray-700 leading-relaxed">
                "Узнала, что я <strong>Фокус</strong>. Наконец поняла, почему я
                не могу работать с 10 проектами одновременно. Теперь беру
                максимум 2-3 задачи и довожу до конца."
              </p>
            </div>

            <!-- Отзыв 2 -->
            <div
              class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white font-bold text-lg"
                >
                  А
                </div>
                <div>
                  <div class="font-semibold text-gray-900">Алексей, 28</div>
                  <div class="text-sm text-gray-500">Разработчик</div>
                </div>
              </div>
              <p class="text-gray-700 leading-relaxed">
                "Тест показал <strong>Импульс</strong>. Я думал, что со мной
                что-то не так — бросаю курсы через неделю. Оказалось, мне просто
                нужны короткие интенсивы!"
              </p>
            </div>

            <!-- Отзыв 3 -->
            <div
              class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div class="flex items-center gap-3 mb-4">
                <div
                  class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-lg"
                >
                  Д
                </div>
                <div>
                  <div class="font-semibold text-gray-900">Дмитрий, 35</div>
                  <div class="text-sm text-gray-500">Консультант</div>
                </div>
              </div>
              <p class="text-gray-700 leading-relaxed">
                "Получил <strong>Эфир</strong>. Понял, что программирование — не
                моё. Перешёл в консалтинг — работаю с людьми, общаюсь. Наконец
                счастлив."
              </p>
            </div>
          </div>

          <div class="mt-12 text-center">
            <p class="text-gray-500 text-sm">
              Имена изменены, но истории реальные
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Частые вопросы
            </h2>
          </div>

          <div class="space-y-4">
            <details
              class="group bg-gray-50 rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <summary
                class="flex justify-between items-center font-semibold text-lg text-gray-900"
              >
                Чем это отличается от MBTI и других тестов?
                <svg
                  class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </summary>
              <p class="mt-4 text-gray-600">
                Этот тест фокусируется на энергии и способности к концентрации,
                а не на типах личности. Цель — помочь понять твои рабочие ритмы
                и найти подходящие стратегии продуктивности. Это инструмент для
                самопознания, а не психологический диагноз.
              </p>
            </details>

            <details
              class="group bg-gray-50 rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <summary
                class="flex justify-between items-center font-semibold text-lg text-gray-900"
              >
                Это действительно бесплатно?
                <svg
                  class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </summary>
              <p class="mt-4 text-gray-600">
                Да! Тест полностью бесплатный. Ты получишь свой энерготип и все
                базовые рекомендации. В будущем появится расширенный отчёт с
                детальным планом развития (он будет платным).
              </p>
            </details>

            <details
              class="group bg-gray-50 rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <summary
                class="flex justify-between items-center font-semibold text-lg text-gray-900"
              >
                Сколько времени занимает тест?
                <svg
                  class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </summary>
              <p class="mt-4 text-gray-600">
                5-7 минут. 12 вопросов о твоей энергии, фокусе и работе. Не
                торопись, отвечай честно — чем точнее ответы, тем точнее
                результат.
              </p>
            </details>

            <details
              class="group bg-gray-50 rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <summary
                class="flex justify-between items-center font-semibold text-lg text-gray-900"
              >
                Нужна ли регистрация?
                <svg
                  class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </summary>
              <p class="mt-4 text-gray-600">
                Нет. Никаких email, номеров телефонов, паролей. Просто проходишь
                тест и сразу видишь результат. Твои данные не собираются и не
                передаются.
              </p>
            </details>

            <details
              class="group bg-gray-50 rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <summary
                class="flex justify-between items-center font-semibold text-lg text-gray-900"
              >
                Насколько это точно?
                <svg
                  class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </summary>
              <p class="mt-4 text-gray-600">
                Это инструмент для самопознания и рефлексии, а не научный
                психологический тест. Результаты основаны на твоих ответах и
                могут помочь лучше понять свои особенности. Рекомендуем
                воспринимать их как повод для размышления, а не как абсолютную
                истину или медицинский диагноз.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section
      class="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden"
    >
      <div class="absolute inset-0 opacity-10">
        <div
          class="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
        ></div>
        <div
          class="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"
        ></div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div
            class="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm mb-6"
          >
            Может быть, дело не в лени?
          </div>

          <h2 class="text-4xl md:text-6xl font-bold text-white mb-6">
            Узнай, почему ты работаешь<br />именно так
          </h2>
          <p class="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
            5 минут — и ты увидишь свой энерготип.<br />
            Перестанешь бороться с собой. Начнёшь работать по-своему.
          </p>

          <NuxtLink
            to="/quiz/onboarding?source=courses"
            class="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-12 py-6 rounded-xl text-xl shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:scale-105"
          >
            Узнать свой энерготип
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              ></path>
            </svg>
          </NuxtLink>

          <p class="text-white/60 mt-6 text-sm">
            ⚡ Бесплатно • 5 минут • Результат сразу
          </p>

          <p class="text-white/50 mt-4 text-xs">
            Уже
            <span class="text-yellow-300 font-semibold">2,500+ человек</span>
            прошли тест
          </p>
        </div>
      </div>
    </section>

    <!-- Disclaimer -->
    <section class="py-12 bg-gray-50 border-t border-gray-200">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white border border-gray-200 rounded-xl p-6">
            <h3 class="text-sm font-semibold text-gray-900 mb-3">
              ⚠️ Важное уточнение
            </h3>
            <div class="text-xs text-gray-600 space-y-2">
              <p>
                Этот тест является инструментом для самопознания и личностного
                развития. Он не является медицинским, психологическим или
                научным диагностическим инструментом.
              </p>
              <p>
                Результаты теста носят рекомендательный характер и основаны
                исключительно на предоставленных вами ответах. Они не должны
                использоваться для постановки диагнозов, принятия медицинских
                решений или замены профессиональной психологической помощи.
              </p>
              <p>
                Проходя тест, вы соглашаетесь с
                <NuxtLink to="/privacy" class="text-indigo-600 hover:underline"
                  >политикой конфиденциальности</NuxtLink
                >
                и даёте согласие на обработку предоставленных данных для
                формирования результата теста.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 bg-gray-900 text-gray-400">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 class="text-white font-semibold mb-3">Энерготипинг</h4>
              <p class="text-sm">
                Тест для самопознания и повышения продуктивности через понимание
                своих энергетических особенностей.
              </p>
            </div>
            <div>
              <h4 class="text-white font-semibold mb-3">Информация</h4>
              <ul class="space-y-2 text-sm">
                <li>
                  <NuxtLink
                    to="/privacy"
                    class="hover:text-white transition-colors"
                  >
                    Политика конфиденциальности
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/terms"
                    class="hover:text-white transition-colors"
                  >
                    Пользовательское соглашение
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink
                    to="/disclaimer"
                    class="hover:text-white transition-colors"
                  >
                    Отказ от ответственности
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <div>
              <h4 class="text-white font-semibold mb-3">Контакты</h4>
              <p class="text-sm">
                По всем вопросам:
                <a
                  href="mailto:nika.nika1711+info@gmail.com"
                  class="text-indigo-400 hover:text-indigo-300"
                >
                  nika.nika1711+info@gmail.com
                </a>
              </p>
            </div>
          </div>
          <div class="border-t border-gray-800 pt-6 text-center text-sm">
            <p>
              &copy; {{ new Date().getFullYear() }} Энерготипинг. Все права
              защищены.
            </p>
            <p class="mt-2 text-xs">
              Этот тест не является медицинским или психологическим
              диагностическим инструментом.
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Yandex Metrika tracking
onMounted(() => {
  if (process.client && window.ym) {
    ym(98611746, 'reachGoal', 'view_courses_landing')
  }
})

// SEO Meta tags
useHead({
  title: "Тест на энерготип — Узнай, почему ты бросаешь курсы",
  meta: [
    {
      name: "description",
      content:
        "Купил курс, прошёл 3 урока, бросил? Это не лень. 5-минутный тест покажет твой энерготип и объяснит, почему так происходит. Бесплатно, результат сразу.",
    },
    {
      property: "og:title",
      content: "Узнай свой энерготип — Это не лень, это твой тип работы",
    },
    {
      property: "og:description",
      content:
        "5-минутный тест покажет, КАК ты работаешь на самом деле. Без обвинений, без стыда. Только честные ответы про тебя.",
    },
    {
      property: "og:type",
      content: "website",
    },
  ],
});
</script>

<style scoped>
@keyframes blob {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  animation-fill-mode: backwards;
}

.animation-delay-400 {
  animation-delay: 0.4s;
  animation-fill-mode: backwards;
}

.animation-delay-600 {
  animation-delay: 0.6s;
  animation-fill-mode: backwards;
}

.animation-delay-800 {
  animation-delay: 0.8s;
  animation-fill-mode: backwards;
}

details summary::-webkit-details-marker {
  display: none;
}
</style>
