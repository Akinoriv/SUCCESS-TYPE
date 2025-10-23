/**
 * A/B Testing Middleware
 * Автоматический редирект пользователей на соответствующий вариант landing page
 */
export default defineEventHandler(async (event) => {
  // Проверяем только GET запросы к корню
  if (getMethod(event) !== "GET" || getRouterParam(event, "slug")) {
    return;
  }

  try {
    // Получаем cookie с вариантом
    const abVariant = getCookie(event, "ab_variant");

    if (abVariant) {
      // Если вариант уже назначен, редиректим на него
      return sendRedirect(event, `/landing-${abVariant}`, 302);
    }

    // Получаем список активных вариантов
    const variants = await prisma.landingVariant.findMany({
      where: { isActive: true },
      select: {
        id: true,
        slug: true,
        trafficSplit: true,
      },
    });

    if (variants.length === 0) {
      return; // Нет активных вариантов, показываем дефолтную страницу
    }

    // Выбираем вариант на основе весового распределения
    const selectedVariant = selectVariantByWeight(variants);

    // Генерируем userId если его нет
    let userId = getCookie(event, "user_id");
    if (!userId) {
      userId = crypto.randomUUID();
      setCookie(event, "user_id", userId, {
        maxAge: 365 * 24 * 60 * 60, // 1 год
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
    }

    // Сохраняем назначение варианта
    await prisma.userAssignment.create({
      data: {
        userId,
        variantId: selectedVariant.id,
      },
    });

    // Устанавливаем cookie с вариантом
    setCookie(event, "ab_variant", selectedVariant.slug, {
      maxAge: 30 * 24 * 60 * 60, // 30 дней
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    // Редиректим на выбранный вариант
    return sendRedirect(event, `/landing-${selectedVariant.slug}`, 302);
  } catch (error) {
    console.error("A/B testing middleware error:", error);
    // В случае ошибки показываем дефолтную страницу
    return;
  }
});

/**
 * Выбор варианта на основе весового распределения
 * @param variants - массив вариантов с trafficSplit
 * @returns выбранный вариант
 */
function selectVariantByWeight(variants: any[]) {
  const totalWeight = variants.reduce((sum, v) => sum + v.trafficSplit, 0);
  const random = Math.random() * totalWeight;

  let currentWeight = 0;
  for (const variant of variants) {
    currentWeight += variant.trafficSplit;
    if (random <= currentWeight) {
      return variant;
    }
  }

  // Fallback на первый вариант
  return variants[0];
}
