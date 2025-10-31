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

    // Получаем все вопросы для расчета
    const questions = await prisma.question.findMany({
      orderBy: { order: "asc" },
      select: {
        id: true,
        order: true,
        dimension: true,
        options: true,
        type: true,
      },
    });

    // Расчёт типа результата
    const resultType = calculateResultType(session.answers, questions);

    // Генерация данных результата
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
 * Расчёт типа результата на основе ответов пользователя
 * @param answers - массив ответов пользователя
 * @param questions - массив вопросов из БД
 * @returns тип результата ('impulse', 'focus', 'titan', 'aether')
 */
function calculateResultType(answers: any[], questions: any[]) {
  let energyScore = 0;
  let focusScore = 0;

  // Создаём карту вопросов для быстрого доступа
  const questionMap = new Map(
    questions.map((q) => [q.id, { ...q, options: q.options as any }])
  );

  // Проходим по каждому ответу
  answers.forEach((answer) => {
    const question = questionMap.get(answer.questionId);
    if (!question) return;

    const dimension = question.dimension;
    const choice = answer.answer;

    // Для scale типа
    if (question.type === "scale") {
      const value = parseInt(choice) || 5;
      let score = 0;

      // Логика подсчета для scale вопросов
      if (dimension === "energy") {
        // Вопрос 7: ленивость (инвертируем - меньше ленивости = больше энергии)
        if (value <= 3) score = 4;
        else if (value <= 5) score = 3;
        else if (value <= 7) score = 2;
        else score = 1;
        energyScore += score;
      } else if (dimension === "focus") {
        // Вопрос 8: сложность удержания фокуса (инвертируем - легче фокус = больше баллов)
        if (value <= 3) score = 4;
        else if (value <= 6) score = 2;
        else score = 1;
        focusScore += score;
      }
    }
    // Для choice типа используем score из опций
    else if (question.type === "choice") {
      const options = question.options;
      if (
        options &&
        options[choice] &&
        typeof options[choice].score === "number"
      ) {
        const score = options[choice].score;

        if (dimension === "energy") {
          energyScore += score;
        } else if (dimension === "focus") {
          focusScore += score;
        }
      }
    }
  });

  // Определяем тип по матрице
  // Максимум для каждого измерения: 7 вопросов * 4 балла = 28 баллов
  // Порог "высокого" уровня: 21 баллов (75% от максимума)
  // При среднем 17.3/17.0 это дает правильное распределение:
  // ИМПУЛЬС ~25%, ФОКУС ~25%, ТИТАН ~10-15% (редко!), ЭФИР ~35-40%
  const highEnergy = energyScore >= 21;
  const highFocus = focusScore >= 21;

  if (highEnergy && !highFocus) return "impulse";
  if (!highEnergy && highFocus) return "focus";
  if (highEnergy && highFocus) return "titan";
  return "aether";
}

/**
 * Генерация данных результата на основе типа
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
