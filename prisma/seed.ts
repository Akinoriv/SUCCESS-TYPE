import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.landingVariant.createMany({
    data: [
      {
        name: "Вариант A",
        slug: "A",
        contentJson: {
          headline: "Узнайте свой тип личности за 5 минут",
          subheadline: "Научный психологический тест",
          ctaText: "Начать тест",
          benefits: [
            { title: "Точность", description: "95% точность" },
            { title: "Быстро", description: "10 вопросов" },
            { title: "Бесплатно", description: "Базовый результат бесплатно" },
          ],
        },
        trafficSplit: 50,
        isActive: true,
      },
      {
        name: "Вариант B",
        slug: "B",
        contentJson: {
          headline: "Раскройте свой потенциал",
          subheadline: "Персональный анализ личности",
          ctaText: "Получить анализ",
          benefits: [
            { title: "Глубина", description: "Детальный анализ" },
            { title: "Наука", description: "Психологические исследования" },
            { title: "Конфиденциально", description: "Данные защищены" },
          ],
        },
        trafficSplit: 50,
        isActive: true,
      },
    ],
  });
  console.log("Seed completed");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
