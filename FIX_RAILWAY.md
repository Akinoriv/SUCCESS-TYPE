# 🔧 Как заполнить Railway базу вопросами

## Проблема:
- API работает ✅
- База подключена ✅  
- НО вопросов нет ❌ (`questions: []`)

## Решение:

### Вариант 1: Через Railway CLI (быстро)

```bash
# Установи Railway CLI (если еще нет)
brew install railway

# Логин
railway login

# Подключись к проекту
railway link

# Запусти seed
railway run npx prisma db seed
```

### Вариант 2: Через изменение nixpacks.toml (автоматически)

Обнови `nixpacks.toml`:

```toml
[start]
cmd = "npx prisma db push --accept-data-loss && npx prisma db seed && node .output/server/index.mjs"
```

Затем:
```bash
git add nixpacks.toml
git commit -m "Add seed to Railway startup"
git push origin main
```

### Вариант 3: Через Railway Dashboard Shell

1. Открой Railway Dashboard
2. Кликни на сервис SUCCESS-TYPE
3. Нажми **"Shell"** (справа вверху)
4. Выполни:
```bash
npx prisma db seed
```

---

## ✅ После выполнения:

Проверь что вопросы появились:
```bash
curl 'https://success-type-production.up.railway.app/api/quiz/questions'
```

Должно вернуть 14 вопросов!

