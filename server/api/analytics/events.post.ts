/**
 * POST /api/analytics/events
 * Логирование событий для аналитики
 */
import { prisma } from "../../../utils/db";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { eventType, userId, sessionId, variantId, eventData } = body;

    // Валидация входных данных
    if (!eventType) {
      throw createError({
        statusCode: 400,
        statusMessage: "eventType обязателен",
      });
    }

    // Получаем IP адрес для дополнительной аналитики
    const ipAddress = getClientIP(event);

    // Создаём событие аналитики
    const analyticsEvent = await prisma.analyticsEvent.create({
      data: {
        eventType,
        userId: userId || null,
        sessionId: sessionId || null,
        variantId: variantId || null,
        eventData: eventData || null,
      },
    });

    return {
      success: true,
      data: {
        eventId: analyticsEvent.id,
        timestamp: analyticsEvent.timestamp,
      },
    };
  } catch (error) {
    console.error("Error logging analytics event:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка логирования события",
    });
  }
});
