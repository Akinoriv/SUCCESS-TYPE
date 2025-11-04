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
        <div class="max-w-5xl mx-auto text-center">
          <!-- Main headline -->
          <h1
            class="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight animate-fade-in-up"
          >
            У тебя своя скорость<br/>
            движения к цели
      </h1>

          <p
            class="text-2xl md:text-3xl text-white/90 font-semibold mb-8 animate-fade-in-up animation-delay-200"
          >
            Узнай её и перестань<br class="md:hidden"/> работать против себя
          </p>

          <!-- Subheadline -->
          <p
            class="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-300"
          >
            5-минутный тест покажет твой уровень энергии и концентрации —<br/>
            и даст персональную стратегию, как достигать целей быстрее
          </p>

          <!-- Text block -->
          <div
            class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-10 max-w-3xl mx-auto animate-fade-in-up animation-delay-400"
          >
            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div class="text-center">
                <p class="text-white/90 text-lg">
                  Кто-то работает<br/><strong class="text-white text-xl">12 часов в день</strong>
                </p>
              </div>
              <div class="text-center">
                <p class="text-white/90 text-lg">
                  Кто-то —<br/><strong class="text-white text-xl">4 часа спринтами</strong>
                </p>
              </div>
              <div class="text-center">
                <p class="text-white/90 text-lg">
                  Кто-то любит<br/><strong class="text-white text-xl">рутину</strong>
                </p>
              </div>
              <div class="text-center">
                <p class="text-white/90 text-lg">
                  Кто-то —<br/><strong class="text-white text-xl">новизну каждый месяц</strong>
                </p>
              </div>
            </div>
            
            <div class="border-t border-white/20 pt-6">
              <p class="text-white text-xl font-semibold text-center mb-3">
                Нет правильного способа. Есть <span class="text-yellow-300">ТВОЙ способ</span>.
              </p>
              <p class="text-white/80 text-lg text-center">
                Узнай свой <span class="text-yellow-300 font-semibold">энерготип</span> за 5 минут.
              </p>
            </div>
          </div>

          <!-- CTA Button -->
          <div
            class="flex flex-col items-center animate-fade-in-up animation-delay-500"
          >
        <NuxtLink
              to="/quiz/onboarding?source=general"
              class="group relative inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold px-12 py-5 rounded-xl text-xl shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105"
            >
              <span>Узнать свою стратегию</span>
              <svg
                class="w-6 h-6 group-hover:translate-x-1 transition-transform"
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
              Бесплатно • 5 минут • Результат сразу
            </p>
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

    <!-- Problem/Validation Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Может быть, ты работаешь<br/>не по своей природе?
            </h2>
          </div>

          <div class="space-y-4 mb-12">
            <div
              class="flex items-start gap-4 bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-2xl border border-red-200"
            >
              <div class="text-3xl">😫</div>
              <p class="text-gray-800 text-lg">
                Ты пытаешься работать 8 часов в день, но <strong>выгораешь через 4</strong>?
              </p>
            </div>

            <div
              class="flex items-start gap-4 bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200"
            >
              <div class="text-3xl">🔄</div>
              <p class="text-gray-800 text-lg">
                Ты начинаешь проекты с энтузиазмом, но <strong>бросаешь через месяц</strong>?
              </p>
            </div>

            <div
              class="flex items-start gap-4 bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-2xl border border-yellow-200"
            >
              <div class="text-3xl">📚</div>
              <p class="text-gray-800 text-lg">
                Ты следуешь чужим советам («вставай в 5 утра», «работай по системе»), но <strong>они не работают для тебя</strong>?
              </p>
            </div>

            <div
              class="flex items-start gap-4 bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200"
            >
              <div class="text-3xl">💭</div>
              <p class="text-gray-800 text-lg">
                Ты чувствуешь, что <strong>можешь больше</strong>, но не понимаешь, как?
              </p>
            </div>
          </div>

          <!-- Validation block -->
          <div
            class="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-200"
          >
            <div class="flex items-start gap-4">
              <div class="text-4xl">💡</div>
              <div>
                <p class="text-gray-900 text-xl font-bold mb-4">
                  Дело не в лени. Не в мотивации. Не в силе воли.
                </p>
                <p class="text-gray-800 text-lg mb-3">
                  Дело в том, что ты работаешь <strong>против своего уровня энергии и концентрации</strong>.
                </p>
                <p class="text-gray-800 text-lg mb-3">
                  У тебя свой ритм. Своя скорость. Своя стратегия.
                </p>
                <p class="text-indigo-700 text-xl font-semibold">
                  Узнай её — и перестань себя ломать.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Concept Section -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              У каждого свой уровень<br/>энергии и концентрации
            </h2>
            <p class="text-xl text-gray-600">
              <strong>Энерготипинг</strong> — это система, которая определяет:
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <!-- Энергия -->
            <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div class="text-5xl mb-4">⚡</div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">
                Твой уровень энергии
              </h3>
              <p class="text-gray-700">
                Сколько часов в день ты можешь работать продуктивно (не «должен», а <strong>МОЖЕШЬ</strong> — по своей природе)
              </p>
            </div>

            <!-- Концентрация -->
            <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div class="text-5xl mb-4">🎯</div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">
                Твой уровень концентрации
              </h3>
              <ul class="text-gray-700 space-y-2">
                <li>• Как быстро ты переключаешься между задачами</li>
                <li>• Нужна ли тебе новизна или стабильность</li>
                <li>• Любишь ли ты копаться в деталях или работать широко</li>
              </ul>
            </div>

            <!-- Стратегия -->
            <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div class="text-5xl mb-4">🗺️</div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">
                Твоя стратегия
              </h3>
              <ul class="text-gray-700 space-y-2">
                <li>• Как тебе двигаться к целям, чтобы не выгорать</li>
                <li>• Какой ритм работы подходит именно тебе</li>
                <li>• Как организовать жизнь под свою природу</li>
              </ul>
            </div>

            <!-- Профессия -->
            <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div class="text-5xl mb-4">💼</div>
              <h3 class="text-2xl font-bold text-gray-900 mb-3">
                Твоё дело
              </h3>
              <p class="text-gray-700">
                Для каждого типа есть своя профессия или дело, где он будет <strong>самым конкурентоспособным</strong>. Узнай, где именно ты будешь выигрывать у других.
              </p>
            </div>
          </div>

          <!-- Important notice -->
          <div
            class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-300"
          >
            <div class="flex items-start gap-4">
              <div class="text-4xl">⚡</div>
              <div>
                <p class="text-gray-900 font-bold text-xl mb-3">ВАЖНО:</p>
                <p class="text-gray-800 text-lg mb-3">
                  Твой уровень энергии и концентрации <strong>может меняться</strong> с возрастом или жизненными ситуациями.
                </p>
                <p class="text-gray-800 text-lg mb-3">
                  Когда жизнь меняется — меняешься и ты. Поэтому возвращайся к тесту, когда чувствуешь, что нужно пересобрать себя заново: перед началом новой главы жизни, при построении грандиозных планов, когда запутался или выгорел.
                </p>
                <p class="text-gray-900 font-semibold text-lg">
                  Методика поможет кому-то на всю жизнь, а кому-то — здесь и сейчас.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Energy Types Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Четыре типа продуктивности:<br/>какой — твой?
            </h2>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <!-- IMPULSE -->
            <div
              class="group bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-yellow-300 hover:scale-105"
            >
              <div class="flex items-center gap-3 mb-4">
                <div class="text-6xl">⚡</div>
                <div>
                  <h3 class="text-3xl font-bold text-gray-900">IMPULSE</h3>
                  <p class="text-sm text-gray-600">Высокая энергия • Быстрое переключение</p>
                </div>
              </div>

              <div class="mb-6">
                <h4 class="text-lg font-bold text-gray-900 mb-2">Твоя скорость движения:</h4>
                <ul class="space-y-2 text-gray-700">
                  <li class="flex items-start gap-2">
                    <span class="text-orange-500 mt-1">→</span>
                    <span>Работаешь интенсивно 2-4 часа, потом нужен перерыв</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-orange-500 mt-1">→</span>
                    <span>Тебе нужна новизна каждый месяц (старые проекты становятся скучными)</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-orange-500 mt-1">→</span>
                    <span>Много проектов одновременно — это твоя норма</span>
                  </li>
                </ul>
              </div>

              <div class="bg-white/70 rounded-xl p-4">
                <p class="text-sm font-semibold text-gray-900 mb-2">Твоя стратегия:</p>
                <p class="text-gray-800">Короткие спринты, новые проекты, быстрые результаты</p>
              </div>
            </div>

            <!-- FOCUS -->
            <div
              class="group bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-blue-300 hover:scale-105"
            >
              <div class="flex items-center gap-3 mb-4">
                <div class="text-6xl">💎</div>
                <div>
                  <h3 class="text-3xl font-bold text-gray-900">FOCUS</h3>
                  <p class="text-sm text-gray-600">Средняя энергия • Глубокая концентрация</p>
                </div>
              </div>

              <div class="mb-6">
                <h4 class="text-lg font-bold text-gray-900 mb-2">Твоя скорость движения:</h4>
                <ul class="space-y-2 text-gray-700">
                  <li class="flex items-start gap-2">
                    <span class="text-blue-500 mt-1">→</span>
                    <span>Работаешь 4-6 часов стабильно</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-blue-500 mt-1">→</span>
                    <span>Любишь копаться в деталях, изучать глубоко</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-blue-500 mt-1">→</span>
                    <span>Долгие проекты (3-6 месяцев) — это твое</span>
                  </li>
                </ul>
              </div>

              <div class="bg-white/70 rounded-xl p-4">
                <p class="text-sm font-semibold text-gray-900 mb-2">Твоя стратегия:</p>
                <p class="text-gray-800">Системность, глубокая работа, долгосрочные цели</p>
              </div>
            </div>

            <!-- TITAN -->
            <div
              class="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-purple-300 hover:scale-105"
            >
              <div class="flex items-center gap-3 mb-4">
                <div class="text-6xl">👑</div>
                <div>
                  <h3 class="text-3xl font-bold text-gray-900">TITAN</h3>
                  <p class="text-sm text-gray-600">Высокая энергия • Стабильный марафон</p>
                </div>
              </div>

              <div class="mb-6">
                <h4 class="text-lg font-bold text-gray-900 mb-2">Твоя скорость движения:</h4>
                <ul class="space-y-2 text-gray-700">
                  <li class="flex items-start gap-2">
                    <span class="text-purple-500 mt-1">→</span>
                    <span>Работаешь 8-12 часов стабильно</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-purple-500 mt-1">→</span>
                    <span>Не выгораешь при долгой работе</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-purple-500 mt-1">→</span>
                    <span>Масштабные проекты (6-12 месяцев) — твоя стихия</span>
                  </li>
                </ul>
              </div>

              <div class="bg-white/70 rounded-xl p-4">
                <p class="text-sm font-semibold text-gray-900 mb-2">Твоя стратегия:</p>
                <p class="text-gray-800">Большие цели, выносливость, долгий путь с постоянной энергией</p>
              </div>
            </div>

            <!-- ETHER -->
            <div
              class="group bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-teal-300 hover:scale-105"
            >
              <div class="flex items-center gap-3 mb-4">
                <div class="text-6xl">🌌</div>
                <div>
                  <h3 class="text-3xl font-bold text-gray-900">ETHER</h3>
                  <p class="text-sm text-gray-600">Низкая энергия • Общение > Теория</p>
                </div>
              </div>

              <div class="mb-6">
                <h4 class="text-lg font-bold text-gray-900 mb-2">Твоя скорость движения:</h4>
                <ul class="space-y-2 text-gray-700">
                  <li class="flex items-start gap-2">
                    <span class="text-teal-500 mt-1">→</span>
                    <span>Работаешь 2-3 часа, потом нужен перерыв</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-teal-500 mt-1">→</span>
                    <span>Учишься через общение и практику (не через книги)</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="text-teal-500 mt-1">→</span>
                    <span>Нужны люди рядом для энергии</span>
                  </li>
                </ul>
              </div>

              <div class="bg-white/70 rounded-xl p-4">
                <p class="text-sm font-semibold text-gray-900 mb-2">Твоя стратегия:</p>
                <p class="text-gray-800">Общение, совместная работа, практика</p>
              </div>
            </div>
          </div>

          <div class="mt-12 text-center">
            <p class="text-gray-700 text-xl mb-6">
              Узнал себя? Пройди тест, чтобы точно определить свой тип<br/>и получить персональную стратегию.
            </p>
            <NuxtLink
              to="/quiz/onboarding?source=general"
              class="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-10 py-4 rounded-xl text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Узнать свой тип
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

    <!-- What You Get Section -->
    <section
      class="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Что ты получишь после теста
            </h2>
            <p class="text-xl text-gray-600">
              Возможно, ты даже не додумался, что здесь есть столько полезного
            </p>
          </div>

          <div class="bg-white rounded-3xl p-8 md:p-12 shadow-2xl mb-8">
            <div class="space-y-8">
              <div class="flex items-start gap-4">
                <div class="text-3xl">✨</div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">
                    Глубокое понимание своего дара
                  </h3>
                  <p class="text-gray-700 text-lg">
                    Ты узнаешь, как работает твоя энергия — не как у всех, а именно у тебя. Подробное описание твоего типа с объяснением всех особенностей.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="text-3xl">💚</div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">
                    Осознание, что ты не лентяй, а просто другой
                  </h3>
                  <p class="text-gray-700 text-lg">
                    Валидация: дело не в тебе, а в том, что ты работал против своей природы. Это снимет груз вины и тревоги.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="text-3xl">🧠</div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">
                    Честность про тревогу и апатию
                  </h3>
                  <p class="text-gray-700 text-lg">
                    Почему ты чувствуешь тревогу или апатию — и что с этим делать. Конкретные ответы на твои вопросы.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="text-3xl">🎯</div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">
                    Пять конкретных стратегий для реализации своих идей
                  </h3>
                  <p class="text-gray-700 text-lg">
                    Не абстрактные советы, а конкретные шаги для твоего типа. Ты сможешь применить их уже сегодня.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="text-3xl">💼</div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">
                    Где ты будешь самым конкурентоспособным
                  </h3>
                  <p class="text-gray-700 text-lg">
                    Профессии и дела, где именно твой тип выигрывает у других. Узнай, в какой сфере ты будешь самым сильным.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="text-3xl">🗓️</div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">
                    Персональный план на 30 дней
                  </h3>
                  <p class="text-gray-700 text-lg">
                    Что делать прямо сейчас, с этой секунды. Конкретный чек-лист в зависимости от твоего типа — если ты только что прошел курс, решил поменять деятельность, запутался или в тревоге.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="text-3xl">💰</div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">
                    Как начать зарабатывать на своём деле
                  </h3>
                  <p class="text-gray-700 text-lg">
                    Конкретные примеры профессий для твоего типа и как начать зарабатывать на этой работе. Где именно ты будешь выигрывать у других.
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="text-3xl">👥</div>
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">
                    Твоя команда мечты
                  </h3>
                  <p class="text-gray-700 text-lg">
                    С кем тебе лучше всего работать, кто будет тебя дополнять, какие сотрудники нужны для делегирования, чтобы довести проект до максимума.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- When to Take Test Section -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Когда стоит пройти этот тест?
            </h2>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div class="text-4xl mb-3">✨</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Перед началом новой главы жизни
              </h3>
              <p class="text-gray-600">
                Смена работы, переезд, новый проект
              </p>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div class="text-4xl mb-3">🚀</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                При построении грандиозных планов
              </h3>
              <p class="text-gray-600">
                Запуск бизнеса, крупная цель на год
              </p>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div class="text-4xl mb-3">🎉</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Перед Новым годом или днем рождения
              </h3>
              <p class="text-gray-600">
                Когда планируешь будущее
              </p>
            </div>

            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div class="text-4xl mb-3">😓</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Когда чувствуешь, что выгораешь
              </h3>
              <p class="text-gray-600">
                И не понимаешь, почему
              </p>
            </div>

            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-lg border-2 border-indigo-200 md:col-span-2">
              <div class="text-4xl mb-3">🔄</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Раз в год — для проверки
              </h3>
              <p class="text-gray-700 font-medium">
                Твой уровень энергии может меняться
              </p>
            </div>
          </div>

          <div class="mt-12 text-center bg-yellow-50 rounded-2xl p-8 border border-yellow-200">
            <p class="text-gray-900 text-xl mb-2">
              Тест займет <strong>5 минут</strong>.
            </p>
            <p class="text-gray-700 text-lg">
              Но даст стратегию, которая сэкономит тебе <strong>месяцы или годы попыток</strong>.
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
              Вопросы
            </h2>
          </div>

          <div class="space-y-4">
            <details
              class="group bg-gray-50 rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <summary
                class="flex justify-between items-center font-semibold text-lg text-gray-900"
              >
                Это платно?
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
                Тест бесплатный. Ты сразу получишь свой тип с подробным описанием, результаты и объяснения — все это бесплатно. Персональный план на 30 дней — 490₽ (по желанию).
              </p>
            </details>

            <details
              class="group bg-gray-50 rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <summary
                class="flex justify-between items-center font-semibold text-lg text-gray-900"
              >
                Это научно?
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
                Да. Создатель учится в магистратуре на психолога (специализация Data Analysis & AI in Psychology). Тест основан на исследованиях, но это моя собственная концепция (не копия MBTI или других тестов).
              </p>
            </details>

            <details
              class="group bg-gray-50 rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <summary
                class="flex justify-between items-center font-semibold text-lg text-gray-900"
              >
                Могу ли я пройти тест несколько раз?
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
                Да. Твой уровень энергии может меняться с возрастом или жизненными ситуациями. Возвращайся к тесту, когда чувствуешь, что нужно пересобрать себя заново.
              </p>
            </details>

            <details
              class="group bg-gray-50 rounded-xl p-6 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <summary
                class="flex justify-between items-center font-semibold text-lg text-gray-900"
              >
                Что если результаты не совпадут с моими ощущениями?
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
                Напиши мне — разберемся. Тест еще развивается, твой фидбек важен.
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
            Готов узнать свою скорость<br/>движения к целям?
          </h2>
          
          <div class="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-10 max-w-2xl mx-auto">
            <p class="text-white/90 text-xl mb-3">
              У тебя свой уровень энергии.
            </p>
            <p class="text-white/90 text-xl mb-3">
              Свой уровень концентрации.
            </p>
            <p class="text-white text-2xl font-bold">
              Своя стратегия достижения целей.
            </p>
            <p class="text-white/80 text-lg mt-4">
              Узнай её за 5 минут — и перестань работать против себя.
            </p>
          </div>

          <NuxtLink
            to="/quiz/onboarding?source=general"
            class="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-12 py-6 rounded-xl text-xl shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:scale-105"
          >
            Узнать свою стратегию
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
            Бесплатно • 5 минут • Персональный результат
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
                Этот тест <strong>НЕ является медицинской диагностикой или карьерным консультированием</strong>. Результаты носят рекомендательный характер и основаны на самоанализе.
              </p>
              <p>
                Создатель учится в магистратуре на психолога (специализация Data Analysis & AI in Psychology). Тест основан на исследованиях, но это авторская концепция.
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
    ym(98611746, 'reachGoal', 'view_general_landing')
  }
})

// SEO Meta tags
useHead({
  title: "Энерготипинг — Узнай свою скорость движения к целям",
  meta: [
    {
      name: "description",
      content:
        "У тебя свой уровень энергии и концентрации. 5-минутный тест покажет твою персональную стратегию достижения целей. Бесплатно, результат сразу.",
    },
    {
      property: "og:title",
      content: "Энерготипинг — Перестань работать против себя",
    },
    {
      property: "og:description",
      content:
        "Узнай свой уровень энергии и концентрации за 5 минут. Получи персональную стратегию для достижения целей быстрее.",
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

.animation-delay-300 {
  animation-delay: 0.3s;
  animation-fill-mode: backwards;
}

.animation-delay-400 {
  animation-delay: 0.4s;
  animation-fill-mode: backwards;
}

.animation-delay-500 {
  animation-delay: 0.5s;
  animation-fill-mode: backwards;
}

details summary::-webkit-details-marker {
  display: none;
}
</style>
