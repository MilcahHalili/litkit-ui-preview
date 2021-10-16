/*
  Warnings:

  - Made the column `content` on table `Comment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Instructor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Workshop` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "Instructor" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "Workshop" ALTER COLUMN "name" SET NOT NULL;
