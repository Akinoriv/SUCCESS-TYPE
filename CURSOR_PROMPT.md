
# ПРОМПТ ДЛЯ CURSOR AI

Ты — senior full-stack разработчик. Создаёшь Infobiz продукт: quiz-воронку с A/B тестированием landing pages и приёмом платежей.

## СТЕК ТЕХНОЛОГИЙ
- Frontend: Nuxt.js 3 (Vue 3 Composition API)
- Styling: Tailwind CSS
- State: Pinia
- Backend: Nuxt Server API (Nitro engine)
- Database: PostgreSQL + Prisma ORM
- Payment: ЮКасса (@a2seven/yoo-checkout)
- Analytics: Яндекс.Метрика (yandex-metrika-vue3)
- Hosting: Vercel

## АРХИТЕКТУРА (читай PROJECT_ARCHITECTURE.md)

## ПРИНЦИПЫ РАЗРАБОТКИ
1. SOLID — каждый API endpoint одна задача
2. DRY — переиспользуй composables и utils
3. Type Safety — везде TypeScript, строгая типизация
4. Error Handling — все API endpoints с try/catch
5. Validation — проверяй входные данные на backend

## КОД СТАЙЛ
- Vue: Composition API, <script setup>, TypeScript
- Именование: camelCase для переменных, PascalCase для компонентов
- API routes: RESTful (POST для создания, GET для чтения)
- Commits: Conventional Commits (feat:, fix:, refactor:)

## ФАЙЛЫ ДЛЯ СОЗДАНИЯ (В ПОРЯДКЕ ПРИОРИТЕТА)

### БЛОК 1: Инфраструктура
1. nuxt.config.ts — добавить modules: pinia, tailwindcss
2. prisma/schema.prisma — 8 таблиц (см. PRISMA_SCHEMA.md)
3. utils/db.ts — Prisma singleton
4. .env — переменные окружения

### БЛОК 2: Backend API
5. server/api/quiz/sessions.post.ts — создание quiz session
6. server/api/quiz/answers.post.ts — сохранение ответов
7. server/api/results/calculate.post.ts — расчёт результата (TODO: логика)
8. server/api/results/satisfaction.post.ts — satisfaction rating
9. server/api/payment/create.post.ts — создание платежа ЮКасса
10. server/api/payment/webhook.post.ts — обработка webhook
11. server/api/analytics/events.post.ts — логирование событий
12. server/api/analytics/variants.get.ts — метрики A/B тестов
13. server/api/ab-test/get-variants.get.ts — список вариантов
14. server/api/ab-test/assign.post.ts — назначение варианта
15. server/api/ab-test/content/[id].get.ts — контент варианта

### БЛОК 3: A/B Testing Middleware
16. server/middleware/ab-redirect.ts — редирект на landing variant

### БЛОК 4: Utils & Services
17. utils/yookassa.ts — обёртка над YooCheckout API
18. composables/useYandexMetrika.ts — composable для Метрики
19. plugins/yandex-metrika.client.ts — инициализация Метрики

### БЛОК 5: State Management
20. stores/quiz.ts — Pinia store для квиза

### БЛОК 6: UI Components
21. components/Landing/HeroSection.vue — hero с CTA
22. components/Landing/BenefitsSection.vue — блок преимуществ
23. components/Quiz/QuestionCard.vue — карточка вопроса
24. components/Quiz/ProgressBar.vue — прогресс-бар
25. components/Results/SatisfactionRating.vue — 5-звёздочный рейтинг

### БЛОК 7: Pages
26. pages/landing-[variant].vue — динамический landing
27. pages/quiz/[id].vue — страница квиза
28. pages/results/[id].vue — результаты теста
29. pages/payment/[resultId].vue — оплата

### БЛОК 8: Seed Data
30. prisma/seed.ts — тестовые данные (2 landing варианта)

## ПРИ СОЗДАНИИ КАЖДОГО ФАЙЛА:
✓ Проверяй синтаксис TypeScript
✓ Добавляй JSDoc комментарии к функциям
✓ Используй async/await, не .then()
✓ Обрабатывай ошибки через try/catch
✓ В API routes возвращай { success: true } или throw createError()
✓ В Vue компонентах используй defineProps<T>, defineEmits<T>
✓ Все тексты в UI временно на русском (потом i18n)

## ВАЖНО:
- В calculateResultType() и generateResultData() оставь TODO — логику заполнит разработчик
- В pages/quiz/[id].vue вопросы захардкодить временно (потом из БД)
- Webhook ЮКасса требует ngrok для локальной разработки
- Не создавай .env файл с реальными ключами — только .env.example

## ТЕСТИРОВАНИЕ:
После создания файлов выполни:
```bash
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Открой http://localhost:3000 — должен редирект на /landing-A или /landing-B

## ЕСЛИ ОШИБКИ:
1. Проверь imports — Nuxt auto-import не всё импортирует
2. Проверь prisma generate — должен быть выполнен
3. Проверь .env — все переменные установлены?
4. Проверь DATABASE_URL — подключение к Supabase работает?

Начинай с БЛОКА 1. После каждого блока спрашивай: "Блок N завершён, продолжать?"
