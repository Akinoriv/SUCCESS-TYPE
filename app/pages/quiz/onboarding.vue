<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">
          Тест на тип личности
        </h1>
        <p class="text-lg text-gray-600">
          Узнай свой тип и получи персональные рекомендации
        </p>
      </div>

      <!-- Onboarding Form -->
      <div
        class="question-card bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto"
      >
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
          Расскажи немного о себе
        </h2>

        <div class="space-y-6">
          <!-- Gender Selection -->
          <div>
            <label class="block text-lg font-medium text-gray-700 mb-4">
              Ты мужчина или женщина?
            </label>
            <div class="grid grid-cols-2 gap-4">
              <button
                @click="selectGender('male')"
                :class="[
                  'p-4 rounded-lg border-2 transition-all duration-200',
                  profileData.gender === 'male'
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
                ]"
              >
                <div class="text-center">
                  <div class="text-2xl mb-2">👨</div>
                  <div class="font-semibold">Мужчина</div>
                </div>
              </button>
              <button
                @click="selectGender('female')"
                :class="[
                  'p-4 rounded-lg border-2 transition-all duration-200',
                  profileData.gender === 'female'
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
                ]"
              >
                <div class="text-center">
                  <div class="text-2xl mb-2">👩</div>
                  <div class="font-semibold">Женщина</div>
                </div>
              </button>
            </div>
          </div>

          <!-- Age Selection (Optional) -->
          <div>
            <label class="block text-lg font-medium text-gray-700 mb-4">
              Сколько тебе лет? (необязательно)
            </label>
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="ageRange in ageRanges"
                :key="ageRange.value"
                @click="selectAge(ageRange.value)"
                :class="[
                  'p-3 rounded-lg border-2 transition-all duration-200',
                  profileData.age === ageRange.value
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
                ]"
              >
                {{ ageRange.label }}
              </button>
            </div>
          </div>

          <!-- Privacy Agreement -->
          <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <label class="flex items-start cursor-pointer">
              <input
                type="checkbox"
                v-model="agreed"
                class="mt-1 mr-3 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="text-sm text-gray-700">
                Я соглашаюсь с
                <NuxtLink
                  to="/privacy"
                  target="_blank"
                  class="text-blue-600 hover:underline"
                >
                  политикой конфиденциальности
                </NuxtLink>
                и даю согласие на обработку моих данных для формирования
                результата теста. Понимаю, что этот тест не является медицинским
                или психологическим диагностическим инструментом.
              </span>
            </label>
          </div>
        </div>

        <!-- Continue Button -->
        <div class="mt-8 text-center">
          <button
            @click="continueToQuestions"
            :disabled="!canContinue"
            :class="[
              'px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200',
              canContinue
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed',
            ]"
          >
            Начать тест
          </button>

          <p
            v-if="!agreed && profileData.gender"
            class="mt-3 text-sm text-red-600"
          >
            Необходимо согласие на обработку данных
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

// Get landing source from URL query
const landingSource = ref(route.query.source || 'general') // "courses", "career", "general"
const utmSource = ref(route.query.utm_source || null)
const utmMedium = ref(route.query.utm_medium || null)
const utmCampaign = ref(route.query.utm_campaign || null)

// Save to sessionStorage (in case of page reload)
if (process.client) {
  sessionStorage.setItem('landingSource', landingSource.value)
  if (utmSource.value) sessionStorage.setItem('utmSource', utmSource.value)
  if (utmMedium.value) sessionStorage.setItem('utmMedium', utmMedium.value)
  if (utmCampaign.value) sessionStorage.setItem('utmCampaign', utmCampaign.value)
}

// State
const profileData = ref({
  gender: "",
  age: null,
});

const agreed = ref(false);

// Computed
const canContinue = computed(() => {
  return profileData.value.gender && agreed.value;
});

// Age ranges
const ageRanges = [
  { label: "18-25", value: 25 },
  { label: "26-35", value: 35 },
  { label: "36-45", value: 45 },
  { label: "46-55", value: 55 },
  { label: "56-65", value: 65 },
  { label: "65+", value: 70 },
];

// Methods
const selectGender = (gender) => {
  profileData.value.gender = gender;
};

const selectAge = (age) => {
  profileData.value.age = age;
};

const continueToQuestions = async () => {
  try {
    // Yandex Metrika: Track quiz start
    if (process.client && window.ym) {
      ym(98611746, 'reachGoal', `start_quiz_${landingSource.value}`)
    }

    // Create user and session
    const sessionResponse = await $fetch("/api/quiz/sessions", {
      method: "POST",
      body: {
        userId: crypto.randomUUID(),
        quizId: "main",
        profileData: profileData.value,
        // Landing tracking
        landingSource: landingSource.value,
        utmSource: utmSource.value,
        utmMedium: utmMedium.value,
        utmCampaign: utmCampaign.value,
      },
    });

    // Store session data
    const sessionId = sessionResponse.data.sessionId;
    const userId = sessionResponse.data.userId;

    // Store in sessionStorage for questions page
    if (process.client) {
      sessionStorage.setItem("quizSessionId", sessionId);
      sessionStorage.setItem("quizUserId", userId);
    }

    // Navigate to questions
    await navigateTo("/quiz/questions");
  } catch (err) {
    console.error("Error creating session:", err);
    alert("Ошибка при создании сессии. Попробуйте снова.");
  }
};
</script>
