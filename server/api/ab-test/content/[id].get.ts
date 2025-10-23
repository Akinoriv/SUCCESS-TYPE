/**
 * GET /api/ab-test/content/[id]
 * Получение контента варианта по slug
 */
export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, "id");

    if (!slug) {
      throw createError({
        statusCode: 400,
        statusMessage: "Slug варианта обязателен",
      });
    }

    // Находим вариант по slug
    const variant = await prisma.landingVariant.findUnique({
      where: {
        slug,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        contentJson: true,
        trafficSplit: true,
      },
    });

    if (!variant) {
      throw createError({
        statusCode: 404,
        statusMessage: "Вариант не найден",
      });
    }

    return {
      success: true,
      data: {
        variantId: variant.id,
        name: variant.name,
        slug: variant.slug,
        content: variant.contentJson,
        trafficSplit: variant.trafficSplit,
      },
    };
  } catch (error) {
    console.error("Error getting variant content:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка получения контента",
    });
  }
});
