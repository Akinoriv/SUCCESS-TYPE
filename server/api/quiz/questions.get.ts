/**
 * GET /api/quiz/questions
 * Получение персонализированных вопросов квиза
 */
import { prisma } from "../../../utils/db";
import { personalizeQuestions } from "../../../utils/personalization";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { userId } = query;

    let user = null;

    // Если передан userId, загружаем данные пользователя
    if (userId && typeof userId === "string") {
      user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          gender: true,
          age: true,
          profileData: true,
        },
      });
    }

    // Получаем все вопросы, отсортированные по порядку
    const questions = await prisma.question.findMany({
      orderBy: { order: "asc" },
      select: {
        id: true,
        order: true,
        textDefault: true,
        variations: true,
        type: true,
        options: true,
        dimension: true,
      },
    });

    // Персонализируем вопросы
    const personalizedQuestions = personalizeQuestions(questions, user);

    return {
      success: true,
      data: {
        questions: personalizedQuestions,
        user: user
          ? {
              id: user.id,
              gender: user.gender,
              age: user.age,
            }
          : null,
      },
    };
  } catch (error) {
    console.error("Error getting quiz questions:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка получения вопросов",
    });
  }
});
