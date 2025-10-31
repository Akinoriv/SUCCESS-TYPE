# 🚂 Деплой на Railway.app

Railway - это самый простой способ задеплоить Nuxt приложение. Работает в РФ, есть бесплатный план!

## 🎯 Преимущества Railway

✅ **Бесплатно** - 500 часов/месяц ($5 бесплатно каждый месяц)  
✅ **Работает в РФ** - без VPN  
✅ **Автодеплой** - деплой при пуше в GitHub  
✅ **SQLite поддержка** - встроенная база данных  
✅ **SSL сертификат** - автоматический HTTPS  
✅ **Custom домен** - можно подключить свой домен  

---

## 📋 Подготовка (уже сделано!)

Все файлы готовы:
- ✅ `railway.json` - конфигурация Railway
- ✅ `nixpacks.toml` - настройки сборки
- ✅ `.env.example` - пример переменных окружения
- ✅ `package.json` - обновлены скрипты

---

## 🚀 Пошаговая инструкция

### Шаг 1: Создай GitHub репозиторий (если еще нет)

```bash
cd /Users/akinoriv/Progs/SUCCESS-TYPE

# Проверь текущий статус
git status

# Добавь все изменения
git add .

# Сделай коммит
git commit -m "Prepare for Railway deployment"

# Если репозитория нет, создай:
git remote add origin https://github.com/ТВОй_USERNAME/success-type.git

# Запуш
git push -u origin main
```

**Или создай новый репозиторий:**
1. Открой https://github.com/new
2. Название: `success-type`
3. Private или Public
4. Создай репозиторий
5. Следуй инструкциям на экране

---

### Шаг 2: Зарегистрируйся на Railway

1. Открой https://railway.app
2. Нажми **"Start a New Project"**
3. Войди через **GitHub** (это важно для автодеплоя!)
4. Разреши Railway доступ к репозиториям

---

### Шаг 3: Создай проект

1. Нажми **"New Project"**
2. Выбери **"Deploy from GitHub repo"**
3. Найди и выбери репозиторий **`success-type`**
4. Railway автоматически определит Node.js проект

---

### Шаг 4: Настрой переменные окружения

В Railway панели проекта:

1. Перейди в **Variables** (слева)
2. Добавь переменные:

```
DATABASE_URL=file:./prisma/production.db
NODE_ENV=production
PORT=3000
```

**Опционально** (если нужны платежи):
```
YOOKASSA_SHOP_ID=твой_shop_id
YOOKASSA_SECRET_KEY=твой_secret_key
```

---

### Шаг 5: Настрой Persistent Volume для SQLite

SQLite хранит данные в файле, нужно сохранить их между деплоями:

1. В Railway панели перейди в **Settings**
2. Найди **"Volumes"** → **"Add Volume"**
3. **Mount Path:** `/app/prisma`
4. Сохрани

Теперь база данных не будет удаляться при деплоях!

---

### Шаг 6: Задеплой!

Railway автоматически запустит сборку:

1. Установит зависимости
2. Сгенерирует Prisma клиент
3. Соберет Nuxt приложение
4. Запустит миграции БД
5. Запустит сервер

Смотри логи в реальном времени в разделе **"Deployments"**

---

### Шаг 7: Получи URL приложения

После успешного деплоя:

1. Перейди в **Settings** → **Networking**
2. Нажми **"Generate Domain"**
3. Railway создаст URL вида: `https://твой-проект.up.railway.app`
4. Открой и проверь! 🎉

---

## 🌐 Подключение своего домена (dvaum.com)

### В Railway:

1. Перейди в **Settings** → **Networking** → **Custom Domain**
2. Добавь домен: `dvaum.com`
3. Railway покажет CNAME запись для настройки

### В GoHost (твой хостинг):

1. Войди в панель управления доменом
2. Найди **"DNS записи"** или **"DNS Management"**
3. Добавь **CNAME запись**:
   - **Имя:** `@` (или оставь пустым)
   - **Тип:** CNAME
   - **Значение:** URL из Railway (например: `твой-проект.up.railway.app`)
   - **TTL:** 3600

4. Сохрани

**Ожидание:** 5-60 минут для применения DNS

---

## 🔄 Автоматический деплой

После настройки каждый `git push` в `main` ветку автоматически деплоится на Railway!

```bash
# Внеси изменения
git add .
git commit -m "Update design"
git push

# Railway автоматически задеплоит новую версию!
```

---

## 📊 Проверка базы данных

### Вариант 1: Через Prisma Studio локально

```bash
# SSH туннель к Railway
railway run npx prisma studio

# Или через переменную окружения
DATABASE_URL="твой_railway_database_url" npx prisma studio
```

### Вариант 2: Через Railway CLI

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

### Вариант 3: Прямо из Railway

```bash
# В разделе проекта нажми "Shell"
railway shell

# Внутри выполни:
npx prisma studio
```

---

## 🐛 Troubleshooting

### Ошибка миграций

```bash
# Через Railway CLI
railway run npx prisma migrate deploy
railway run npx prisma db seed
```

### База данных пустая после деплоя

1. Проверь что Volume подключен к `/app/prisma`
2. Запусти seed вручную:
```bash
railway run npm run prisma:seed
```

### Приложение не запускается

Проверь логи в **Deployments** → выбери последний деплой → **View Logs**

### Нужно сбросить БД

```bash
railway run npx prisma migrate reset
```

---

## 💰 Стоимость

**Free Plan ($5 в месяц бесплатно):**
- 500 часов работы
- 512MB RAM
- 1GB диск
- Достаточно для **~3000 пользователей/месяц**

**Hobby Plan ($5/месяц):**
- Неограниченные часы
- 8GB RAM
- 100GB диск

---

## 📝 Полезные команды

```bash
# Установи Railway CLI
brew install railway

# Логин
railway login

# Подключись к проекту
railway link

# Просмотр логов
railway logs

# Выполнение команд
railway run <команда>

# Открыть проект в браузере
railway open

# Статус деплоя
railway status
```

---

## ✅ Что дальше?

После успешного деплоя:

1. ✅ Протестируй все функции на реальном домене
2. ✅ Настрой Yandex.Metrika для продакшена
3. ✅ Подключи свой домен `dvaum.com`
4. ✅ Настрой мониторинг и алерты в Railway
5. ✅ Добавь пользователей для тестирования

---

## 🆘 Нужна помощь?

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Railway Status: https://status.railway.app

---

**Готово! Теперь просто запушь код в GitHub и Railway задеплоит автоматически! 🚂✨**

