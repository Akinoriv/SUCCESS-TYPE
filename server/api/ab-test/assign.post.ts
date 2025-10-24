/**
 * POST /api/ab-test/assign
 * Назначение варианта пользователю для A/B тестирования
 */
import { prisma } from "../../../utils/db";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { userId, variantId } = body;

    // Валидация входных данных
    if (!userId || !variantId) {
      throw createError({
        statusCode: 400,
        statusMessage: "userId и variantId обязательны",
      });
    }

    // Проверяем существование варианта
    const variant = await prisma.landingVariant.findUnique({
      where: { id: variantId },
    });

    if (!variant || !variant.isActive) {
      throw createError({
        statusCode: 404,
        statusMessage: "Вариант не найден или неактивен",
      });
    }

    // Проверяем, не назначен ли уже вариант этому пользователю
    const existingAssignment = await prisma.userAssignment.findUnique({
      where: {
        userId_variantId: {
          userId,
          variantId,
        },
      },
    });

    if (existingAssignment) {
      return {
        success: true,
        data: {
          assignmentId: existingAssignment.id,
          variantId: existingAssignment.variantId,
          assignedAt: existingAssignment.assignedAt,
        },
      };
    }

    // Создаём назначение
    const assignment = await prisma.userAssignment.create({
      data: {
        userId,
        variantId,
      },
    });

    return {
      success: true,
      data: {
        assignmentId: assignment.id,
        variantId: assignment.variantId,
        assignedAt: assignment.assignedAt,
      },
    };
  } catch (error) {
    console.error("Error assigning A/B test variant:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка назначения варианта",
    });
  }
});
