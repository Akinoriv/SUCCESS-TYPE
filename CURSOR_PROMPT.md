# ПРОМПТ ДЛЯ CURSOR AI

Ты — senior full-stack разработчик. Создаёшь Infobiz продукт: quiz-воронку с A/B тестированием landing pages и приёмом платежей.

## СТЕК ТЕХНОЛОГИЙ

- Frontend: Nuxt.js 4 (Vue 3 Composition API)
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

## СТАТУС РЕАЛИЗАЦИИ

### ✅ БЛОК 1: Инфраструктура (100%)

1. ✅ nuxt.config.ts
2. ✅ prisma/schema.prisma — 8+ таблиц + Question
3. ✅ utils/db.ts
4. ✅ .env

### ✅ БЛОК 2: Backend API (90%)

5. ✅ server/api/quiz/sessions.post.ts
6. ✅ server/api/quiz/questions.get.ts — с персонализацией
7. ✅ server/api/quiz/answers.post.ts
8. ✅ server/api/results/calculate.post.ts — полная логика
9. ✅ server/api/results/satisfaction.post.ts — с текстовыми отзывами
10. ⏳ server/api/payment/create.post.ts — отложено после тестирования
11. ⏳ server/api/payment/webhook.post.ts — отложено
12. ⏳ server/api/analytics/events.post.ts — планируется
13. ⏳ server/api/analytics/variants.get.ts — планируется

### ✅ БЛОК 3: Utils & Personalization (100%)

14. ✅ utils/personalization.ts — personalizeQuestions, personalizeOptions
15. ✅ utils/db.ts

### ✅ БЛОК 4: State Management (100%)

16. ✅ stores/quiz.ts — Pinia store с sessionId, answers

### ✅ БЛОК 5: UI Components (100%)

17. ✅ components/Quiz/QuestionCard.vue
18. ✅ components/Quiz/ProgressBar.vue

### ✅ БЛОК 6: Pages (95%)

19. ✅ app/pages/index.vue — обновлённый landing с legal disclaimers
20. ✅ app/pages/quiz/onboarding.vue — с согласием на обработку данных
21. ✅ app/pages/quiz/questions.vue — с новым дизайном
22. ✅ app/pages/quiz/result.vue — с полным дизайном и feedback формой
23. ✅ app/pages/privacy.vue
24. ✅ app/pages/terms.vue
25. ✅ app/pages/disclaimer.vue

### ✅ БЛОК 7: Seed Data (100%)

26. ✅ prisma/seed-quiz.ts — 14 вопросов с variations

---

## СЛЕДУЮЩИЕ ЗАДАЧИ

### 🔥 Высокий приоритет:

1. **Вставить полные тексты** из `_ЭНЕРГОТИПИНГ.txt` в функции `getPlan30Days()`, `getMonetization()`, `getTeamBuilding()`
2. **Протестировать на реальных пользователях** и собрать feedback
3. **Проанализировать satisfactionScore** по типам результатов
4. **Настроить Яндекс.Метрику** — цели, события, воронки
5. **Мобильная адаптация** — проверить responsive design

### 📋 Средний приоритет:

6. **Активировать ЮКассу** после положительных отзывов (server/api/payment/)
7. **Admin dashboard** для просмотра статистики
8. **Email-уведомления** (Unisender)
9. **PDF-генерация** для расширенных отчётов
10. **A/B тестирование** landing pages

## ПРИ СОЗДАНИИ КАЖДОГО ФАЙЛА:

✓ Проверяй наличие похожего файла в проекте
✓ Проверяй синтаксис TypeScript
✓ Добавляй JSDoc комментарии к функциям
✓ Используй async/await, не .then()
✓ Обрабатывай ошибки через try/catch
✓ В API routes возвращай { success: true } или throw createError()
✓ В Vue компонентах используй defineProps<T>, defineEmits<T>
✓ Все тексты в UI временно на русском (потом i18n)
✓ Не писать простыни
✓ Не хардкодить то что должно быть в БД

## ВАЖНО:

- В calculateResultType() и generateResultData() логика подсчета результата теста.
- Webhook ЮКасса требует ngrok для локальной разработки
- **Платная часть временно бесплатна** — для тестирования и сбора обратной связи
- Все тексты результатов хранятся в `_ЭНЕРГОТИПИНГ.txt` — использовать как источник правды
- Персонализация работает на уровне вопросов И ответов (male/female variations)

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
