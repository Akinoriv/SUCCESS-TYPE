/**
 * Утилиты для персонализации контента на основе данных пользователя
 */

export interface User {
  id: string;
  gender?: string;
  age?: number;
  profileData?: any;
}

/**
 * Получает ключи персонализации для пользователя
 * @param user - данные пользователя
 * @returns массив ключей персонализации в порядке приоритета
 */
export function getPersonalizationKey(user?: User): string[] {
  if (!user) {
    return ["default"];
  }

  const keys: string[] = [];

  // Добавляем ключи в порядке приоритета
  if (user.gender) {
    keys.push(user.gender.toLowerCase());
  }

  // Всегда добавляем default как fallback
  keys.push("default");

  return keys;
}

/**
 * Получает персонализированный текст из вариаций
 * @param variations - объект с вариациями текста
 * @param user - данные пользователя
 * @returns персонализированный текст
 */
export function getPersonalizedText(
  variations: Record<string, string>,
  user?: User
): string {
  const keys = getPersonalizationKey(user);

  // Ищем первый доступный ключ
  for (const key of keys) {
    if (variations[key]) {
      return variations[key];
    }
  }

  // Fallback на default или первый доступный
  return variations.default || Object.values(variations)[0] || "";
}

/**
 * Персонализирует опции вопроса (варианты ответов)
 * @param options - объект с опциями
 * @param user - данные пользователя
 * @returns персонализированные опции
 */
export function personalizeOptions(options: any, user?: User): any {
  if (!options || typeof options !== "object") {
    return options;
  }

  const personalizedOptions: any = {};

  for (const [key, value] of Object.entries(options)) {
    if (value && typeof value === "object") {
      // Если у опции есть variations, персонализируем текст
      if ((value as any).variations) {
        personalizedOptions[key] = {
          ...(value as any),
          text: getPersonalizedText((value as any).variations, user),
        };
      } else {
        // Иначе оставляем как есть
        personalizedOptions[key] = value;
      }
    } else {
      personalizedOptions[key] = value;
    }
  }

  return personalizedOptions;
}

/**
 * Персонализирует массив вопросов
 * @param questions - массив вопросов с variations
 * @param user - данные пользователя
 * @returns массив персонализированных вопросов
 */
export function personalizeQuestions(questions: any[], user?: User): any[] {
  return questions.map((question) => ({
    ...question,
    text: getPersonalizedText(question.variations, user),
    options: personalizeOptions(question.options, user),
  }));
}

/**
 * Получает персонализированный контент для landing page
 * @param contentJson - JSON с контентом и вариациями
 * @param user - данные пользователя
 * @returns персонализированный контент
 */
export function personalizeContent(contentJson: any, user?: User): any {
  if (!contentJson || typeof contentJson !== "object") {
    return contentJson;
  }

  const personalized = { ...contentJson };

  // Рекурсивно обрабатываем объект
  for (const [key, value] of Object.entries(personalized)) {
    if (value && typeof value === "object") {
      if (value.variations) {
        // Если есть variations, персонализируем
        personalized[key] = getPersonalizedText(value.variations, user);
      } else {
        // Рекурсивно обрабатываем вложенные объекты
        personalized[key] = personalizeContent(value, user);
      }
    }
  }

  return personalized;
}
