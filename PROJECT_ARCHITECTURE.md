
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
