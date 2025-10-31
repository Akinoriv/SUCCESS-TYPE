# 🚀 Деплой через FTP (GoHost)

## Данные для подключения:
- **FTP сервер:** proto.gohost.ru (90.156.128.160)
- **Логин:** cl228249
- **Папка:** dvaum.com

## Способ 1: Через FileZilla (визуальный интерфейс)

### 1. Установи FileZilla (если нет)
```bash
brew install --cask filezilla
```

Или скачай: https://filezilla-project.org/download.php?type=client

### 2. Подключись к FTP

Открой FileZilla:
- **Хост:** proto.gohost.ru
- **Имя пользователя:** cl228249
- **Пароль:** jdNnOu9WahNT
- **Порт:** 21

Нажми "Быстрое соединение"

### 3. Загрузи файлы

1. Слева (локальная машина): перейди в `/Users/akinoriv/Progs/SUCCESS-TYPE/.output/`
2. Справа (сервер): перейди в папку `dvaum.com/`
3. Перетащи папку `.output` на сервер
4. Также загрузи:
   - `prisma/` (вся папка)
   - `package.json`
   - `ecosystem.config.js`

### 4. Создай .env файл

В папке `dvaum.com/` создай файл `.env` (через FileZilla: правая кнопка → Создать файл):

```env
DATABASE_URL="file:./prisma/production.db"
NODE_ENV="production"
PORT=3000
```

---

## Способ 2: Через терминал (быстрее)

### 1. Загрузи через FTP командой

```bash
cd /Users/akinoriv/Progs/SUCCESS-TYPE

# Установи lftp (если нет)
brew install lftp

# Подключись и загрузи
lftp -u cl228249,jdNnOu9WahNT proto.gohost.ru << 'EOF'
cd dvaum.com
mkdir -p success-type
cd success-type
mirror -R .output .output
mirror -R prisma prisma
put package.json
put ecosystem.config.js
bye
EOF
```

### 2. Создай .env через FTP

```bash
cat > /tmp/env_file << 'EOF'
DATABASE_URL="file:./prisma/production.db"
NODE_ENV="production"
PORT=3000
EOF

lftp -u cl228249,jdNnOu9WahNT proto.gohost.ru << 'EOF'
cd dvaum.com/success-type
put /tmp/env_file -o .env
bye
EOF
```

---

## ⚠️ Важно: Проверь тип хостинга

У тебя может быть:

### Вариант А: Node.js хостинг (если есть SSH)
Тогда можно запустить через PM2 (как в предыдущих инструкциях)

### Вариант Б: Статический хостинг (без Node.js)
Тогда нужен другой подход - Nuxt Static Generation

### Вариант В: PHP хостинг с Node.js поддержкой
Нужна специальная настройка

---

## 🔍 Как узнать тип хостинга?

1. Попробуй подключиться по SSH:
```bash
ssh cl228249@proto.gohost.ru
```

Если подключается - у тебя VPS/SSH доступ, можно использовать PM2.

Если нет - скорее всего статический хостинг.

---

## 📱 Напиши в поддержку GoHost:

"Здравствуйте! У меня тариф с доступом к dvaum.com. Хочу запустить Node.js приложение (Nuxt 3). Какой у меня тип хостинга? Есть ли поддержка Node.js и как его запустить?"

---

## Что делать после ответа:

**Если есть Node.js:**
- Используй инструкцию `DEPLOY_SIMPLE.md`
- Запусти через SSH + PM2

**Если НЕТ Node.js:**
- Переключим проект на Vercel/Railway (бесплатно, работает в РФ)
- Или соберем статическую версию (SSG)

---

**Скажи результат - есть SSH или нет?** 🔑


