/*
  Warnings:

  - The `communityRole` column on the `members` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "community_role" AS ENUM ('owner', 'contributor', 'reader');

-- AlterTable
ALTER TABLE "members" DROP COLUMN "communityRole",
ADD COLUMN     "communityRole" "community_role" NOT NULL DEFAULT 'reader';

-- DropEnum
DROP TYPE "CommunityRole";
