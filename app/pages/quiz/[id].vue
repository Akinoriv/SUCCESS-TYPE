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

      <!-- Progress Bar -->
      <ProgressBar
        v-if="currentStep > 0"
        :current-question="currentStep"
        :total-questions="14"
        :current-dimension="currentQuestion?.dimension"
      />

      <!-- Quiz Content -->
      <div class="quiz-container">
        <!-- Step 0: Gender/Age Selection -->
        <div
          v-if="currentStep === 0"
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
          </div>

          <!-- Continue Button -->
          <div class="mt-8 text-center">
            <button
              @click="continueFromProfile"
              :disabled="!profileData.gender"
              :class="[
                'px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200',
                profileData.gender
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed',
              ]"
            >
              Начать тест
            </button>
          </div>
        </div>

        <!-- Steps 1-14: Quiz Questions -->
        <div v-else-if="currentStep <= 14 && questions.length > 0">
          <Transition name="question" mode="out-in">
            <QuestionCard
              :key="currentQuestion?.id"
              :question="currentQuestion"
              :selected-answer="answers[currentQuestion?.id || '']"
              @answer="handleAnswer"
              @continue="continueToNext"
            />
          </Transition>
        </div>

        <!-- Loading State -->
        <div v-else-if="loading" class="text-center py-12">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
          ></div>
          <p class="text-gray-600">Загружаем вопросы...</p>
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
  </div>
</template>

<script setup lang="ts">
import { useQuizStore } from "../../../stores/quiz";
import { useYandexMetrika } from "../../../composables/useYandexMetrika";

// Store
const quizStore = useQuizStore();
const { trackEvent } = useYandexMetrika();

// Route
const route = useRoute();
const router = useRouter();

// State
const currentStep = ref(0);
const questions = ref<any[]>([]);
const answers = ref<Record<string, string>>({});
const loading = ref(false);
const error = ref("");
const userId = ref<string | null>(null);

// Profile data for step 0
const profileData = ref({
  gender: "",
  age: null as number | null,
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

// Computed
const currentQuestion = computed(() => {
  if (currentStep.value === 0 || currentStep.value > questions.value.length) {
    return null;
  }
  return questions.value[currentStep.value - 1];
});

// Methods
const selectGender = (gender: string) => {
  profileData.value.gender = gender;
};

const selectAge = (age: number) => {
  profileData.value.age = age;
};

const continueFromProfile = async () => {
  try {
    loading.value = true;

    // Create user and session
    const sessionResponse = await $fetch("/api/quiz/sessions", {
      method: "POST",
      body: {
        userId: crypto.randomUUID(),
        quizId: "main",
        profileData: profileData.value,
      },
    });

    userId.value = sessionResponse.data.userId;
    quizStore.initSession(sessionResponse.data.sessionId);

    // Load questions
    await loadQuestions();

    // Track event
    await trackEvent("START_QUIZ", {
      userId: userId.value,
      gender: profileData.value.gender,
      age: profileData.value.age,
    });

    // Move to first question
    currentStep.value = 1;
  } catch (err) {
    error.value = "Ошибка при создании сессии";
    console.error("Error creating session:", err);
  } finally {
    loading.value = false;
  }
};

const loadQuestions = async () => {
  try {
    const response = await $fetch("/api/quiz/questions", {
      query: userId.value ? { userId: userId.value } : {},
    });

    questions.value = response.data.questions;
  } catch (err) {
    error.value = "Ошибка при загрузке вопросов";
    console.error("Error loading questions:", err);
  }
};

const handleAnswer = (answer: string) => {
  if (currentQuestion.value) {
    answers.value[currentQuestion.value.id] = answer;
    quizStore.saveAnswer(currentQuestion.value.id, answer);
  }
};

const continueToNext = async () => {
  if (currentStep.value < 14) {
    // Save current answer
    if (currentQuestion.value) {
      await quizStore.submitAnswers();
    }

    currentStep.value++;
  } else {
    // Quiz completed
    await completeQuiz();
  }
};

const completeQuiz = async () => {
  try {
    loading.value = true;

    // Submit final answers
    await quizStore.submitAnswers();

    // Calculate result
    const resultResponse = await quizStore.calculateResult();

    // Track completion
    await trackEvent("QUIZ_COMPLETED", {
      userId: userId.value,
      sessionId: quizStore.sessionId,
    });

    // Redirect to results
    await router.push(`/results/${resultResponse.data.resultId}`);
  } catch (err) {
    error.value = "Ошибка при расчёте результата";
    console.error("Error completing quiz:", err);
  } finally {
    loading.value = false;
  }
};

const retry = () => {
  error.value = "";
  currentStep.value = 0;
  answers.value = {};
  questions.value = [];
  userId.value = null;
  profileData.value = { gender: "", age: null };
};

// Initialize
onMounted(async () => {
  // Check if we have a session ID in the URL
  const sessionId = route.params.id as string;
  if (sessionId && sessionId !== "new") {
    // Load existing session
    quizStore.initSession(sessionId);
    await loadQuestions();
    currentStep.value = 1;
  }
});
</script>

<style scoped>
.question-enter-active,
.question-leave-active {
  transition: all 0.3s ease;
}

.question-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.question-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.quiz-container {
  min-height: 400px;
}
</style>
