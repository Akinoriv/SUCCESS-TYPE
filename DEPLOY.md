# 🚀 Деплой на сервер

## Быстрый старт (5-10 минут)

### 1. На локальной машине:

```bash
# Убедись что всё работает
npm run build

# Создай архив проекта (без node_modules)
tar -czf success-type.tar.gz \
  --exclude='node_modules' \
  --exclude='.nuxt' \
  --exclude='.output' \
  --exclude='prisma/dev.db' \
  .
```

### 2. На сервере:

```bash
# Загрузи архив на сервер (через scp, ftp или панель хостинга)
# Например:
# scp success-type.tar.gz user@your-server.com:/var/www/

# Подключись к серверу
ssh user@your-server.com

# Распакуй
cd /var/www/
tar -xzf success-type.tar.gz
cd success-type

# Установи зависимости
npm install --production

# Создай .env файл
cat > .env << 'EOF'
DATABASE_URL="file:./prisma/production.db"
NODE_ENV="production"
NUXT_PUBLIC_APP_URL="https://твой-домен.ru"
EOF

# Примени миграции БД
npx prisma migrate deploy

# Заполни БД вопросами
npx tsx prisma/seed-quiz.ts

# Собери проект
npm run build

# Установи PM2 (если ещё не установлен)
npm install -g pm2

# Запусти приложение
pm2 start ecosystem.config.js

# Настрой автозапуск
pm2 startup
pm2 save
```

### 3. Настрой Nginx:

Создай файл `/etc/nginx/sites-available/success-type`:

```nginx
server {
    listen 80;
    server_name твой-домен.ru www.твой-домен.ru;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Активируй конфиг:

```bash
sudo ln -s /etc/nginx/sites-available/success-type /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. Настрой SSL (Let's Encrypt):

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d твой-домен.ru -d www.твой-домен.ru
```

## 📊 Просмотр данных в БД

### Вариант 1: Prisma Studio на сервере

```bash
# Запусти туннель через SSH
ssh -L 5555:localhost:5555 user@your-server.com

# На сервере запусти
cd /var/www/success-type
npx prisma studio

# Открой на локальной машине: http://localhost:5555
```

### Вариант 2: Скачай БД локально

```bash
# На локальной машине
scp user@your-server.com:/var/www/success-type/prisma/production.db ./temp.db

# Открой локально
DATABASE_URL="file:./temp.db" npx prisma studio
```

## 🔄 Обновление после изменений

```bash
# На локальной машине
git add .
git commit -m "Update"
git push

# На сервере
cd /var/www/success-type
git pull
npm install
npm run build
pm2 restart all
```

## 📝 Полезные команды PM2

```bash
pm2 list              # Список процессов
pm2 logs              # Логи
pm2 restart all       # Перезапуск
pm2 stop all          # Остановка
pm2 delete all        # Удаление
pm2 monit             # Мониторинг в реальном времени
```

## ⚠️ Важно

1. Убедись что на сервере установлен Node.js 18+
2. Порт 3000 должен быть свободен
3. Настрой файрвол (порты 80, 443)
4. Регулярно делай бэкапы БД: `cp prisma/production.db backups/$(date +%Y%m%d).db`

