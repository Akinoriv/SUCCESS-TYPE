<template>
  <div
    class="question-card bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto"
  >
    <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
      {{ question.text }}
    </h2>

    <!-- Choice questions (A/Б/В/Г) -->
    <div v-if="question.type === 'choice'" class="space-y-4">
      <button
        v-for="(option, key) in question.options"
        :key="key"
        @click="selectAnswer(key)"
        :class="[
          'w-full p-4 text-left rounded-lg border-2 transition-all duration-200',
          selectedAnswer === key
            ? 'border-blue-500 bg-blue-50 text-blue-900'
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
        ]"
      >
        <div class="flex items-center">
          <span class="font-semibold text-lg mr-3">{{ key }})</span>
          <span>{{ option.text }}</span>
        </div>
      </button>
    </div>

    <!-- Scale questions (1-10) -->
    <div v-else-if="question.type === 'scale'" class="space-y-6">
      <div class="text-center">
        <div class="text-4xl font-bold text-blue-600 mb-2">
          {{ selectedAnswer || 5 }}
        </div>
        <div class="text-sm text-gray-600">
          {{ getScaleLabel(selectedAnswer || 5) }}
        </div>
      </div>

      <div class="relative">
        <input
          type="range"
          :min="question.options.min"
          :max="question.options.max"
          :value="selectedAnswer || 5"
          @input="updateScaleAnswer"
          class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />

        <div class="flex justify-between text-xs text-gray-500 mt-2">
          <span>{{ question.options.min }}</span>
          <span>{{ question.options.max }}</span>
        </div>
      </div>

      <!-- Scale labels if available -->
      <div
        v-if="question.options.labels"
        class="flex justify-between text-sm text-gray-600"
      >
        <span v-if="question.options.labels[question.options.min]">
          {{ question.options.labels[question.options.min] }}
        </span>
        <span v-if="question.options.labels[question.options.max]">
          {{ question.options.labels[question.options.max] }}
        </span>
      </div>
    </div>

    <!-- Continue button -->
    <div class="mt-8 text-center">
      <button
        @click="continueQuiz"
        :disabled="!selectedAnswer"
        :class="[
          'px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200',
          selectedAnswer
            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed',
        ]"
      >
        Продолжить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface QuestionOption {
  text: string;
  score: number;
}

interface ScaleOptions {
  min: number;
  max: number;
  labels?: Record<number, string>;
}

interface Question {
  id: string;
  order: number;
  text: string;
  type: "choice" | "scale";
  options: Record<string, QuestionOption> | ScaleOptions;
  dimension: string;
}

interface Props {
  question: Question;
  selectedAnswer?: string;
}

interface Emits {
  (e: "answer", answer: string): void;
  (e: "continue"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectedAnswer = ref<string>(props.selectedAnswer || "");

const selectAnswer = (answer: string) => {
  selectedAnswer.value = answer;
  emit("answer", answer);
};

const updateScaleAnswer = (event: Event) => {
  const target = event.target as HTMLInputElement;
  selectedAnswer.value = target.value;
  emit("answer", target.value);
};

const continueQuiz = () => {
  if (selectedAnswer.value) {
    emit("continue");
  }
};

const getScaleLabel = (value: number): string => {
  if (props.question.type === "scale" && "labels" in props.question.options) {
    return props.question.options.labels?.[value] || "";
  }
  return "";
};

// Watch for prop changes
watch(
  () => props.selectedAnswer,
  (newValue) => {
    selectedAnswer.value = newValue || "";
  }
);
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
