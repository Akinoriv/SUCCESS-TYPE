# 🔥 СРОЧНО: Как заполнить базу вопросами

## Проблема:
Вопросов 0 в базе! Seed не выполнился.

## Быстрое решение (1 минута):

### Через Railway CLI:

```bash
# 1. Установи Railway CLI (если еще нет)
brew install railway

# 2. Логин
railway login

# 3. Подключись к проекту
railway link

# 4. Запусти seed
railway run npx prisma db seed
```

### ИЛИ через Railway Dashboard:

1. Открой https://railway.app
2. Кликни SUCCESS-TYPE
3. Нажми "Shell" (справа вверху)
4. Выполни:
```bash
npx prisma db seed
```

5. Дождись "Quiz questions seed completed"
6. Обнови страницу теста

---

## После выполнения:

Проверь:
```bash
curl 'https://success-type-production.up.railway.app/api/quiz/questions'
```

Должно вернуть 14 вопросов!

