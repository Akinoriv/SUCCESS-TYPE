import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const category = query.category as string // "courses", "career", "general", or "all"
    
    const whereClause = category && category !== 'all' 
      ? { landingCategory: category }
      : {}
    
    // 1. Общая статистика по сессиям
    const totalSessions = await prisma.quizSession.count({
      where: whereClause,
    })
    
    const completedSessions = await prisma.quizSession.count({
      where: {
        ...whereClause,
        completedAt: { not: null },
      },
    })
    
    // 2. Статистика по вариантам (groupBy)
    const variantStats = await prisma.quizSession.groupBy({
      by: ['landingVariant'],
      where: {
        ...whereClause,
        landingVariant: { not: null }, // Исключаем null варианты
      },
      _count: { id: true },
    })
    
    const completedByVariant = await prisma.quizSession.groupBy({
      by: ['landingVariant'],
      where: {
        ...whereClause,
        landingVariant: { not: null },
        completedAt: { not: null },
      },
      _count: { id: true },
    })
    
    // 3. Получить информацию о вариантах из LandingVariant таблицы
    const variantInfos = await prisma.landingVariant.findMany({
      where: category && category !== 'all' ? { category } : {},
      select: {
        slug: true,
        name: true,
        category: true,
        views: true,
        conversions: true,
        trafficSplit: true,
        isActive: true,
      },
    })
    
    // 4. Соединить данные: варианты с сессиями
    const variants = variantStats.map(v => {
      const completed = completedByVariant.find(c => c.landingVariant === v.landingVariant)
      const info = variantInfos.find(i => i.slug === v.landingVariant)
      
      const sessionsCount = v._count.id
      const completedCount = completed?._count.id || 0
      const conversionRate = sessionsCount > 0
        ? (completedCount / sessionsCount * 100).toFixed(2)
        : '0.00'
      
      return {
        variant: v.landingVariant,
        name: info?.name || v.landingVariant,
        category: info?.category || '?',
        sessions: sessionsCount,
        completed: completedCount,
        conversionRate: `${conversionRate}%`,
        trafficSplit: info?.trafficSplit || 0,
        isActive: info?.isActive || false,
        dbViews: info?.views || 0, // Просмотры из БД (может отличаться от sessions)
      }
    })
    
    // 5. Общий conversion rate
    const overallConversionRate = totalSessions > 0
      ? (completedSessions / totalSessions * 100).toFixed(2)
      : '0.00'
    
    return {
      category: category || 'all',
      total: {
        sessions: totalSessions,
        completed: completedSessions,
        conversionRate: `${overallConversionRate}%`,
      },
      variants: variants.sort((a, b) => b.sessions - a.sessions), // Сортировка по кол-ву сессий
    }
  } catch (error) {
    console.error('Error in conversions API:', error)
    return { 
      error: 'Failed to get conversions', 
      details: error.message 
    }
  } finally {
    await prisma.$disconnect()
  }
})

