/*
  Warnings:

  - Made the column `crawlStartUrl` on table `sources` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "sources" ALTER COLUMN "crawlStartUrl" SET NOT NULL;
