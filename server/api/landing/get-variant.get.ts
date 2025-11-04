import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const category = query.category as string // "courses", "career", "general"
    
    if (!category) {
      return { error: 'Category required', code: 'MISSING_CATEGORY' }
    }
    
    // 1. Получить активные варианты для этой категории
    const variants = await prisma.landingVariant.findMany({
      where: {
        category,
        isActive: true,
      },
    })
    
    if (variants.length === 0) {
      // Если нет вариантов, вернуть дефолтный контент
      return { 
        variant: null,
        error: 'No active variants for this category',
        code: 'NO_VARIANTS'
      }
    }
    
    // 2. A/B Split: выбрать вариант по trafficSplit
    const totalSplit = variants.reduce((sum, v) => sum + v.trafficSplit, 0)
    const random = Math.random() * totalSplit
    
    let cumulative = 0
    let selectedVariant = variants[0]
    
    for (const variant of variants) {
      cumulative += variant.trafficSplit
      if (random <= cumulative) {
        selectedVariant = variant
        break
      }
    }
    
    // 3. Записать просмотр (increment views counter)
    await prisma.landingVariant.update({
      where: { id: selectedVariant.id },
      data: { views: { increment: 1 } },
    })
    
    // 4. Если есть userId, сохранить assignment
    if (query.userId) {
      await prisma.userAssignment.upsert({
        where: {
          userId_variantId: {
            userId: query.userId as string,
            variantId: selectedVariant.id,
          },
        },
        create: {
          userId: query.userId as string,
          variantId: selectedVariant.id,
        },
        update: {},
      })
    }
    
    // 5. Вернуть выбранный вариант
    return {
      variant: {
        slug: selectedVariant.slug,
        category: selectedVariant.category,
        name: selectedVariant.name,
        content: selectedVariant.contentJson,
      },
    }
  } catch (error) {
    console.error('Error in get-variant API:', error)
    return { 
      error: 'Failed to get variant', 
      code: 'SERVER_ERROR',
      details: error.message 
    }
  } finally {
    await prisma.$disconnect()
  }
})

