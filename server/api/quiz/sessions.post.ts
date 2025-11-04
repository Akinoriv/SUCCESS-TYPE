/**
 * POST /api/quiz/sessions
 * Создание новой сессии прохождения теста
 */
import { prisma } from "../../../utils/db";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { 
      userId, 
      quizId, 
      profileData,
      // Landing tracking
      landingSource,
      utmSource,
      utmMedium,
      utmCampaign,
    } = body;

    // Валидация входных данных
    if (!userId || !quizId) {
      throw createError({
        statusCode: 400,
        statusMessage: "userId и quizId обязательны",
      });
    }

    // Получаем IP адрес пользователя
    const ipAddress =
      getHeader(event, "x-forwarded-for") ||
      getHeader(event, "x-real-ip") ||
      "unknown";

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

    // Определяем landing category из landingSource (например, "courses" или "courses-a")
    const landingCategory = landingSource 
      ? landingSource.split('-')[0] 
      : 'general';

    // Создаём новую сессию с tracking данными
    const session = await prisma.quizSession.create({
      data: {
        userId,
        quizId,
        ipAddress,
        // Landing tracking
        landingCategory: landingCategory,
        landingVariant: landingSource || null,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
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
