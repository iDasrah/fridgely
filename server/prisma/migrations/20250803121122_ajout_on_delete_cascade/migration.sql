-- DropForeignKey
ALTER TABLE "Fridge" DROP CONSTRAINT "Fridge_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_fridgeId_fkey";

-- AddForeignKey
ALTER TABLE "Fridge" ADD CONSTRAINT "Fridge_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_fridgeId_fkey" FOREIGN KEY ("fridgeId") REFERENCES "Fridge"("id") ON DELETE CASCADE ON UPDATE CASCADE;
