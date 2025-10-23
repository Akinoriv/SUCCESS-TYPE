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
     * Количество отвеченных вопросов
     */
    answeredQuestions: (state) => state.answers.length,

    /**
     * Прогресс прохождения теста (в процентах)
     */
    progress: (state) => {
      const totalQuestions = 10; // TODO: получать из конфигурации
      return Math.round((state.answers.length / totalQuestions) * 100);
    },

    /**
     * Проверка, отвечен ли конкретный вопрос
     */
    isQuestionAnswered: (state) => (questionId: string) => {
      return state.answers.some((answer) => answer.questionId === questionId);
    },
  },

  actions: {
    /**
     * Инициализация новой сессии теста
     * @param sessionId - ID сессии
     */
    initSession(sessionId: string) {
      this.sessionId = sessionId;
      this.answers = [];
      this.result = null;
      this.isCompleted = false;
    },

    /**
     * Сохранение ответа на вопрос
     * @param questionId - ID вопроса
     * @param answer - ответ пользователя
     */
    saveAnswer(questionId: string, answer: string) {
      // Удаляем предыдущий ответ на этот вопрос, если есть
      this.answers = this.answers.filter((a) => a.questionId !== questionId);

      // Добавляем новый ответ
      this.answers.push({ questionId, answer });
    },

    /**
     * Получение ответа на конкретный вопрос
     * @param questionId - ID вопроса
     */
    getAnswer(questionId: string): string | null {
      const answer = this.answers.find((a) => a.questionId === questionId);
      return answer ? answer.answer : null;
    },

    /**
     * Сохранение результата теста
     * @param result - результат теста
     */
    setResult(result: any) {
      this.result = result;
      this.isCompleted = true;
    },

    /**
     * Сброс состояния теста
     */
    reset() {
      this.sessionId = null;
      this.answers = [];
      this.result = null;
      this.isCompleted = false;
    },

    /**
     * Отправка всех ответов на сервер
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
