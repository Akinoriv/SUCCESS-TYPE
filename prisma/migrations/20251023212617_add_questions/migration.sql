/*
  Warnings:

  - You are about to drop the `personality_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `isActive` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `quizId` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `questions` table. All the data in the column will be lost.
  - Made the column `options` on table `questions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `variations` on table `questions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "personality_types_slug_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "personality_types";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL,
    "textDefault" TEXT NOT NULL,
    "variations" JSONB NOT NULL,
    "type" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "dimension" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_questions" ("createdAt", "dimension", "id", "options", "order", "textDefault", "type", "variations") SELECT "createdAt", "dimension", "id", "options", "order", "textDefault", "type", "variations" FROM "questions";
DROP TABLE "questions";
ALTER TABLE "new_questions" RENAME TO "questions";
CREATE UNIQUE INDEX "questions_order_key" ON "questions"("order");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
