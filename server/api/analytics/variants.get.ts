/**
 * GET /api/analytics/variants
 * Получение метрик A/B тестов
 */
import { prisma } from "../../../utils/db";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const { days = 30 } = query;

    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - Number(days));

    // Получаем статистику по вариантам
    const variantsStats = await prisma.landingVariant.findMany({
      where: { isActive: true },
      include: {
        userAssignments: {
          where: {
            assignedAt: {
              gte: daysAgo,
            },
          },
        },
        _count: {
          select: {
            userAssignments: {
              where: {
                assignedAt: {
                  gte: daysAgo,
                },
              },
            },
          },
        },
      },
    });

    // Получаем события аналитики за период
    const analyticsEvents = await prisma.analyticsEvent.findMany({
      where: {
        timestamp: {
          gte: daysAgo,
        },
        eventType: {
          in: ["START_QUIZ", "QUIZ_COMPLETED", "PAYMENT_INITIATED", "PURCHASE"],
        },
      },
    });

    // Агрегируем метрики по вариантам
    const metrics = variantsStats.map((variant) => {
      const variantEvents = analyticsEvents.filter(
        (event) => event.variantId === variant.id
      );

      const startQuiz = variantEvents.filter(
        (e) => e.eventType === "START_QUIZ"
      ).length;
      const completedQuiz = variantEvents.filter(
        (e) => e.eventType === "QUIZ_COMPLETED"
      ).length;
      const initiatedPayment = variantEvents.filter(
        (e) => e.eventType === "PAYMENT_INITIATED"
      ).length;
      const purchases = variantEvents.filter(
        (e) => e.eventType === "PURCHASE"
      ).length;

      const conversionRate =
        startQuiz > 0 ? (completedQuiz / startQuiz) * 100 : 0;
      const paymentRate =
        completedQuiz > 0 ? (initiatedPayment / completedQuiz) * 100 : 0;
      const purchaseRate =
        initiatedPayment > 0 ? (purchases / initiatedPayment) * 100 : 0;

      return {
        variantId: variant.id,
        name: variant.name,
        slug: variant.slug,
        trafficSplit: variant.trafficSplit,
        visitors: variant._count.userAssignments,
        metrics: {
          startQuiz,
          completedQuiz,
          initiatedPayment,
          purchases,
          conversionRate: Math.round(conversionRate * 100) / 100,
          paymentRate: Math.round(paymentRate * 100) / 100,
          purchaseRate: Math.round(purchaseRate * 100) / 100,
        },
      };
    });

    return {
      success: true,
      data: {
        period: `${days} дней`,
        variants: metrics,
        totalVisitors: metrics.reduce((sum, v) => sum + v.visitors, 0),
      },
    };
  } catch (error) {
    console.error("Error getting analytics variants:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка получения метрик",
    });
  }
});
