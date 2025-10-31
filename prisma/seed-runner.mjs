/**
 * Seed runner - запускает seed.ts через динамический импорт
 * Работает в production на Railway без tsx
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const seedPath = join(__dirname, 'seed.ts');

try {
  console.log('🌱 Running database seed...');
  
  // Проверяем наличие seed.ts
  if (!existsSync(seedPath)) {
    throw new Error('seed.ts not found');
  }
  
  // Запускаем через tsx если доступен
  try {
    execSync('npx tsx prisma/seed.ts', {
      stdio: 'inherit',
      cwd: join(__dirname, '..')
    });
    console.log('✅ Seed completed via tsx');
  } catch (err) {
    console.log('⚠️  tsx not available, trying alternative...');
    
    // Альтернатива: запускаем через node с ESM loader
    execSync('node --loader tsx/esm prisma/seed.ts', {
      stdio: 'inherit',
      cwd: join(__dirname, '..')
    });
    console.log('✅ Seed completed via node loader');
  }
} catch (error) {
  console.error('❌ Seed failed:', error.message);
  process.exit(1);
}

