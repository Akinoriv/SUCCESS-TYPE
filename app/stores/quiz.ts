import { defineStore } from "pinia";

export interface QuizAnswer {
  questionId: string;
  answer: string;
}

export interface QuizState {
  sessionId: string | null;
  answers: QuizAnswer[];
  result: any | null;
  isCompleted: boolean;
}

export const useQuizStore = defineStore("quiz", {
  state: (): QuizState => ({
    sessionId: null,
    answers: [],
    result: null,
    isCompleted: false,
  }),

  getters: {
    /**
     * Прогресс прохождения теста в процентах
     */
    progress: (state) => {
      const totalQuestions = 14; // TODO: получать из конфигурации
      return Math.round((state.answers.length / totalQuestions) * 100);
    },

    /**
     * Проверяет, отвечен ли на конкретный вопрос
     */
    isQuestionAnswered: (state) => (questionId: string) => {
      return state.answers.some((answer) => answer.questionId === questionId);
    },
  },

  actions: {
    /**
     * Инициализация новой сессии
     */
    initSession(sessionId: string) {
      this.sessionId = sessionId;
      this.answers = [];
      this.result = null;
      this.isCompleted = false;
    },

    /**
     * Сохранение ответа на вопрос
     */
    saveAnswer(questionId: string, answer: string) {
      // Удаляем предыдущий ответ на этот вопрос, если есть
      this.answers = this.answers.filter((a) => a.questionId !== questionId);

      // Добавляем новый ответ
      this.answers.push({ questionId, answer });
    },

    /**
     * Получение ответа на вопрос
     */
    getAnswer(questionId: string): string | null {
      const answer = this.answers.find((a) => a.questionId === questionId);
      return answer ? answer.answer : null;
    },

    /**
     * Установка результата теста
     */
    setResult(result: any) {
      this.result = result;
      this.isCompleted = true;
    },

    /**
     * Сброс состояния
     */
    reset() {
      this.sessionId = null;
      this.answers = [];
      this.result = null;
      this.isCompleted = false;
    },

    /**
     * Отправка ответов на сервер
     */
    async submitAnswers() {
      if (!this.sessionId) {
        throw new Error("Сессия не инициализирована");
      }

      try {
        const response = await $fetch("/api/quiz/answers", {
          method: "POST",
          body: {
            sessionId: this.sessionId,
            answers: this.answers,
          },
        });

        return response;
      } catch (error) {
        console.error("Error submitting answers:", error);
        throw error;
      }
    },

    /**
     * Расчёт результата теста
     */
    async calculateResult() {
      if (!this.sessionId) {
        throw new Error("Сессия не инициализирована");
      }

      try {
        const response = await $fetch("/api/results/calculate", {
          method: "POST",
          body: {
            sessionId: this.sessionId,
          },
        });

        this.setResult(response.data);
        return response;
      } catch (error) {
        console.error("Error calculating result:", error);
        throw error;
      }
    },
  },
});

