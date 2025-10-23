import { YooCheckout } from "@a2seven/yoo-checkout";

const config = useRuntimeConfig();

/**
 * Создание экземпляра ЮКасса
 */
export function createYooKassaClient() {
  return new YooCheckout({
    shopId: config.yookassaShopId,
    secretKey: config.yookassaSecretKey,
  });
}

/**
 * Создание платежа в ЮКасса
 * @param amount - сумма в рублях
 * @param description - описание платежа
 * @param returnUrl - URL для возврата после оплаты
 * @param metadata - дополнительные данные
 */
export async function createPayment(
  amount: number,
  description: string,
  returnUrl: string,
  metadata: Record<string, any> = {}
) {
  try {
    const yooKassa = createYooKassaClient();

    const payment = await yooKassa.createPayment({
      amount: {
        value: amount.toFixed(2),
        currency: "RUB",
      },
      confirmation: {
        type: "redirect",
        return_url: returnUrl,
      },
      description,
      metadata,
    });

    return payment;
  } catch (error) {
    console.error("YooKassa payment creation error:", error);
    throw new Error("Ошибка создания платежа");
  }
}

/**
 * Получение информации о платеже
 * @param paymentId - ID платежа в ЮКасса
 */
export async function getPaymentInfo(paymentId: string) {
  try {
    const yooKassa = createYooKassaClient();
    const payment = await yooKassa.getPayment(paymentId);
    return payment;
  } catch (error) {
    console.error("YooKassa payment info error:", error);
    throw new Error("Ошибка получения информации о платеже");
  }
}

/**
 * Проверка статуса платежа
 * @param paymentId - ID платежа в ЮКасса
 */
export async function checkPaymentStatus(paymentId: string) {
  try {
    const payment = await getPaymentInfo(paymentId);
    return payment.status;
  } catch (error) {
    console.error("YooKassa status check error:", error);
    return "unknown";
  }
}
