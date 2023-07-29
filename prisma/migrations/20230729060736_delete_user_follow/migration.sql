/*
  Warnings:

  - You are about to drop the `UserFollow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserFollow` DROP FOREIGN KEY `UserFollow_followedId_fkey`;

-- DropForeignKey
ALTER TABLE `UserFollow` DROP FOREIGN KEY `UserFollow_followingId_fkey`;

-- DropTable
DROP TABLE `UserFollow`;
