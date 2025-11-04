/**
 * Seed скрипт для создания Landing Variants
 * Для запуска: npx tsx prisma/seed-landings.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding landing variants...')

  // Courses Category: 2 варианта для A/B теста
  
  // Вариант A: Фокус на "вине" (текущий дизайн)
  await prisma.landingVariant.upsert({
    where: { slug: 'courses-a' },
    update: {},
    create: {
      category: 'courses',
      name: 'Courses - Вариант A (Вина)',
      slug: 'courses-a',
      isActive: true,
      trafficSplit: 100, // 100% трафика на этот вариант (пока единственный)
      contentJson: {
        hero: {
          badge: 'Ты знаешь это чувство?',
          headline: 'Купил курс за 20к.<br/>Прошёл 3 урока. Бросил.<br/><span class="text-yellow-300">Чувствуешь вину?</span>',
          subheadline: 'Ты не ленивый. Ты не безвольный. С тобой всё в порядке. Просто ты работаешь не по своему энерготипу.',
          description: '5-минутный тест покажет, КАК ты работаешь на самом деле: твой ритм, фокус и энергию. И объяснит, почему не получалось раньше.',
        },
        cta: {
          text: 'Узнать свой энерготип',
          subtext: '⚡ 5 минут • 12 вопросов • Результат сразу • Бесплатно',
        },
        painPoints: [
          {
            emoji: '😫',
            title: '"После 4 часов работы уже нет сил"',
            description: 'Коллеги работают по 8-10 часов, а у тебя энергии хватает на 3-4. Начинаешь думать: "Может, со мной что-то не так?"',
          },
          {
            emoji: '🔄',
            title: '"Начинаешь с энтузиазмом, через неделю бросаешь"',
            description: 'Купил курс за 20k, прошёл 3 урока, забросил. Сейчас смотришь на него и чувствуешь вину. Знакомо?',
          },
          {
            emoji: '🤔',
            title: '"Думаешь неделями, не можешь начать"',
            description: 'Изучаешь, анализируешь, планируешь — но так и не делаешь первый шаг. Боишься, что выберешь неправильно.',
          },
          {
            emoji: '😔',
            title: '"Пробовал все методы — ничего не помогает"',
            description: 'Pomodoro, GTD, Deep Work, тайм-менеджмент — перепробовал всё. Не понимаешь, почему не работает.',
          },
        ],
        colors: {
          primary: '#F59E0B',
          secondary: '#EC4899',
          heroGradient: 'from-indigo-900 via-purple-900 to-pink-900',
        },
        seo: {
          title: 'Тест на энерготип — Узнай, почему ты бросаешь курсы',
          description: 'Купил курс, прошёл 3 урока, бросил? Это не лень. 5-минутный тест покажет твой энерготип и объяснит, почему так происходит. Бесплатно, результат сразу.',
        },
      },
    },
  })
  
  console.log('✅ Created: courses-a (Вина)')

  // Вариант B: Фокус на "любопытстве" (для будущего A/B теста)
  await prisma.landingVariant.upsert({
    where: { slug: 'courses-b' },
    update: {},
    create: {
      category: 'courses',
      name: 'Courses - Вариант B (Любопытство)',
      slug: 'courses-b',
      isActive: false, // Пока не активен
      trafficSplit: 0,
      contentJson: {
        hero: {
          badge: 'Узнай правду о себе',
          headline: 'Почему ты бросаешь<br/>курсы через неделю?<br/><span class="text-yellow-300">Дело не в лени</span>',
          subheadline: 'Это твой энерготип. Узнай, как ТЫ работаешь на самом деле, и перестань учиться "против себя".',
          description: '5-минутный тест покажет твой тип работы с энергией и фокусом. Получишь честные ответы без обвинений.',
        },
        cta: {
          text: 'Пройти тест за 5 минут',
          subtext: '⚡ Бесплатно • 12 вопросов • Результат сразу',
        },
        painPoints: [
          {
            emoji: '🤷',
            title: '"Уже 5 курсов купил — ни один не закончил"',
            description: 'Каждый раз начинаешь с энтузиазмом. Через неделю — скучно. Ещё через неделю — забыл. И так снова и снова.',
          },
          {
            emoji: '💸',
            title: '"Потратил 100к на обучение — результата ноль"',
            description: 'Skillbox, Нетология, марафоны, интенсивы. Деньги ушли, а ты остался на том же месте. Почему?',
          },
          {
            emoji: '🧠',
            title: '"Думаешь: может, я тупой?"',
            description: 'Другие проходят те же курсы и достигают результатов. А у тебя не получается. Дело не в тебе — дело в подходе.',
          },
          {
            emoji: '⚡',
            title: '"Энергии хватает на 2-3 дня, потом — спад"',
            description: 'Первая неделя — летаешь. Вторая — уже трудно. Третья — вообще не можешь себя заставить. Знакомо?',
          },
        ],
        colors: {
          primary: '#3B82F6',
          secondary: '#8B5CF6',
          heroGradient: 'from-blue-900 via-indigo-900 to-purple-900',
        },
        seo: {
          title: 'Узнай, почему ты бросаешь курсы — Тест на энерготип',
          description: 'Купил 5 курсов, не закончил ни один? Дело не в лени. 5-минутный тест покажет твой энерготип и объяснит, почему так происходит.',
        },
      },
    },
  })
  
  console.log('✅ Created: courses-b (Любопытство) - НЕАКТИВЕН')

  // Career Category: Заглушка для будущего
  await prisma.landingVariant.upsert({
    where: { slug: 'career-a' },
    update: {},
    create: {
      category: 'career',
      name: 'Career - Вариант A (Смена профессии)',
      slug: 'career-a',
      isActive: false, // Будет активирован позже
      trafficSplit: 100,
      contentJson: {
        hero: {
          badge: 'Для тех, кто ищет призвание',
          headline: 'Прошёл курс.<br/>Попробовал работать.<br/><span class="text-yellow-300">Не получилось?</span>',
          subheadline: 'Может, это не твоя профессия? Узнай свой энерготип и найди сферу, где ты БУДЕШЬ успешен.',
          description: 'Дело не в способностях — в выборе. 5-минутный тест покажет 5 профессий для твоего типа.',
        },
        cta: {
          text: 'Узнать свои 5 профессий',
          subtext: '⚡ 5 минут • Бесплатно • Результат сразу',
        },
        painPoints: [],
        colors: {
          primary: '#10B981',
          secondary: '#06B6D4',
          heroGradient: 'from-green-900 via-teal-900 to-cyan-900',
        },
        seo: {
          title: 'Тест на энерготип — Найди профессию, где ты будешь успешен',
          description: 'Прошёл курс, работа не получилась? Может, это не твоя профессия. Узнай свой энерготип и получи 5 профессий для твоего типа.',
        },
      },
    },
  })
  
  console.log('✅ Created: career-a (Смена профессии) - НЕАКТИВЕН')

  console.log('\n🎉 Landing variants seeding completed!')
  console.log('\n📊 Текущий статус:')
  console.log('  - courses-a: ✅ АКТИВЕН (100% трафика)')
  console.log('  - courses-b: ⏸️  НЕАКТИВЕН (для будущего A/B теста)')
  console.log('  - career-a:  ⏸️  НЕАКТИВЕН (контент придет позже)')
  console.log('\n💡 Чтобы запустить A/B тест для courses:')
  console.log('   UPDATE landing_variants SET isActive = true, trafficSplit = 50 WHERE slug = "courses-b";')
  console.log('   UPDATE landing_variants SET trafficSplit = 50 WHERE slug = "courses-a";')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding landing variants:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

