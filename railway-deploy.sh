#!/bin/bash

echo "🚂 Подготовка к деплою на Railway..."
echo ""

# Проверка git репозитория
if [ ! -d ".git" ]; then
    echo "❌ Git репозиторий не найден!"
    echo "Инициализирую git..."
    git init
    git add .
    git commit -m "Initial commit for Railway"
    echo "✅ Git репозиторий создан"
    echo ""
    echo "📝 Теперь создай репозиторий на GitHub:"
    echo "   1. Открой https://github.com/new"
    echo "   2. Создай репозиторий 'success-type'"
    echo "   3. Выполни команды:"
    echo ""
    echo "   git remote add origin https://github.com/YOUR_USERNAME/success-type.git"
    echo "   git push -u origin main"
    echo ""
    exit 0
fi

# Проверка изменений
if [[ -n $(git status -s) ]]; then
    echo "📝 Найдены несохраненные изменения"
    echo ""
    git status -s
    echo ""
    read -p "Закоммитить изменения? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        read -p "Сообщение коммита: " commit_msg
        git commit -m "$commit_msg"
        echo "✅ Изменения закоммичены"
    fi
fi

# Проверка remote
if ! git remote | grep -q "origin"; then
    echo ""
    echo "❌ Remote origin не найден!"
    echo "Добавь GitHub репозиторий:"
    echo ""
    read -p "URL репозитория (https://github.com/...): " repo_url
    git remote add origin "$repo_url"
    echo "✅ Remote добавлен"
fi

# Push
echo ""
echo "🚀 Отправляю код на GitHub..."
git push -u origin main

echo ""
echo "✅ Готово! Теперь:"
echo ""
echo "1. Открой https://railway.app"
echo "2. Войди через GitHub"
echo "3. New Project → Deploy from GitHub"
echo "4. Выбери репозиторий 'success-type'"
echo "5. Добавь переменные окружения:"
echo "   - DATABASE_URL=file:./prisma/production.db"
echo "   - NODE_ENV=production"
echo "   - PORT=3000"
echo "6. Settings → Volumes → Add Volume:"
echo "   - Mount Path: /app/prisma"
echo "7. Generate Domain"
echo ""
echo "🎉 Готово! Приложение задеплоится автоматически!"
echo ""

