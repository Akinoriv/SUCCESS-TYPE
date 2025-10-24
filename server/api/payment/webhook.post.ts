/**
 * POST /api/payment/webhook
 * Обработка webhook от ЮКасса
 */
import { prisma } from "../../../utils/db";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Проверяем тип события
    if (body.event !== "payment.succeeded") {
      return { received: true };
    }

    const payment = body.object;
    if (!payment || !payment.id) {
      throw createError({
        statusCode: 400,
        statusMessage: "Неверный формат webhook",
      });
    }

    // Находим покупку по paymentId
    const purchase = await prisma.purchase.findUnique({
      where: { paymentId: payment.id },
      include: {
        user: true,
        result: true,
      },
    });

    if (!purchase) {
      console.error("Purchase not found for payment:", payment.id);
      return { received: true };
    }

    // Обновляем статус покупки
    await prisma.purchase.update({
      where: { id: purchase.id },
      data: {
        paymentStatus: "succeeded",
        purchasedAt: new Date(),
        paymentData: payment,
      },
    });

    // TODO: Отправить email с PDF результатом
    // await sendResultEmail(purchase.user.email, purchase.result)

    console.log(
      `Payment succeeded for purchase ${purchase.id}, amount: ${purchase.amount}`
    );

    return { received: true };
  } catch (error) {
    console.error("Webhook processing error:", error);

    // Возвращаем 200 даже при ошибке, чтобы ЮКасса не повторял webhook
    return { received: true };
  }
});
