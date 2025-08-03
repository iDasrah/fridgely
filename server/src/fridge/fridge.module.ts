import { Module } from '@nestjs/common';
import { FridgeController } from './fridge.controller';
import { FridgeService } from './fridge.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';

@Module({
  controllers: [FridgeController],
  providers: [FridgeService, PrismaService],
  imports: [ProductModule],
})
export class FridgeModule {}
