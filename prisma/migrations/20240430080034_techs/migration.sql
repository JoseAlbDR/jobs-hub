-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "techs" TEXT[] DEFAULT ARRAY[]::TEXT[];
