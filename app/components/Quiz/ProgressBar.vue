<template>
  <div class="progress-bar bg-white rounded-lg shadow-sm p-4 mb-6">
    <div class="flex items-center justify-between mb-2">
      <span class="text-sm font-medium text-gray-700">
        Вопрос {{ currentQuestion }} из {{ totalQuestions }}
      </span>
      <span class="text-sm text-gray-500">
        {{ Math.round(progressPercentage) }}%
      </span>
    </div>

    <div class="w-full bg-gray-200 rounded-full h-2">
      <div
        class="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
        :style="{ width: `${progressPercentage}%` }"
      ></div>
    </div>

    <!-- Optional: Show dimension -->
    <div v-if="currentDimension" class="mt-2 text-center">
      <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
        {{ getDimensionLabel(currentDimension) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentQuestion: number;
  totalQuestions: number;
  currentDimension?: string;
}

const props = defineProps<Props>();

const progressPercentage = computed(() => {
  if (props.totalQuestions === 0) return 0;
  return (props.currentQuestion / props.totalQuestions) * 100;
});

const getDimensionLabel = (dimension: string): string => {
  const labels: Record<string, string> = {
    energy: "Энергия",
    focus: "Фокус",
  };
  return labels[dimension] || dimension;
};
</script>

<style scoped>
.progress-bar {
  backdrop-filter: blur(10px);
}
</style>
