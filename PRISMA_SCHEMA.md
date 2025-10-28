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
  id                   String      @id @default(uuid())
  sessionId            String      @unique
  resultType           String      // "impulse" | "focus" | "titan" | "aether"
  resultData           Json        // Полные данные результата
  satisfactionScore    Int?        // Оценка от 1 до 5
  satisfactionFeedback String?     // Текстовый отзыв (опционально)
  createdAt            DateTime    @default(now())
  session              QuizSession @relation(fields: [sessionId], references: [id])
  purchases            Purchase[]
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

---

## 📝 Последние изменения схемы

### [2024-10-28] Добавлено поле satisfactionFeedback

- **Таблица:** `quiz_results`
- **Поле:** `satisfactionFeedback String?`
- **Назначение:** Сохранение текстовых отзывов пользователей о точности результата
- **Миграция:** `20251028181659_add_satisfaction_feedback`

### [2024-10-27] Добавлена таблица Question

- **Таблица:** `questions`
- **Поля:** `variations Json`, `options Json`, `dimension String`
- **Назначение:** Хранение вопросов с персонализацией по полу

### Структура данных в Json полях:

#### QuizResult.resultData

```json
{
  "title": "ИМПУЛЬС",
  "description": "Высокая энергия • Широкий фокус",
  "scores": {
    "energy": 22,
    "focus": 15
  }
}
```

#### Question.variations

```json
{
  "default": "Текст вопроса по умолчанию",
  "male": "Текст для мужчин",
  "female": "Текст для женщин"
}
```

#### Question.options (для type="choice")

```json
{
  "А": {
    "text": "Текст ответа",
    "variations": {
      "default": "Забыл про нее",
      "male": "Забыл про нее",
      "female": "Забыла про нее"
    },
    "score": 4
  }
}
```
