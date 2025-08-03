import { Module } from '@nestjs/common';
import { FridgeController } from './fridge.controller';
import { FridgeService } from './fridge.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [FridgeController],
  providers: [FridgeService, PrismaService],
})
export class FridgeModule {}
