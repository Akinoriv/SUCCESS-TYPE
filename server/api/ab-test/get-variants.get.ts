/**
 * GET /api/ab-test/get-variants
 * Получение списка активных вариантов для A/B тестирования
 */

import { prisma } from "../../../utils/db";

export default defineEventHandler(async (event) => {
  try {
    // Получаем все активные варианты
    const variants = await prisma.landingVariant.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        trafficSplit: true,
        contentJson: true,
      },
      orderBy: { createdAt: "asc" },
    });

    if (variants.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Активные варианты не найдены",
      });
    }

    return {
      success: true,
      data: {
        variants,
      },
    };
  } catch (error) {
    console.error("Error getting A/B test variants:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка получения вариантов",
    });
  }
});
