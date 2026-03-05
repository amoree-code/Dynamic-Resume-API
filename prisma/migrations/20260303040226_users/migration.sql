/*
  Warnings:

  - You are about to drop the column `order` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `featured` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_userId_fkey";

-- AlterTable
ALTER TABLE "Education" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "featured",
DROP COLUMN "order";

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "order";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "subtitle" TEXT,
ADD COLUMN     "surname" TEXT,
ADD COLUMN     "title" TEXT;

-- DropTable
DROP TABLE "Contact";
