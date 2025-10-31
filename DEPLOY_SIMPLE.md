# 🚀 Быстрый деплой (только билд)

## Вариант 1: Копируем только build + БД (5 минут!)

### 1. На локальной машине: подготовка

```bash
cd /Users/akinoriv/Progs/SUCCESS-TYPE

# Собери проект (если еще не сделал)
npm run build

# Создай минимальный архив (только нужное)
tar -czf deploy.tar.gz \
  .output \
  prisma/schema.prisma \
  prisma/migrations \
  prisma/seed-quiz.ts \
  package.json

# Готово! Архив ~2-5 MB вместо ~200+ MB
```

### 2. Загрузи на сервер

```bash
scp deploy.tar.gz user@dvaum.com:/var/www/akinoriv/
```

### 3. На сервере: установка

```bash
ssh user@dvaum.com

cd /var/www/akinoriv/
mkdir -p success-type
cd success-type

# Распакуй
tar -xzf ../deploy.tar.gz

# Установи ТОЛЬКО Prisma (для БД)
npm install @prisma/client prisma tsx --production

# Создай .env
cat > .env << 'EOF'
DATABASE_URL="file:./prisma/production.db"
NODE_ENV="production"
PORT=3000
EOF

# Настрой БД
npx prisma generate
npx prisma migrate deploy
npx tsx prisma/seed-quiz.ts

# Запусти с PM2
sudo npm install -g pm2
pm2 start .output/server/index.mjs --name success-type -i max
pm2 startup
pm2 save

# Готово!
```

### 4. Настрой Apache (один раз)

```bash
sudo a2enmod proxy proxy_http
sudo nano /etc/apache2/sites-available/success-type.conf
```

Вставь:

```apache
<VirtualHost *:80>
    ServerName dvaum.com
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</VirtualHost>
```

```bash
sudo a2ensite success-type.conf
sudo systemctl restart apache2
```

### 5. Открой http://dvaum.com 🎉

---

## 🔄 Обновление (30 секунд!)

```bash
# Локально:
cd /Users/akinoriv/Progs/SUCCESS-TYPE
npm run build
tar -czf deploy.tar.gz .output prisma/schema.prisma prisma/migrations package.json
scp deploy.tar.gz user@dvaum.com:/var/www/akinoriv/

# На сервере:
ssh user@dvaum.com
cd /var/www/akinoriv/success-type
tar -xzf ../deploy.tar.gz --overwrite
pm2 restart success-type
```

---

## Вариант 2: Еще проще - один скрипт!

Создам скрипт который сделает всё автоматически.

