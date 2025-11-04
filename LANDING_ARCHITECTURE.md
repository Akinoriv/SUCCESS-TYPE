# 🎯 Архитектура мультилендинговой системы + A/B тестирование

## 📋 Общая концепция

### 3 категории лендингов:
1. **Courses** (`/courses`) — "Купил курс за 20к, бросил?"
2. **Career Change** (`/career`) — "Прошёл курс, работа не получилась?"
3. **General** (`/`) — "Работаешь много, энергии мало?"

### A/B тесты внутри каждой категории:
- `courses-a`, `courses-b`, `courses-c` (разные тексты/цвета)
- `career-a`, `career-b`
- `general-a`, `general-b`

---

## 🗂️ 1. Структура URL

### Вариант 1: Отдельные пути (РЕКОМЕНДУЮ ✅)
```
https://dvaum.com/                    → General landing
https://dvaum.com/courses             → Courses landing
https://dvaum.com/career              → Career change landing
```

**Плюсы:**
- ✅ Чистые URL для рекламы
- ✅ Легко настроить Yandex.Metrika цели
- ✅ Понятная аналитика
- ✅ SEO-friendly (разные title/description)

### Вариант 2: Query параметры
```
https://dvaum.com/?source=courses
https://dvaum.com/?source=career
```

**Минусы:**
- ❌ Длинные ссылки в рекламе
- ❌ Легко потерять параметр при переходах

---

## 🗄️ 2. Обновление схемы базы данных

### 2.1. Добавить tracking в QuizSession

```prisma
model QuizSession {
  id              String       @id @default(uuid())
  userId          String
  quizId          String
  startedAt       DateTime     @default(now())
  completedAt     DateTime?
  ipAddress       String?
  
  // 🆕 НОВЫЕ ПОЛЯ ДЛЯ ТРЕКИНГА
  landingCategory String?      // "courses", "career", "general"
  landingVariant  String?      // "courses-a", "courses-b", etc.
  utmSource       String?      // utm_source (vk, telegram, google)
  utmMedium       String?      // utm_medium (cpc, social)
  utmCampaign     String?      // utm_campaign
  
  user            User         @relation(fields: [userId], references: [id])
  answers         TestAnswer[]
  result          QuizResult?
  
  @@index([landingCategory])
  @@index([landingVariant])
  @@map("quiz_sessions")
}
```

### 2.2. Расширить LandingVariant

```prisma
model LandingVariant {
  id              String           @id @default(uuid())
  
  // 🆕 Категория лендинга
  category        String           // "courses", "career", "general"
  
  name            String           // "Courses - Вариант A"
  slug            String           @unique // "courses-a"
  
  // Контент лендинга
  contentJson     Json             // { hero, painPoints, cta, colors }
  
  // A/B тест настройки
  isActive        Boolean          @default(true)
  trafficSplit    Int              @default(50) // % трафика
  
  // Метрики
  views           Int              @default(0)
  conversions     Int              @default(0)
  
  createdAt       DateTime         @default(now())
  userAssignments UserAssignment[]
  
  @@unique([category, slug])
  @@index([category, isActive])
  @@map("landing_variants")
}
```

---

## 📁 3. Структура файлов

```
app/pages/
├── index.vue                    # General landing (/)
├── courses.vue                  # Courses landing (/courses)
├── career.vue                   # Career landing (/career)
│
├── quiz/
│   ├── onboarding.vue           # Обязательно сохраняем landingSource
│   ├── questions.vue
│   └── result.vue
│
server/api/
├── landing/
│   ├── get-variant.get.ts       # Получить вариант для категории
│   ├── track-view.post.ts       # Записать просмотр
│   └── track-conversion.post.ts # Записать конверсию
│
├── quiz/
│   └── sessions.post.ts         # 🔄 Обновить: сохранять landingSource
│
└── analytics/
    ├── conversions.get.ts       # Аналитика по лендингам
    └── variants.get.ts          # Сравнение вариантов
```

---

## 🔧 4. Реализация

### 4.1. Landing Variant API: `server/api/landing/get-variant.get.ts`

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = query.category as string // "courses", "career", "general"
  
  if (!category) {
    return { error: 'Category required' }
  }
  
  // 1. Получить активные варианты для этой категории
  const variants = await prisma.landingVariant.findMany({
    where: {
      category,
      isActive: true,
    },
  })
  
  if (variants.length === 0) {
    return { error: 'No active variants' }
  }
  
  // 2. A/B Split: выбрать вариант по trafficSplit
  const totalSplit = variants.reduce((sum, v) => sum + v.trafficSplit, 0)
  const random = Math.random() * totalSplit
  
  let cumulative = 0
  let selectedVariant = variants[0]
  
  for (const variant of variants) {
    cumulative += variant.trafficSplit
    if (random <= cumulative) {
      selectedVariant = variant
      break
    }
  }
  
  // 3. Записать просмотр (если есть userId)
  if (query.userId) {
    await prisma.landingVariant.update({
      where: { id: selectedVariant.id },
      data: { views: { increment: 1 } },
    })
    
    // Сохранить assignment
    await prisma.userAssignment.upsert({
      where: {
        userId_variantId: {
          userId: query.userId as string,
          variantId: selectedVariant.id,
        },
      },
      create: {
        userId: query.userId as string,
        variantId: selectedVariant.id,
      },
      update: {},
    })
  }
  
  return {
    variant: {
      slug: selectedVariant.slug,
      category: selectedVariant.category,
      content: selectedVariant.contentJson,
    },
  }
})
```

### 4.2. Обновить Quiz Session API: `server/api/quiz/sessions.post.ts`

```typescript
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { gender, age, landingSource, utmSource, utmMedium, utmCampaign } = body
  
  // Создать/получить user
  const user = await prisma.user.upsert({
    where: { email: `temp_${Date.now()}@temp.com` },
    create: { gender, age },
    update: { gender, age },
  })
  
  // Создать session с tracking данными
  const session = await prisma.quizSession.create({
    data: {
      userId: user.id,
      quizId: 'default',
      landingCategory: landingSource?.split('-')[0] || 'general', // "courses-a" → "courses"
      landingVariant: landingSource || null,
      utmSource: utmSource || null,
      utmMedium: utmMedium || null,
      utmCampaign: utmCampaign || null,
    },
  })
  
  return { sessionId: session.id }
})
```

### 4.3. Компонент лендинга: `app/pages/courses.vue`

```vue
<template>
  <div>
    <!-- Используем content из variantData -->
    <section class="hero" :style="{ background: variantData.colors?.hero }">
      <h1>{{ variantData.hero.headline }}</h1>
      <p>{{ variantData.hero.subheadline }}</p>
      
      <NuxtLink 
        :to="`/quiz/onboarding?source=${variantData.slug}`"
        class="cta-button"
      >
        {{ variantData.cta.text }}
      </NuxtLink>
    </section>
    
    <!-- Остальной контент из variantData.contentJson -->
  </div>
</template>

<script setup>
const route = useRoute()

// Получить вариант для категории "courses"
const { data: variantData } = await useFetch('/api/landing/get-variant', {
  query: {
    category: 'courses',
    userId: useCookie('userId').value, // Если есть
  },
})

// SEO для этой категории
useHead({
  title: variantData.value?.seo?.title || 'Купил курс, бросил? Узнай свой энерготип',
  meta: [
    {
      name: 'description',
      content: variantData.value?.seo?.description || '...',
    },
  ],
})

// Yandex Metrika: View landing
if (process.client) {
  ym('reachGoal', 'view_courses_landing')
}
</script>
```

### 4.4. Обновить Onboarding: `app/pages/quiz/onboarding.vue`

```vue
<script setup>
const route = useRoute()
const router = useRouter()

// Получить landing source из URL
const landingSource = ref(route.query.source || 'general') // "courses-a", "career-b", etc.

// Сохранить в session storage (на случай перезагрузки)
if (process.client) {
  sessionStorage.setItem('landingSource', landingSource.value)
}

const createSession = async () => {
  const response = await $fetch('/api/quiz/sessions', {
    method: 'POST',
    body: {
      gender: selectedGender.value,
      age: selectedAge.value,
      landingSource: landingSource.value,
      utmSource: route.query.utm_source || null,
      utmMedium: route.query.utm_medium || null,
      utmCampaign: route.query.utm_campaign || null,
    },
  })
  
  // Yandex Metrika: Start quiz from landing
  ym('reachGoal', `start_quiz_${landingSource.value}`)
  
  router.push(`/quiz/questions?session=${response.sessionId}`)
}
</script>
```

---

## 📊 5. Аналитика и отчеты

### 5.1. API для получения конверсий: `server/api/analytics/conversions.get.ts`

```typescript
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = query.category as string // "courses", "career", "general", or "all"
  
  const whereClause = category && category !== 'all' 
    ? { landingCategory: category }
    : {}
  
  // Общая статистика
  const totalSessions = await prisma.quizSession.count({
    where: whereClause,
  })
  
  const completedSessions = await prisma.quizSession.count({
    where: {
      ...whereClause,
      completedAt: { not: null },
    },
  })
  
  // По вариантам
  const variantStats = await prisma.quizSession.groupBy({
    by: ['landingVariant'],
    where: whereClause,
    _count: { id: true },
  })
  
  const completedByVariant = await prisma.quizSession.groupBy({
    by: ['landingVariant'],
    where: {
      ...whereClause,
      completedAt: { not: null },
    },
    _count: { id: true },
  })
  
  // Соединить данные
  const variants = variantStats.map(v => {
    const completed = completedByVariant.find(c => c.landingVariant === v.landingVariant)
    const conversionRate = completed 
      ? (completed._count.id / v._count.id * 100).toFixed(2)
      : 0
    
    return {
      variant: v.landingVariant,
      views: v._count.id,
      conversions: completed?._count.id || 0,
      conversionRate: `${conversionRate}%`,
    }
  })
  
  return {
    category,
    total: {
      sessions: totalSessions,
      completed: completedSessions,
      conversionRate: `${(completedSessions / totalSessions * 100).toFixed(2)}%`,
    },
    variants,
  }
})
```

### 5.2. Dashboard просмотр

```
GET /api/analytics/conversions?category=courses

Response:
{
  "category": "courses",
  "total": {
    "sessions": 1250,
    "completed": 875,
    "conversionRate": "70.00%"
  },
  "variants": [
    {
      "variant": "courses-a",
      "views": 625,
      "conversions": 450,
      "conversionRate": "72.00%"
    },
    {
      "variant": "courses-b",
      "views": 625,
      "conversions": 425,
      "conversionRate": "68.00%"
    }
  ]
}
```

---

## 🎨 6. Пример контента варианта в БД

### `contentJson` структура:

```json
{
  "slug": "courses-a",
  "category": "courses",
  "hero": {
    "badge": "Ты знаешь это чувство?",
    "headline": "Купил курс за 20к.<br/>Прошёл 3 урока. Бросил.<br/><span>Чувствуешь вину?</span>",
    "subheadline": "Ты не ленивый. Ты не безвольный. С тобой всё в порядке. Просто ты работаешь не по своему энерготипу.",
    "description": "5-минутный тест покажет, КАК ты работаешь на самом деле: твой ритм, фокус и энергию. И объяснит, почему не получалось раньше."
  },
  "cta": {
    "text": "Узнать свой энерготип",
    "subtext": "⚡ 5 минут • 12 вопросов • Результат сразу • Бесплатно"
  },
  "painPoints": [
    {
      "emoji": "😫",
      "title": "\"Начал с энтузиазмом — бросил через неделю\"",
      "description": "Купил курс за 20k, прошёл 3 урока, забросил. Сейчас смотришь на него и чувствуешь вину. Знакомо?"
    },
    {
      "emoji": "🔄",
      "title": "\"Уже 5 курсов в закладках — ни один не прошёл\"",
      "description": "Подписался на интенсивы, марафоны, вебинары. Но каждый раз — та же история. Не можешь закончить."
    }
  ],
  "colors": {
    "primary": "#F59E0B",
    "secondary": "#EC4899",
    "heroGradient": "from-indigo-900 via-purple-900 to-pink-900"
  },
  "seo": {
    "title": "Тест на энерготип — Узнай, почему ты бросаешь курсы",
    "description": "Купил курс, прошёл 3 урока, бросил? Это не лень. 5-минутный тест покажет твой энерготип и объяснит, почему так происходит. Бесплатно, результат сразу."
  }
}
```

---

## 🚀 7. Миграция БД

```bash
# Создать миграцию
npx prisma migrate dev --name add_landing_tracking

# Применить на production
npx prisma migrate deploy
```

---

## 📈 8. Yandex.Metrika цели

### Настроить цели:
1. `view_courses_landing` — просмотр /courses
2. `view_career_landing` — просмотр /career
3. `view_general_landing` — просмотр /
4. `start_quiz_courses-a` — начало теста с courses-a
5. `start_quiz_courses-b` — начало теста с courses-b
6. `complete_quiz_courses-a` — завершение теста с courses-a
7. `complete_quiz_courses-b` — завершение теста с courses-b

### В коде:

```typescript
// Landing view
ym('reachGoal', `view_${category}_landing`)

// Start quiz
ym('reachGoal', `start_quiz_${variantSlug}`)

// Complete quiz
ym('reachGoal', `complete_quiz_${variantSlug}`)
```

---

## 🧪 9. A/B тест workflow

### Шаг 1: Создать варианты в БД

```sql
-- Вариант A для courses
INSERT INTO landing_variants (id, category, name, slug, contentJson, isActive, trafficSplit)
VALUES (
  gen_random_uuid(),
  'courses',
  'Courses - Вариант A (Вина)',
  'courses-a',
  '{ "hero": { "headline": "Купил курс за 20к. Бросил. Чувствуешь вину?" }, ... }',
  true,
  50
);

-- Вариант B для courses
INSERT INTO landing_variants (id, category, name, slug, contentJson, isActive, trafficSplit)
VALUES (
  gen_random_uuid(),
  'courses',
  'Courses - Вариант B (Любопытство)',
  'courses-b',
  '{ "hero": { "headline": "Почему ты бросаешь курсы? Узнай свой энерготип" }, ... }',
  true,
  50
);
```

### Шаг 2: Запустить трафик на `/courses`

### Шаг 3: Смотреть статистику

```bash
curl https://dvaum.com/api/analytics/conversions?category=courses
```

### Шаг 4: Выбрать победителя

Когда один вариант показывает **статистически значимо лучше** (например, +10% конверсии):

```sql
-- Отключить проигравший вариант
UPDATE landing_variants 
SET isActive = false 
WHERE slug = 'courses-b';

-- Поставить победителю 100% трафика
UPDATE landing_variants 
SET trafficSplit = 100 
WHERE slug = 'courses-a';
```

---

## ✅ Преимущества этой архитектуры

1. ✅ **Гибкость**: Легко добавить 4-й, 5-й лендинг
2. ✅ **A/B тесты**: Тестируй варианты без изменения кода
3. ✅ **Аналитика**: Видишь конверсию каждого варианта
4. ✅ **Масштабируемость**: Контент в БД, не в коде
5. ✅ **Attribution**: Знаешь, откуда каждый пользователь
6. ✅ **UTM tracking**: Поддержка utm_source, utm_medium, utm_campaign

---

## 🎯 Следующие шаги

1. **Миграция БД** — добавить поля `landingCategory`, `landingVariant`, `utm_*` в `QuizSession`
2. **Seed варианты** — создать 2-3 варианта для тестирования
3. **Создать API** — `/api/landing/get-variant`, `/api/analytics/conversions`
4. **Обновить лендинги** — `courses.vue`, `career.vue`, `index.vue` (использовать dynamic content)
5. **Обновить onboarding** — сохранять `landingSource` из query
6. **Настроить Metrika** — цели для каждого варианта
7. **Dashboard** — простой админ-панель для просмотра статистики

---

Готов начать реализацию? С чего начнём? 🚀

