import { PrismaClient } from '@prisma/client'

declare global {
  var __prisma: PrismaClient | undefined
}

/**
 * Prisma singleton для предотвращения множественных подключений к БД
 * В development режиме переиспользует существующее подключение
 */
export const prisma = globalThis.__prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma
}

/**
 * Graceful shutdown при завершении процесса
 */
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})
