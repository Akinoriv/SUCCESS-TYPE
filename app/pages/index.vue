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
          <!-- Badge -->
          <div
            class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm mb-8 animate-fade-in"
          >
            <span
              class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
            ></span>
            Бесплатный тест • 5 минут • Результат сразу
          </div>

          <!-- Main headline -->
          <h1
            class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up"
          >
            Почему ты устаёшь быстрее других?
      </h1>

          <p
            class="text-xl md:text-2xl text-white/90 mb-4 animate-fade-in-up animation-delay-200"
          >
            Узнай свой
            <span class="text-yellow-300 font-semibold">энерготип</span>
            и перестань работать против себя
          </p>

          <p
            class="text-lg text-white/70 mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-400"
          >
            Это тест-самопознание, который поможет лучше понять твои особенности
            работы с энергией и фокусом. Получишь рекомендации для повышения
            продуктивности и выбора подходящей сферы деятельности.
          </p>

          <!-- CTA Button -->
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-600"
          >
            <NuxtLink
              to="/quiz/onboarding"
              class="group relative inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold px-8 py-4 rounded-xl text-lg shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105"
            >
              <span>Пройти тест за 5 минут</span>
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
            <div class="text-white/60 text-sm">
              Бесплатно • 12 вопросов • Результат сразу
            </div>
          </div>

          <!-- Trust indicators -->
          <div
            class="mt-16 flex flex-wrap justify-center gap-8 text-white/50 text-sm animate-fade-in animation-delay-800"
          >
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                ></path>
              </svg>
              <span>Без регистрации</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                ></path>
              </svg>
              <span>12 вопросов</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
                ></path>
              </svg>
              <span>100% конфиденциально</span>
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

    <!-- Problem Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Знакомо?
            </h2>
            <p class="text-xl text-gray-600">
              Ты не ленивый. Ты просто работаешь против своей природы.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div
              class="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl border border-red-200"
            >
              <div class="text-3xl mb-4">😫</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                "Я устаю быстрее других"
              </h3>
              <p class="text-gray-700">
                Коллеги работают по 8 часов, а ты после 4 уже выжат. Чувствуешь
                вину, что "недостаточно продуктивен".
              </p>
            </div>

            <div
              class="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200"
            >
              <div class="text-3xl mb-4">🔄</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                "Начинаю и бросаю"
              </h3>
              <p class="text-gray-700">
                15 открытых проектов, ни один не закончен. Стыдно признаться,
                сколько всего заброшено на полпути.
              </p>
            </div>

            <div
              class="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200"
            >
              <div class="text-3xl mb-4">🤔</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                "Застреваю в анализе"
              </h3>
              <p class="text-gray-700">
                Пока другие делают, ты думаешь "а правильно ли это?".
                Перфекционизм парализует.
              </p>
            </div>

            <div
              class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200"
            >
              <div class="text-3xl mb-4">😔</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                "Все методы не работают"
              </h3>
              <p class="text-gray-700">
                Пробовал Pomodoro, GTD, Deep Work — ничего не помогает. "Что со
                мной не так?"
              </p>
            </div>
          </div>

          <div
            class="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-200"
          >
            <div class="flex items-start gap-4">
              <div class="text-4xl">💡</div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900 mb-3">
                  Проблема не в тебе. Проблема в том, что ты не знаешь свой
                  энерготип.
                </h3>
                <p class="text-gray-700 text-lg">
                  Ты пытаешься использовать чужие системы продуктивности,
                  работать по чужим ритмам, следовать чужим правилам. Но у тебя
                  другая энергетическая природа.
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
              to="/quiz/onboarding"
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

    <!-- How it Works Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Как это работает?
            </h2>
            <p class="text-xl text-gray-600">
              Всего 3 простых шага до твоего персонального плана
            </p>
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
                  Ответь на 12 вопросов
                </h3>
                <p class="text-gray-600 text-lg">
                  Честно опиши свою работу, энергию, фокус. Это займёт 5-7
                  минут. Без регистрации и лишних данных.
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
                  Получи свой энерготип
                </h3>
                <p class="text-gray-600 text-lg">
                  Сразу увидишь детальное описание: кто ты, твои суперсилы,
                  слабые стороны, рекомендации. Ты узнаешь себя.
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
                  Работай по-своему
                </h3>
                <p class="text-gray-600 text-lg">
                  Используй рекомендации под твой тип. Перестань бороться с
                  собой. Начни работать С природой, а не против неё.
                </p>
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
              to="/quiz/onboarding"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold px-10 py-5 rounded-xl text-xl shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105"
            >
              Начать тест бесплатно
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
              Никаких платежей • Результат сразу • 100% конфиденциально
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
          <h2 class="text-4xl md:text-6xl font-bold text-white mb-6">
            Перестань работать против себя
          </h2>
          <p class="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            Узнай свой энерготип за 5 минут. Получи честные ответы про себя.
            Начни работать по-своему.
        </p>

        <NuxtLink
          to="/quiz/onboarding"
            class="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-12 py-6 rounded-xl text-xl shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:scale-105"
          >
            Пройти тест бесплатно
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
            Присоединяйся к тем, кто уже прошёл тест
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
                  href="mailto:info@example.com"
                  class="text-indigo-400 hover:text-indigo-300"
                >
                  info@example.com
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
// SEO Meta tags
useHead({
  title: "Тест на энерготип — Узнай почему ты устаёшь быстрее других",
  meta: [
    {
      name: "description",
      content:
        "Бесплатный тест на определение энерготипа. Узнай КАК ты устроен, ПОЧЕМУ тебе сложно работать как все, и ЧТО делать для карьеры и денег. 5 минут, результат сразу.",
    },
    {
      property: "og:title",
      content: "Тест на энерготип — Перестань работать против себя",
    },
    {
      property: "og:description",
      content:
        "Узнай свой энерготип за 5 минут. 4 типа личности по энергии и фокусу. Получи персональные рекомендации.",
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
