/**
 * POST /api/quiz/sessions
 * Создание новой сессии прохождения теста
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { userId, quizId, profileData } = body;

    // Валидация входных данных
    if (!userId || !quizId) {
      throw createError({
        statusCode: 400,
        statusMessage: "userId и quizId обязательны",
      });
    }

    // Получаем IP адрес пользователя
    const ipAddress = getClientIP(event);

    // Создаём или обновляем пользователя с profileData
    let user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          gender: profileData?.gender,
          age: profileData?.age,
          profileData: profileData || {},
        },
      });
    } else if (profileData) {
      user = await prisma.user.update({
        where: { id: userId },
        data: {
          gender: profileData.gender || user.gender,
          age: profileData.age || user.age,
          profileData: { ...user.profileData, ...profileData },
        },
      });
    }

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
        userId: user.id,
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
