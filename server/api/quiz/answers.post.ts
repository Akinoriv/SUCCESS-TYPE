/**
 * POST /api/quiz/answers
 * Сохранение ответов пользователя на вопросы теста
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { sessionId, answers } = body;

    // Валидация входных данных
    if (!sessionId || !answers || !Array.isArray(answers)) {
      throw createError({
        statusCode: 400,
        statusMessage: "sessionId и answers (массив) обязательны",
      });
    }

    // Проверяем существование сессии
    const session = await prisma.quizSession.findUnique({
      where: { id: sessionId },
    });

    if (!session) {
      throw createError({
        statusCode: 404,
        statusMessage: "Сессия не найдена",
      });
    }

    // Подготавливаем данные для bulk insert
    const answersData = answers.map((answer: any) => ({
      sessionId,
      questionId: answer.questionId,
      answer: answer.answer,
    }));

    // Сохраняем все ответы
    await prisma.testAnswer.createMany({
      data: answersData,
    });

    return {
      success: true,
      data: {
        savedAnswers: answersData.length,
      },
    };
  } catch (error) {
    console.error("Error saving quiz answers:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка сохранения ответов",
    });
  }
});
