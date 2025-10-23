/**
 * POST /api/results/calculate
 * Расчёт результата теста на основе ответов пользователя
 */
import { prisma } from "../../../utils/db";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { sessionId } = body;

    // Валидация входных данных
    if (!sessionId) {
      throw createError({
        statusCode: 400,
        statusMessage: "sessionId обязателен",
      });
    }

    // Получаем сессию и ответы
    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId },
      include: {
        answers: true,
      },
    });

    if (!session) {
      throw createError({
        statusCode: 404,
        statusMessage: "Сессия не найдена",
      });
    }

    if (!session.answers || session.answers.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Ответы не найдены",
      });
    }

    // TODO: Реализовать логику расчёта типа результата
    const resultType = calculateResultType(session.answers);

    // TODO: Реализовать генерацию данных результата
    const resultData = generateResultData(resultType);

    // Создаём результат
    const result = await prisma.quizResult.create({
      data: {
        sessionId,
        resultType,
        resultData,
      },
    });

    // Обновляем сессию как завершённую
    await prisma.quizSession.update({
      where: { id: sessionId },
      data: {
        completedAt: new Date(),
      },
    });

    return {
      success: true,
      data: {
        resultId: result.id,
        resultType,
        resultData,
      },
    };
  } catch (error) {
    console.error("Error calculating quiz result:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка расчёта результата",
    });
  }
});

/**
 * TODO: Реализовать логику определения типа результата
 * @param answers - массив ответов пользователя
 * @returns тип результата (например, 'type_A', 'type_B', etc.)
 */
function calculateResultType(answers: any[]) {
  let energyScore = 0; // Вопросы 1-7
  let focusScore = 0; // Вопросы 8-14

  answers.forEach((answer) => {
    const qId = answer.questionId;
    const choice = answer.answer;

    // ЭНЕРГИЯ (вопросы 1-7)
    if (qId === "q1") {
      // Часы работы
      if (choice === "А") energyScore += 1;
      if (choice === "Б") energyScore += 2;
      if (choice === "В") energyScore += 3;
      if (choice === "Г") energyScore += 4;
    }
    if (qId === "q2") {
      // Прокрастинация
      if (choice === "А") energyScore += 4;
      if (choice === "Б") energyScore += 2;
      if (choice === "В") energyScore += 1;
      if (choice === "Г") energyScore += 1;
    }
    if (qId === "q3") {
      // Реализация идей
      if (choice === "А") energyScore += 4;
      if (choice === "Б") energyScore += 2;
      if (choice === "В") energyScore += 3;
      if (choice === "Г") energyScore += 1;
    }
    if (qId === "q4") {
      // Спорт
      if (choice === "А") energyScore += 3;
      if (choice === "Б") energyScore += 1;
      if (choice === "В") energyScore += 4;
      if (choice === "Г") energyScore += 1;
    }
    if (qId === "q5") {
      // Картинка
      if (choice === "А") energyScore += 4;
      if (choice === "Б") energyScore += 2;
      if (choice === "В") energyScore += 4;
      if (choice === "Г") energyScore += 1;
    }
    if (qId === "q6") {
      // Мотивация
      if (choice === "А") energyScore += 4;
      if (choice === "Б") energyScore += 4;
      if (choice === "В") energyScore += 2;
      if (choice === "Г") energyScore += 1;
    }
    if (qId === "q7") {
      // Ленивость (шкала 1-10)
      const value = parseInt(choice) || 5;
      if (value <= 3) energyScore += 4;
      else if (value <= 5) energyScore += 3;
      else if (value <= 7) energyScore += 2;
      else energyScore += 1;
    }

    // ФОКУС (вопросы 8-14)
    if (qId === "q8") {
      // Удержание фокуса (шкала 1-10)
      const value = parseInt(choice) || 5;
      if (value <= 3) focusScore += 4;
      else if (value <= 6) focusScore += 2;
      else focusScore += 1;
    }
    if (qId === "q9") {
      // Перерывы
      if (choice === "А") focusScore += 1;
      if (choice === "Б") focusScore += 2;
      if (choice === "В") focusScore += 3;
      if (choice === "Г") focusScore += 4;
    }
    if (qId === "q10") {
      // Дисциплина
      if (choice === "А") focusScore += 1;
      if (choice === "Б") focusScore += 2;
      if (choice === "В") focusScore += 3;
      if (choice === "Г") focusScore += 4;
    }
    if (qId === "q11") {
      // Новое дело
      if (choice === "А") focusScore += 1;
      if (choice === "Б") focusScore += 4;
      if (choice === "В") focusScore += 3;
      if (choice === "Г") focusScore += 1;
    }
    if (qId === "q12") {
      // Проектов одновременно
      if (choice === "А") focusScore += 1;
      if (choice === "Б") focusScore += 3;
      if (choice === "В") focusScore += 4;
      if (choice === "Г") focusScore += 1;
    }
    if (qId === "q13") {
      // Возврат к задаче
      if (choice === "А") focusScore += 3;
      if (choice === "Б") focusScore += 4;
      if (choice === "В") focusScore += 1;
      if (choice === "Г") focusScore += 2;
    }
    if (qId === "q14") {
      // Предпочтения работы
      if (choice === "А") focusScore += 1;
      if (choice === "Б") focusScore += 4;
      if (choice === "В") focusScore += 2;
      if (choice === "Г") focusScore += 3;
    }
  });

  // Определяем тип по матрице
  const highEnergy = energyScore >= 18;
  const highFocus = focusScore >= 18;

  if (highEnergy && !highFocus) return "impulse";
  if (!highEnergy && highFocus) return "focus";
  if (highEnergy && highFocus) return "titan";
  return "aether";
}

/**
 * TODO: Реализовать генерацию данных результата
 * @param resultType - тип результата
 * @returns объект с данными результата
 */
function generateResultData(resultType: string) {
  const results = {
    impulse: {
      title: "ИМПУЛЬС ⚡",
      type: "impulse",
      description:
        "Живая молния успеха. Ты — чистая энергия в действии. Пока другие думают, ты уже сделал три шага.",
      strengths: [
        "Скорость реакции 3000%",
        "Генератор идей",
        "Антихрупкость",
        "Заразительная энергия",
        "Быстрое обучение",
      ],
      weaknesses: [
        "15 открытых вкладок",
        "Импульсивные решения",
        "Хаотичность",
        "Нетерпеливость",
        "Переоценка сил",
      ],
      recommendations: [
        "Система 1-3-5: 1 основной проект + 3 эксперимента",
        "Найди финишера в команду (тип Фокус)",
        "Работай спринтами 25-45 минут",
        "Создай энергетические ритуалы",
      ],
      careers: [
        "Sales Manager",
        "Event-менеджер",
        "Блогер/Креатор",
        "Стартапы",
      ],
      income: "150,000 - 300,000₽",
      timeline: "3-6 месяцев до стабильного дохода",
    },

    focus: {
      title: "ФОКУС 💎",
      type: "focus",
      description:
        "Лазерный луч точности. Ты — мастер глубины и концентрации. Строишь не быстро, но надолго.",
      strengths: [
        "Лазерная концентрация",
        "Качество 200%",
        "Экспертность",
        "Стратегическое мышление",
        "Надёжность",
      ],
      weaknesses: [
        "Паралич анализа",
        "Медленный старт",
        "Низкая энергетика",
        "Страх ошибок",
        "Перфекционизм",
      ],
      recommendations: [
        "Правило 80% готовности — действуй",
        "Сон 8+ часов, энергетический банк",
        "Работай в биоритмах (3-4 часа фокуса)",
        "Создай MVP быстро",
      ],
      careers: [
        "Senior Developer",
        "Data Analyst",
        "Аналитик",
        "Эксперт-консультант",
      ],
      income: "150,000 - 300,000₽",
      timeline: "6-12 месяцев до экспертного уровня",
    },

    titan: {
      title: "ТИТАН 👑",
      type: "titan",
      description:
        "Неостановимая сила. У тебя есть и энергия молнии, и фокус лазера. Ты устанавливаешь новые стандарты.",
      strengths: [
        "Безграничная производительность",
        "Системное мышление",
        "Магнит талантов",
        "Антивыгорание",
        "Мультипликатор результатов",
      ],
      weaknesses: [
        "Риск выгорания",
        "Перфекционизм в масштабе",
        "Нетерпимость к медленным",
        "Трудоголизм",
        "Изоляция",
      ],
      recommendations: [
        "Системы сильнее героев — автоматизируй",
        "Делегируй 80% дел",
        "Обязательная перезагрузка 2 дня/месяц",
        "Развивай эмпатию к команде",
      ],
      careers: ["CEO", "Growth Manager", "Product Manager", "Co-founder"],
      income: "200,000 - 500,000₽+",
      timeline: "6-12 месяцев до масштаба",
    },

    aether: {
      title: "ЭФИР 🌌",
      type: "aether",
      description:
        "Архитектор будущего. Ты видишь то, чего не видят другие. Создаёшь концепции, которые меняют мир.",
      strengths: [
        "Видение паттернов",
        "Прорывные идеи",
        "Мастер синтеза",
        "Интуитивная мудрость",
        "Работа через людей",
      ],
      weaknesses: [
        "Низкая исполнительность",
        "Прокрастинация",
        "Рассеянность",
        "Низкая энергия",
        "Недооценка своих идей",
      ],
      recommendations: [
        "Найди исполнительскую команду (Титан + Импульсы)",
        'Система "Банк идей" — выбирай 1-2 лучшие',
        "Создавай интеллектуальные продукты (курсы, консалтинг)",
        "Ты — архитектор, другие строят",
      ],
      careers: ["Консультант", "Создатель курсов", "Стратег", "Визионер"],
      income: "100,000 - 300,000₽",
      timeline: "6-12 месяцев до монетизации идей",
    },
  };

  return results[resultType as keyof typeof results] || results.focus;
}
