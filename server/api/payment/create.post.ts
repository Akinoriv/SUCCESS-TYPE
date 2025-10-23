/**
 * POST /api/payment/create
 * Создание платежа через ЮКасса
 */
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { resultId, amount = 990 } = body;

    // Валидация входных данных
    if (!resultId) {
      throw createError({
        statusCode: 400,
        statusMessage: "resultId обязателен",
      });
    }

    // Проверяем существование результата
    const result = await prisma.quizResult.findUnique({
      where: { id: resultId },
      include: {
        session: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!result) {
      throw createError({
        statusCode: 404,
        statusMessage: "Результат не найден",
      });
    }

    // Проверяем, не создан ли уже платёж для этого результата
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        resultId,
        paymentStatus: {
          in: ["pending", "succeeded"],
        },
      },
    });

    if (existingPurchase) {
      throw createError({
        statusCode: 400,
        statusMessage: "Платёж для этого результата уже создан",
      });
    }

    const config = useRuntimeConfig();
    const returnUrl = `${config.public.appUrl}/payment/success`;

    // Создаём платёж в ЮКасса
    const payment = await createPayment(
      amount,
      `Полный анализ результата теста - ${resultId}`,
      returnUrl,
      {
        resultId,
        userId: result.session.userId,
      }
    );

    // Сохраняем информацию о покупке
    const purchase = await prisma.purchase.create({
      data: {
        userId: result.session.userId,
        resultId,
        amount,
        paymentId: payment.id,
        paymentStatus: "pending",
        gateway: "yookassa",
        paymentData: payment,
      },
    });

    return {
      success: true,
      data: {
        purchaseId: purchase.id,
        paymentId: payment.id,
        confirmationUrl: payment.confirmation?.confirmation_url,
        amount,
      },
    };
  } catch (error) {
    console.error("Error creating payment:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Ошибка создания платежа",
    });
  }
});
