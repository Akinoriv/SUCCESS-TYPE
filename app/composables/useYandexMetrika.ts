/**
 * Composable для работы с Яндекс.Метрикой
 */
export const useYandexMetrika = () => {
  const config = useRuntimeConfig();

  /**
   * Достижение цели
   * @param goalName - название цели
   * @param params - параметры цели
   */
  const reachGoal = (goalName: string, params?: Record<string, any>) => {
    if (process.client && window.ym) {
      window.ym(config.public.yandexMetrikaId, "reachGoal", goalName, params);
    }
  };

  /**
   * Установка параметров визита
   * @param params - параметры визита
   */
  const setParams = (params: Record<string, any>) => {
    if (process.client && window.ym) {
      window.ym(config.public.yandexMetrikaId, "params", params);
    }
  };

  /**
   * Отправка хита
   * @param eventName - название события
   * @param params - параметры события
   */
  const hit = (eventName: string, params?: Record<string, any>) => {
    if (process.client && window.ym) {
      window.ym(config.public.yandexMetrikaId, "hit", eventName, params);
    }
  };

  /**
   * Отслеживание события через API
   * @param eventType - тип события
   * @param eventData - данные события
   */
  const trackEvent = async (
    eventType: string,
    eventData?: Record<string, any>
  ) => {
    try {
      await $fetch("/api/analytics/events", {
        method: "POST",
        body: {
          eventType,
          eventData,
        },
      });
    } catch (error) {
      console.error("Error tracking analytics event:", error);
    }
  };

  return {
    reachGoal,
    setParams,
    hit,
    trackEvent,
  };
};

