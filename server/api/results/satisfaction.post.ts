/**
 * POST /api/results/satisfaction
 * Сохранение оценки удовлетворённости результатом
 */
import { prisma } from "../../../utils/db";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { resultId, satisfactionScore } = body;

    // Валидация входных данных
    if (!resultId || satisfactionScore === undefined) {
      throw createError({
        statusCode: 400,
        statusMessage: "resultId и satisfactionScore обязательны",
      });
    }

    // Проверяем диапазон оценки (1-5)
    if (satisfactionScore < 1 || satisfactionScore > 5) {
      throw createError({
        statusCode: 400,
        statusMessage: "satisfactionScore должен быть от 1 до 5",
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

    // Обновляем оценку удовлетворённости
    const updatedResult = await prisma.quizResult.update({
      where: { id: resultId },
      data: {
        satisfactionScore,
      },
    });

    return {
      success: true,
      data: {
        resultId: updatedResult.id,
        satisfactionScore: updatedResult.satisfactionScore,
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
