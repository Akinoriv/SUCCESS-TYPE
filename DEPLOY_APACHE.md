# 🚀 Деплой на Apache VPS (dvaum.com)

## Быстрый старт (10 минут)

### 1. На локальной машине: Подготовка

```bash
cd /Users/akinoriv/Progs/SUCCESS-TYPE

# Исправь .env файл (открой в редакторе и измени):
# DATABASE_URL="file:./prisma/production.db"
# NODE_ENV="production"
# NUXT_PUBLIC_APP_URL="https://dvaum.com"

# Архив уже создан: success-type.tar.gz
```

### 2. Загрузи на сервер

```bash
# Через SCP (замени user на твой логин):
scp success-type.tar.gz user@dvaum.com:/var/www/akinoriv/

# Или через FileZilla/WinSCP загрузи файл в:
# /var/www/akinoriv/success-type.tar.gz
```

### 3. На сервере: Установка и запуск

```bash
# Подключись к серверу
ssh user@dvaum.com

# Перейди в директорию
cd /var/www/akinoriv/

# Распакуй архив
tar -xzf success-type.tar.gz

# Перейди в проект
cd success-type

# Установи Node.js 18+ (если еще не установлен)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Проверь версию
node -v  # должно быть >= 18

# Установи зависимости
npm install --production

# Создай файл .env
cat > .env << 'EOF'
DATABASE_URL="file:./prisma/production.db"
NODE_ENV="production"
NUXT_PUBLIC_APP_URL="https://dvaum.com"
PORT=3000
EOF

# Примени миграции БД
npx prisma generate
npx prisma migrate deploy

# Заполни БД вопросами
npx tsx prisma/seed-quiz.ts

# Собери проект
npm run build

# Установи PM2 (менеджер процессов)
sudo npm install -g pm2

# Запусти приложение
pm2 start ecosystem.config.js

# Настрой автозапуск при перезагрузке сервера
pm2 startup
# Выполни команду, которую PM2 покажет (она начинается с sudo)
pm2 save

# Проверь статус
pm2 status
pm2 logs
```

### 4. Настрой Apache как Reverse Proxy

```bash
# Включи необходимые модули Apache
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod rewrite

# Создай конфиг для сайта
sudo nano /etc/apache2/sites-available/success-type.conf
```

Вставь этот конфиг:

```apache
<VirtualHost *:80>
    ServerName dvaum.com
    ServerAlias www.dvaum.com

    # Корневая директория (для статических файлов если нужно)
    DocumentRoot /var/www/akinoriv/success-type

    # Логи
    ErrorLog ${APACHE_LOG_DIR}/success-type-error.log
    CustomLog ${APACHE_LOG_DIR}/success-type-access.log combined

    # Проксируем все запросы на Node.js приложение
    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/

    # Передаем реальный IP пользователя
    RequestHeader set X-Forwarded-Proto "http"
    RequestHeader set X-Forwarded-For "%{REMOTE_ADDR}s"
</VirtualHost>
```

Сохрани (Ctrl+O, Enter, Ctrl+X) и активируй:

```bash
# Активируй конфиг
sudo a2ensite success-type.conf

# Отключи дефолтный конфиг (опционально)
# sudo a2dissite 000-default.conf

# Проверь конфигурацию
sudo apache2ctl configtest

# Перезапусти Apache
sudo systemctl restart apache2
```

### 5. Настрой SSL (HTTPS) - рекомендуется

```bash
# Установи Certbot
sudo apt install certbot python3-certbot-apache

# Получи SSL сертификат
sudo certbot --apache -d dvaum.com -d www.dvaum.com

# Certbot автоматически настроит HTTPS и перенаправление
# Сертификат будет автоматически обновляться
```

### 6. Проверь что всё работает

Открой в браузере: http://dvaum.com или https://dvaum.com

---

## 📊 Просмотр ответов друзей в БД

### Вариант 1: Скачай БД и смотри локально

```bash
# На локальной машине:
scp user@dvaum.com:/var/www/akinoriv/success-type/prisma/production.db ./temp.db

# Открой Prisma Studio:
DATABASE_URL="file:./temp.db" npx prisma studio

# Открой в браузере: http://localhost:5555
```

### Вариант 2: SSH туннель (удобнее)

```bash
# 1. Создай туннель (на локальной машине):
ssh -L 5555:localhost:5555 user@dvaum.com

# 2. В другом терминале подключись к серверу и запусти:
ssh user@dvaum.com
cd /var/www/akinoriv/success-type
npx prisma studio

# 3. Открой на локальной машине: http://localhost:5555
# Теперь ты видишь БД с сервера в реальном времени!
```

### Вариант 3: Установи Prisma Studio на сервере (постоянно)

```bash
# На сервере:
cd /var/www/akinoriv/success-type
pm2 start "npx prisma studio" --name prisma-studio

# Настрой Apache для доступа через поддомен
# Например: studio.dvaum.com -> localhost:5555
```

---

## 🔄 Обновление проекта после изменений

```bash
# На локальной машине:
cd /Users/akinoriv/Progs/SUCCESS-TYPE
./deploy.sh

# Загрузи новый архив:
scp success-type.tar.gz user@dvaum.com:/var/www/akinoriv/

# На сервере:
ssh user@dvaum.com
cd /var/www/akinoriv/success-type
tar -xzf ../success-type.tar.gz --overwrite
npm install --production
npm run build
pm2 restart all

# Если были изменения в БД:
npx prisma migrate deploy
```

---

## 📋 Полезные команды

```bash
# PM2
pm2 list              # Список процессов
pm2 logs              # Все логи
pm2 logs success-type # Логи конкретного процесса
pm2 restart all       # Перезапуск
pm2 stop all          # Остановка
pm2 monit             # Мониторинг в реальном времени

# Apache
sudo systemctl status apache2   # Статус
sudo systemctl restart apache2  # Перезапуск
sudo tail -f /var/log/apache2/success-type-error.log  # Логи

# БД
cd /var/www/akinoriv/success-type
npx prisma studio                    # Открыть БД
cp prisma/production.db backups/$(date +%Y%m%d).db  # Бэкап
```

---

## ⚠️ Важно

1. **Порт 3000** должен быть свободен
2. **Node.js 18+** обязателен
3. Делай **бэкапы БД** регулярно: `cp prisma/production.db backups/`
4. Настрой **firewall** (порты 80, 443, 22)

---

## 🆘 Решение проблем

**Ошибка: "Cannot find module"**

```bash
cd /var/www/akinoriv/success-type
rm -rf node_modules
npm install --production
npm run build
pm2 restart all
```

**Ошибка: "Port 3000 already in use"**

```bash
pm2 list
pm2 delete all
pm2 start ecosystem.config.js
```

**Ошибка: "Permission denied"**

```bash
sudo chown -R $USER:$USER /var/www/akinoriv/success-type
```

**Apache не проксирует запросы:**

```bash
sudo a2enmod proxy proxy_http
sudo systemctl restart apache2
```

