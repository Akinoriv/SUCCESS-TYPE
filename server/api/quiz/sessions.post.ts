/**
 * POST /api/quiz/sessions
 * Создание новой сессии прохождения теста
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { userId, quizId } = body;

    // Валидация входных данных
    if (!userId || !quizId) {
      throw createError({
        statusCode: 400,
        statusMessage: "userId и quizId обязательны",
      });
    }

    // Получаем IP адрес пользователя
    const ipAddress = getClientIP(event);

    // Создаём новую сессию
    const session = await prisma.quizSession.create({
      data: {
        userId,
        quizId,
        ipAddress,
      },
    });

    return {
      success: true,
      data: {
        sessionId: session.id,
        startedAt: session.startedAt,
      },
    };
  } catch (error) {
    console.error("Error creating quiz session:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка создания сессии теста",
    });
  }
});
