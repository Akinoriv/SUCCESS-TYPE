/**
 * GET /api/results/[id]
 * Получение результата теста по ID
 */
import { prisma } from '../../../utils/db';

export default defineEventHandler(async (event) => {
  try {
    const resultId = getRouterParam(event, 'id');

    if (!resultId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID результата обязателен'
      });
    }

    // Получаем результат из базы данных
    const result = await prisma.quizResult.findUnique({
      where: { id: resultId },
      include: {
        session: {
          include: {
            user: true
          }
        }
      }
    });

    if (!result) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Результат не найден'
      });
    }

    return {
      success: true,
      data: {
        id: result.id,
        resultType: result.resultType,
        resultData: result.resultData,
        satisfactionScore: result.satisfactionScore,
        createdAt: result.createdAt,
        user: result.session.user ? {
          id: result.session.user.id,
          gender: result.session.user.gender,
          age: result.session.user.age
        } : null
      }
    };
  } catch (error) {
    console.error('Error getting result:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Ошибка получения результата'
    });
  }
});
