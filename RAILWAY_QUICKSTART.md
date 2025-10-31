# 🚂 Railway - Быстрый старт (5 минут!)

## ⚡ Что делать:

### 1️⃣ Запушь код на GitHub

```bash
cd /Users/akinoriv/Progs/SUCCESS-TYPE

# Автоматический скрипт (рекомендуется)
./railway-deploy.sh

# ИЛИ вручную:
git add .
git commit -m "Prepare for Railway"
git push origin main
```

### 2️⃣ Зайди на Railway

1. Открой https://railway.app
2. Нажми **"Start a New Project"**
3. Войди через **GitHub**

### 3️⃣ Создай проект

1. **"New Project"** → **"Deploy from GitHub repo"**
2. Выбери репозиторий **`success-type`** (или как назвал)
3. Railway автоматически начнет деплой

### 4️⃣ Добавь переменные окружения

В разделе **Variables**:

```
DATABASE_URL=postgresql://postgres:DcRBCUYVrvVprovkjxGYtlaeoWOidoIC@switchback.proxy.rlwy.net:56459/railway?sslmode=require
NODE_ENV=production
PORT=3000
```

### 5️⃣ Настрой Volume для базы данных

**Settings** → **Volumes** → **Add Volume**

```
Mount Path: /app/prisma
```

✅ Это сохранит базу данных между деплоями!

### 6️⃣ Получи URL

**Settings** → **Networking** → **Generate Domain**

Railway создаст URL: `https://твой-проект.up.railway.app`

---

## 🌐 Подключить домен dvaum.com

### В Railway:
**Settings** → **Networking** → **Custom Domain** → Добавь `dvaum.com`

### В GoHost (панель управления доменом):
Добавь **CNAME запись**:
- **Имя:** `@`
- **Тип:** CNAME  
- **Значение:** `твой-проект.up.railway.app` (URL из Railway)

Подожди 5-30 минут для применения DNS.

---

## 🔄 Автодеплой настроен!

Теперь каждый `git push` автоматически деплоится:

```bash
git add .
git commit -m "Update"
git push
```

Railway сам соберет и задеплоит! 🎉

---

## 📊 Посмотреть базу данных

```bash
# Установи Railway CLI
brew install railway

# Логин
railway login

# Подключись к проекту
railway link

# Открой Prisma Studio
railway run npx prisma studio
```

---

## 🖥️ Локальная разработка с Railway БД

1. Скопируй файл `.env.example` в `.env`
2. Проверь, что в `DATABASE_URL` указан Railway URL (`postgresql://postgres:...switchback.proxy.rlwy.net:56459/railway?sslmode=require`)
3. Прогони миграции локально: `npx prisma migrate deploy`
4. Запусти локальный сервер: `npm run dev`

> ⚠️ Храни `.env` в секрете: файл уже в `.gitignore` и не попадет в репозиторий. Если URL сменится в Railway, обнови `.env` и `.env.example`.

---

## 💰 Цена

**Бесплатно** - $5 кредитов каждый месяц = ~500 часов работы  
Этого хватит на **3000+ пользователей/месяц**

---

## ❓ Проблемы?

**База пустая после деплоя:**
```bash
railway run npx prisma db seed
```

**Ошибки миграции:**
```bash
railway run npx prisma migrate deploy
```

**Смотреть логи:**
Railway Dashboard → **Deployments** → последний деплой → **View Logs**

---

## 📚 Подробная инструкция

Читай `DEPLOY_RAILWAY.md` - там все детали!

---

**Готово! Деплой займет 5 минут! 🚀**

