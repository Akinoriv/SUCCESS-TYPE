
# Создам промпт для Cursor и архитектурный документ

cursor_prompt = """
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
"""

# Сохранить промпт
with open('CURSOR_PROMPT.md', 'w', encoding='utf-8') as f:
    f.write(cursor_prompt)

print("✅ CURSOR_PROMPT.md создан")
print("\n" + "="*80 + "\n")

# Создать архитектурный документ
architecture_doc = """
# PROJECT ARCHITECTURE

## ОБЗОР ПРОДУКТА

**Название:** Infobiz Quiz Funnel  
**Цель:** Генерация лидов через психологический тест с платной углубленной версией результатов  
**Монетизация:** Продажа PDF-отчёта за 990₽ после бесплатного базового результата  
**Целевая аудитория:** РФ (потом масштабирование на EN рынок)

## БИЗНЕС-ЛОГИКА

### User Flow
1. **Landing Page** (A/B тест вариантов) → CTA "Начать тест"
2. **Quiz** (10 вопросов) → прогресс-бар, сохранение ответов
3. **Results Page** → базовый результат + satisfaction rating
4. **Offer** → предложение купить полный анализ (990₽)
5. **Payment** → ЮКасса (МИР, СБП, карты)
6. **Webhook** → отправка email с PDF (TODO: later)

### A/B Testing Strategy
- Cookie-based (30 дней)
- Weighted distribution (Вариант A: 50%, B: 50%)
- Метрики: CR (landing → quiz), CR (quiz → payment)
- Цель: найти вариант с максимальной конверсией

### Analytics Goals (Яндекс.Метрика)
- `START_QUIZ` — клик CTA на landing
- `QUIZ_COMPLETED` — завершение теста
- `PAYMENT_INITIATED` — клик "Купить"
- `PURCHASE` — успешная оплата

## ТЕХНИЧЕСКАЯ АРХИТЕКТУРА

### Frontend Layer (Nuxt.js 3)
```
pages/
├─ landing-[variant].vue    → SSG, статическая генерация
├─ quiz/[id].vue             → SSR, динамическая страница
├─ results/[id].vue          → SSR, персональный результат
└─ payment/[resultId].vue    → SSR, форма оплаты

components/
├─ Landing/
│  ├─ HeroSection.vue
│  └─ BenefitsSection.vue
├─ Quiz/
│  ├─ QuestionCard.vue
│  └─ ProgressBar.vue
└─ Results/
   └─ SatisfactionRating.vue

stores/
└─ quiz.ts                   → Pinia store (sessionId, answers, result)

composables/
└─ useYandexMetrika.ts       → reachGoal(), setParams()
```

### Backend Layer (Nuxt Nitro)
```
server/
├─ api/
│  ├─ quiz/
│  │  ├─ sessions.post.ts      → CREATE quiz_sessions
│  │  └─ answers.post.ts       → CREATE test_answers (bulk)
│  ├─ results/
│  │  ├─ calculate.post.ts     → CREATE quiz_results
│  │  └─ satisfaction.post.ts  → UPDATE satisfaction_score
│  ├─ payment/
│  │  ├─ create.post.ts        → YooKassa createPayment
│  │  └─ webhook.post.ts       → YooKassa webhook handler
│  ├─ analytics/
│  │  ├─ events.post.ts        → CREATE analytics_events
│  │  ├─ funnel.get.ts         → Aggregate stats
│  │  └─ variants.get.ts       → A/B test metrics
│  └─ ab-test/
│     ├─ get-variants.get.ts   → READ landing_variants
│     ├─ assign.post.ts        → CREATE user_assignments
│     └─ content/[id].get.ts   → READ contentJson by slug
│
└─ middleware/
   └─ ab-redirect.ts           → Cookie check → redirect to /landing-{variant}

utils/
├─ db.ts                       → Prisma singleton
└─ yookassa.ts                 → createPayment(), getPaymentInfo()
```

### Database Schema (PostgreSQL)

**users** — Пользователи (созданы при первом посещении)
- id, email, age, gender, createdAt

**quiz_sessions** — Сессии прохождения тестов
- id, userId, quizId, startedAt, completedAt, ipAddress

**quiz_results** — Результаты тестов (расчёт на основе test_answers)
- id, sessionId (FK), resultType, resultData (JSON), satisfactionScore

**test_answers** — Сырые ответы на вопросы
- id, sessionId (FK), questionId, answer, timestamp

**purchases** — Покупки дополнительных результатов
- id, userId (FK), resultId (FK), amount, paymentId, paymentStatus, gateway, paymentData (JSON)

**landing_variants** — Варианты landing pages для A/B тестов
- id, name, slug, contentJson (JSON), isActive, trafficSplit

**user_assignments** — Назначение вариантов пользователям
- id, userId (FK), variantId (FK), assignedAt, converted

**analytics_events** — События для аналитики
- id, eventType, userId, sessionId, variantId, eventData (JSON), timestamp

### External Services Integration

**ЮКасса (YooCheckout API)**
- SDK: @a2seven/yoo-checkout
- Методы оплаты: МИР, СБП, банковские карты, SberPay, Tinkoff Pay
- Webhook: /api/payment/webhook (обработка payment.succeeded)
- Чеки 54-ФЗ: автоматическая отправка

**Яндекс.Метрика**
- SDK: yandex-metrika-vue3
- Features: clickmap, webvisor, accurateTrackBounce
- Goals: настроены в интерфейсе Метрики
- Параметры визита: { variant: 'A' } для сегментации

**Supabase (PostgreSQL hosting)**
- Connection pooling
- Auto backups
- Free tier: 500MB, 2GB bandwidth

**Vercel (Hosting)**
- Serverless Functions (Nitro)
- Auto-scaling
- CI/CD from GitHub
- Edge Network CDN

## DATA FLOW DIAGRAMS

### Quiz Completion Flow
```
User → pages/quiz/[id].vue
  ↓ onMounted()
  → POST /api/quiz/sessions { userId, quizId }
  → sessionId сохранён в Pinia store
  
User answers Q1 → quizStore.saveAnswer('q1', 'answer_a')
User answers Q2 → quizStore.saveAnswer('q2', 'answer_b')
...
User clicks "Завершить"
  ↓
  → POST /api/quiz/answers { sessionId, answers: [...] }
  → Bulk insert в test_answers
  ↓
  → POST /api/results/calculate { sessionId }
  → Fetch test_answers
  → calculateResultType(answers) → 'type_A'
  → generateResultData('type_A') → JSON
  → INSERT quiz_results
  → UPDATE quiz_sessions.completedAt
  ↓
  → redirect to /results/[resultId]
```

### Payment Flow
```
User on /results/[id] → clicks "Купить за 990₽"
  ↓
  → redirect to /payment/[resultId]
  ↓
User clicks "Перейти к оплате"
  ↓
  → POST /api/payment/create { resultId, amount: 990 }
  → YooKassa.createPayment()
  → INSERT purchases (status: 'pending')
  → return { confirmationUrl }
  ↓
  → window.location.href = confirmationUrl
  ↓
User pays on YooKassa
  ↓
YooKassa → POST /api/payment/webhook { event: 'payment.succeeded', object: { id } }
  ↓
  → YooKassa.getPaymentInfo(id)
  → UPDATE purchases SET status='completed', purchasedAt=NOW()
  → TODO: Send email with PDF
  ↓
  → return { received: true }
```

### A/B Test Assignment Flow
```
User visits https://yourdomain.ru/
  ↓
server/middleware/ab-redirect.ts
  ↓
Check cookie 'ab_variant'?
  ├─ YES → redirect to /landing-{variant}
  └─ NO → 
      → GET /api/ab-test/get-variants
      → selectByWeight(variants) → Вариант B
      → setCookie('ab_variant', 'B', 30 days)
      → Generate user_id (UUID) → setCookie('user_id', uuid, 365 days)
      → POST /api/ab-test/assign { userId, variantId }
      → redirect to /landing-B
```

## SCALING STRATEGY

### Current (MVP): Russia-only
- Payment: ЮКасса (RUB)
- Analytics: Яндекс.Метрика
- Currency: RUB only
- Language: Russian

### Future: International
**Phase 1: Add Stripe** (2-3 hours)
- Create utils/payment-adapter.ts (interface PaymentGateway)
- Implement StripeAdapter, YooKassaAdapter
- Auto-detect country by IP → select gateway

**Phase 2: Multi-currency** (1 hour)
- Add currency field to purchases table
- Support USD, EUR, RUB
- Dynamic pricing based on country

**Phase 3: i18n** (4-5 hours)
- Install @nuxtjs/i18n
- Extract all texts to locales/ru.json, locales/en.json
- Auto-detect language from browser

**Phase 4: Multi-region analytics** (2 hours)
- Add Google Analytics for non-RU users
- Keep Yandex.Metrika for RU users
- Unified interface: useAnalytics() composable

**Total: ~10-15 hours** (architecture не меняется)

## PERFORMANCE TARGETS

- Landing Page: Time to First Paint < 1s (SSG)
- Quiz Page: Interactive < 2s (SSR)
- API Response: < 200ms (serverless)
- Database Queries: < 50ms (indexed)

## SECURITY

- HTTPS only (Vercel enforces)
- SQL Injection: protected by Prisma ORM
- CSRF: Nuxt auto-handles
- Rate Limiting: TODO (add middleware)
- Webhook Validation: check YooKassa IP whitelist

## MONITORING (Future)

- Sentry для error tracking
- Vercel Analytics для performance
- Uptime monitoring (UptimeRobot)

## BACKUP & DISASTER RECOVERY

- Supabase: auto daily backups (retention: 7 days)
- Git: код в GitHub (private repo)
- Environment Variables: дублированы локально (password manager)

## COST ESTIMATION

**MVP (0-1000 users/month):**
- Supabase: Free tier ($0)
- Vercel: Free tier ($0)
- ЮКасса: 2.8% per transaction
- Яндекс.Метрика: Free ($0)
- **Total: $0-30/month**

**Growth (10k users/month):**
- Supabase Pro: $25/month
- Vercel Pro: $20/month
- ЮКасса: 2.8% × revenue
- **Total: $45-100/month + commissions**

## DEVELOPMENT PHASES

**Phase 1: MVP (140 hours solo, 35-50 hours with AI)**
- All core features
- Russia-only
- Manual testing

**Phase 2: Optimization (20 hours)**
- Admin panel (Prisma Studio + custom dashboard)
- Email integration (Unisender)
- Error monitoring (Sentry)

**Phase 3: Scale (15 hours)**
- International payments (Stripe)
- Multi-language (i18n)
- Advanced analytics

## KEY DECISIONS & RATIONALE

**Why Nuxt.js?**
- Developer knows Vue.js (faster than learning React)
- SSR/SSG out of the box (SEO critical)
- Nitro serverless backend (no separate Node server)

**Why ЮКasca not Stripe?**
- Target market is Russia (ЮКасса = market leader)
- Support for МИР cards, СБП (System of Fast Payments)
- Auto-generation of fiscal receipts (54-ФЗ compliance)

**Why Cookie-based A/B not database session?**
- Faster (no DB roundtrip on every pageview)
- Works before user registration
- Standard approach for landing page optimization

**Why separate quiz_sessions and quiz_results?**
- User can retake test multiple times
- Need history of all attempts
- Analytics on retake rate

**Why user_assignments table not field in users?**
- Support multiple simultaneous A/B tests
- Track assignment history
- Easy analytics queries

## TODO (Post-MVP)

- [ ] Email sending (Unisender integration)
- [ ] PDF generation (puppeteer or external service)
- [ ] Admin dashboard (view A/B stats)
- [ ] Rate limiting middleware
- [ ] Automated testing (Playwright E2E)
- [ ] Quiz questions in database (not hardcoded)
- [ ] Multiple quiz types support
- [ ] Referral system (optional)
- [ ] Abandoned cart recovery (optional)

## CONTACT & SUPPORT

- Prisma Docs: https://www.prisma.io/docs
- Nuxt Docs: https://nuxt.com/docs
- YooKassa API: https://yookassa.ru/developers
- Yandex.Metrika: https://metrika.yandex.ru/
"""

with open('PROJECT_ARCHITECTURE.md', 'w', encoding='utf-8') as f:
    f.write(architecture_doc)

print("✅ PROJECT_ARCHITECTURE.md создан")
print("\n" + "="*80 + "\n")

# Создать краткую справку по Prisma схеме
prisma_schema_doc = """
# PRISMA SCHEMA REFERENCE

Скопируй эту схему в `prisma/schema.prisma` после `npx prisma init`.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id              String          @id @default(uuid())
  email           String?
  age             Int?
  gender          String?
  createdAt       DateTime        @default(now())
  quizSessions    QuizSession[]
  purchases       Purchase[]
  userAssignments UserAssignment[]
  @@map("users")
}

model QuizSession {
  id          String       @id @default(uuid())
  userId      String
  quizId      String
  startedAt   DateTime     @default(now())
  completedAt DateTime?
  ipAddress   String?
  user        User         @relation(fields: [userId], references: [id])
  answers     TestAnswer[]
  result      QuizResult?
  @@map("quiz_sessions")
}

model QuizResult {
  id                String      @id @default(uuid())
  sessionId         String      @unique
  resultType        String
  resultData        Json
  satisfactionScore Int?
  createdAt         DateTime    @default(now())
  session           QuizSession @relation(fields: [sessionId], references: [id])
  purchases         Purchase[]
  @@map("quiz_results")
}

model TestAnswer {
  id         String      @id @default(uuid())
  sessionId  String
  questionId String
  answer     String
  timestamp  DateTime    @default(now())
  session    QuizSession @relation(fields: [sessionId], references: [id])
  @@map("test_answers")
}

model Purchase {
  id            String     @id @default(uuid())
  userId        String
  resultId      String
  amount        Float
  paymentId     String     @unique
  paymentStatus String     @default("pending")
  gateway       String     @default("yookassa")
  paymentData   Json?
  createdAt     DateTime   @default(now())
  purchasedAt   DateTime?
  user          User       @relation(fields: [userId], references: [id])
  result        QuizResult @relation(fields: [resultId], references: [id])
  @@map("purchases")
}

model LandingVariant {
  id              String           @id @default(uuid())
  name            String
  slug            String           @unique
  contentJson     Json
  isActive        Boolean          @default(true)
  trafficSplit    Int              @default(100)
  createdAt       DateTime         @default(now())
  userAssignments UserAssignment[]
  @@map("landing_variants")
}

model UserAssignment {
  id         String         @id @default(uuid())
  userId     String
  variantId  String
  assignedAt DateTime       @default(now())
  converted  Boolean        @default(false)
  user       User           @relation(fields: [userId], references: [id])
  variant    LandingVariant @relation(fields: [variantId], references: [id])
  @@unique([userId, variantId])
  @@map("user_assignments")
}

model AnalyticsEvent {
  id        String   @id @default(uuid())
  eventType String
  userId    String?
  sessionId String?
  variantId String?
  eventData Json?
  timestamp DateTime @default(now())
  @@index([eventType, timestamp])
  @@index([variantId, timestamp])
  @@map("analytics_events")
}
```

## Применение миграций:
```bash
npx prisma migrate dev --name init
```

## Генерация Prisma Client:
```bash
npx prisma generate
```

## Просмотр БД в браузере:
```bash
npx prisma studio
```
"""

with open('PRISMA_SCHEMA.md', 'w', encoding='utf-8') as f:
    f.write(prisma_schema_doc)

print("✅ PRISMA_SCHEMA.md создан")
print("\n" + "="*80 + "\n")

# Создать .env.example
env_example = """# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# YooKassa (получить на yookassa.ru)
YOOKASSA_SHOP_ID=""
YOOKASSA_SECRET_KEY=""

# Yandex.Metrika (получить на metrika.yandex.ru)
NUXT_PUBLIC_YANDEX_METRIKA_ID=""

# Base URL
BASE_URL="http://localhost:3000"
"""

with open('.env.example', 'w', encoding='utf-8') as f:
    f.write(env_example)

print("✅ .env.example создан")
print("\n" + "="*80 + "\n")

# Оценка времени с AI
ai_time_estimation = """
ОЦЕНКА ВРЕМЕНИ РАЗРАБОТКИ С ИСКУССТВЕННЫМ ИНТЕЛЛЕКТОМ
======================================================

SOLO РАЗРАБОТКА (без AI): 140 часов

С CURSOR AI / CLAUDE / GPT-4:
------------------------------

БЛОК 1: ИНФРАСТРУКТУРА (12ч → 3ч)
- Cursor создаст структуру проекта за 5 минут
- Prisma schema — скопировать готовую, применить миграции (30 мин)
- Seed данные — модифицировать пример (30 мин)
- Настройка Supabase, .env — ручная работа (2ч)

БЛОК 2: БАЗА ДАННЫХ (13ч → 2ч)
- Cursor сгенерирует миграции автоматически
- Seed скрипт готов, только запустить
- Проверка связей через Prisma Studio (1ч)

БЛОК 3: BACKEND API (30ч → 8ч)
- Cursor создаст все 9 API endpoints по промпту
- Нужно будет доработать:
  * Логику calculateResultType() — 2ч
  * Логику generateResultData() — 2ч
  * Тестирование каждого endpoint — 3ч
  * Обработка edge cases — 1ч

БЛОК 4: A/B ТЕСТИРОВАНИЕ (12ч → 3ч)
- Middleware ab-redirect.ts — Cursor создаст по примеру
- 3 API endpoints — автогенерация
- Тестирование cookie механизма — 1ч
- Отладка weighted distribution — 1ч

БЛОК 5: FRONTEND КОМПОНЕНТЫ (35ч → 10ч)
- Cursor создаст все Vue компоненты по описанию
- Нужно будет:
  * Подкорректировать Tailwind стили — 3ч
  * Добавить валидацию форм — 2ч
  * Responsive дизайн доработка — 2ч
  * Тестирование UX flow — 2ч
  * Баги и полировка — 1ч

БЛОК 6: ИНТЕГРАЦИЯ ЮКАССА (14ч → 4ч)
- utils/yookassa.ts — готовый код, только ключи вставить
- Payment endpoints — Cursor создаст
- Локальное тестирование webhook через ngrok — 2ч
- Тестовые платежи — 1ч
- Обработка ошибок — 1ч

БЛОК 7: АНАЛИТИКА (6ч → 2ч)
- Plugin и composable — Cursor создаст
- Настройка целей в интерфейсе Метрики — ручная работа (1ч)
- Проверка отправки событий — 30 мин
- Настройка вебвизора — 30 мин

БЛОК 8: ТЕСТИРОВАНИЕ (13ч → 5ч)
- E2E тестирование вручную — 3ч
- Исправление найденных багов — 2ч

БЛОК 9: DEPLOYMENT (5ч → 3ч)
- Vercel подключение — 30 мин
- Настройка environment variables — 30 мин
- Первый deploy + проверка — 1ч
- Настройка webhook URL в production — 30 мин
- Финальное тестирование на проде — 30 мин

======================================================
ИТОГО С AI: 40 часов (вместо 140 часов)
======================================================

ЭКОНОМИЯ: 100 часов (71% времени)

При работе:
- 8 ч/день = 5 рабочих дней (1 неделя)
- 6 ч/день = 6.7 дней (~1.5 недели)
- 4 ч/день = 10 дней (2 недели)

КРИТИЧНЫЕ МОМЕНТЫ (где AI не поможет):
---------------------------------------
1. Логика расчета результатов теста (ты должна знать алгоритм) — 2-3ч
2. Регистрация в сервисах (Supabase, ЮКасса, Метрика) — 2ч
3. Тестирование платежей (требует тестовые карты) — 1-2ч
4. Отладка багов специфичных для твоей логики — 2-3ч

РЕКОМЕНДАЦИИ ДЛЯ РАБОТЫ С CURSOR:
----------------------------------
1. Давай задачи БЛОКАМИ — не все файлы сразу
2. Проверяй каждый файл перед переходом к следующему
3. Тестируй локально после каждого блока
4. Сохраняй working prompts — переиспользуй для похожих файлов
5. Если Cursor ошибается, уточняй промпт примерами

ТВОЙ ПЛАН С AI:
---------------
День 1 (8ч): Блоки 1-2 (инфраструктура + БД) → 5ч работы
День 2 (8ч): Блок 3 (Backend API) → 8ч работы
День 3 (8ч): Блоки 4-5 (A/B тест + Frontend) → 13ч → разбить на 2 дня
День 4 (8ч): Блок 5 продолжение
День 5 (8ч): Блоки 6-7 (ЮКасса + Аналитика) → 6ч работы
День 6 (8ч): Блок 8 (Тестирование) → 5ч работы
День 7 (3ч): Блок 9 (Deployment) → 3ч работы

ИТОГО: 6-7 дней при 6-8 часов работы в день
"""

with open('AI_TIME_ESTIMATION.md', 'w', encoding='utf-8') as f:
    f.write(ai_time_estimation)

print("✅ AI_TIME_ESTIMATION.md создан")
print("\n" + "="*80 + "\n")

print(ai_time_estimation)
print("\n" + "="*80 + "\n")
print("📂 СОЗДАННЫЕ ФАЙЛЫ:")
print("  1. CURSOR_PROMPT.md — промпт для Cursor AI")
print("  2. PROJECT_ARCHITECTURE.md — полная архитектура проекта")
print("  3. PRISMA_SCHEMA.md — схема базы данных")
print("  4. .env.example — пример переменных окружения")
print("  5. AI_TIME_ESTIMATION.md — оценка времени с AI")
print("\n✅ Все файлы готовы для начала работы с Cursor!")
