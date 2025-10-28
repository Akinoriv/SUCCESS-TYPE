/**
 * POST /api/results/satisfaction
 * Сохранение оценки удовлетворённости результатом
 */
import { prisma } from "../../../utils/db";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { resultId, rating, feedback } = body;

    // Валидация входных данных
    if (!resultId || rating === undefined) {
      throw createError({
        statusCode: 400,
        statusMessage: "resultId и rating обязательны",
      });
    }

    // Проверяем диапазон оценки (1-5)
    if (rating < 1 || rating > 5) {
      throw createError({
        statusCode: 400,
        statusMessage: "rating должен быть от 1 до 5",
      });
    }

    // Проверяем существование результата
    const result = await prisma.quizResult.findUnique({
      where: { id: resultId },
    });

    if (!result) {
      throw createError({
        statusCode: 404,
        statusMessage: "Результат не найден",
      });
    }

    // Обновляем оценку удовлетворённости и текст отзыва
    const updatedResult = await prisma.quizResult.update({
      where: { id: resultId },
      data: {
        satisfactionScore: rating,
        satisfactionFeedback: feedback || null,
      },
    });

    return {
      success: true,
      data: {
        resultId: updatedResult.id,
        satisfactionScore: updatedResult.satisfactionScore,
        satisfactionFeedback: updatedResult.satisfactionFeedback,
      },
    };
  } catch (error) {
    console.error("Error updating satisfaction score:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка сохранения оценки",
    });
  }
});
