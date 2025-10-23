-- AlterTable
ALTER TABLE "users" ADD COLUMN "profileData" JSONB;

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quizId" TEXT NOT NULL DEFAULT 'main',
    "order" INTEGER NOT NULL,
    "textDefault" TEXT NOT NULL,
    "variations" JSONB,
    "type" TEXT NOT NULL,
    "options" JSONB,
    "dimension" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "personality_types" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quizId" TEXT NOT NULL DEFAULT 'main',
    "slug" TEXT NOT NULL,
    "titleDefault" TEXT NOT NULL,
    "descriptionDefault" TEXT NOT NULL,
    "contentDefault" JSONB NOT NULL,
    "variations" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "questions_quizId_order_key" ON "questions"("quizId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "personality_types_slug_key" ON "personality_types"("slug");
