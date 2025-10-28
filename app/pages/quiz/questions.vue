<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8"
  >
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <div
          class="inline-block bg-white px-6 py-2 rounded-full shadow-sm mb-4"
        >
          <p class="text-sm text-gray-600">
            Вопрос {{ currentQuestionIndex + 1 }} из 14
          </p>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Узнай свой энерготип
        </h1>
        <p class="text-gray-600">
          Отвечай честно — чем точнее ответы, тем точнее результат
        </p>
      </div>

      <!-- Progress Bar -->
      <QuizProgressBar
        :current-question="currentQuestionIndex + 1"
        :total-questions="14"
        :current-dimension="currentQuestion?.dimension"
      />

      <!-- Quiz Content -->
      <div class="quiz-container">
        <!-- Questions -->
        <div v-if="questions.length > 0 && currentQuestion">
          <Transition name="question" mode="out-in">
            <QuizQuestionCard
              :key="currentQuestion.id"
              :question="currentQuestion"
              :selected-answer="answers[currentQuestion.id]"
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

<script setup>
// State
const questions = ref([]);
const answers = ref({});
const currentQuestionIndex = ref(0);
const loading = ref(false);
const error = ref("");
const sessionId = ref("");
const userId = ref("");

// Computed
const currentQuestion = computed(() => {
  return questions.value[currentQuestionIndex.value] || null;
});

// Methods
const loadQuestions = async () => {
  try {
    loading.value = true;
    const response = await $fetch("/api/quiz/questions", {
      query: userId.value ? { userId: userId.value } : {},
    });

    questions.value = response.data.questions;
  } catch (err) {
    error.value = "Ошибка при загрузке вопросов";
    console.error("Error loading questions:", err);
  } finally {
    loading.value = false;
  }
};

const handleAnswer = (answer) => {
  if (currentQuestion.value) {
    answers.value[currentQuestion.value.id] = answer;
  }
};

const continueToNext = async () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    // Save current answer
    if (currentQuestion.value) {
      await saveAnswers();
    }

    currentQuestionIndex.value++;
  } else {
    // Quiz completed
    await completeQuiz();
  }
};

const saveAnswers = async () => {
  try {
    await $fetch("/api/quiz/answers", {
      method: "POST",
      body: {
        sessionId: sessionId.value,
        answers: Object.entries(answers.value).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
      },
    });
  } catch (err) {
    console.error("Error saving answers:", err);
  }
};

const completeQuiz = async () => {
  try {
    loading.value = true;

    // Save final answers
    await saveAnswers();

    // Calculate result
    const resultResponse = await $fetch("/api/results/calculate", {
      method: "POST",
      body: {
        sessionId: sessionId.value,
      },
    });

    // Navigate to results
    await navigateTo(`/quiz/result?id=${resultResponse.data.resultId}`);
  } catch (err) {
    error.value = "Ошибка при расчёте результата";
    console.error("Error completing quiz:", err);
  } finally {
    loading.value = false;
  }
};

const retry = () => {
  error.value = "";
  questions.value = [];
  answers.value = {};
  currentQuestionIndex.value = 0;
  loadQuestions();
};

// Initialize
onMounted(async () => {
  // Get session data from sessionStorage
  if (process.client) {
    sessionId.value = sessionStorage.getItem("quizSessionId") || "";
    userId.value = sessionStorage.getItem("quizUserId") || "";
  }

  if (!sessionId.value) {
    // No session, redirect to onboarding
    await navigateTo("/quiz/onboarding");
    return;
  }

  await loadQuestions();
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
