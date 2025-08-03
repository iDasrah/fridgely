import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from 'generated/prisma';
import { CreateFridgeDto } from './dto/create-fridge.dto';

@Injectable()
export class FridgeService {
  constructor(private prisma: PrismaService) {}

  async getFridge(fridgeId: string, ownerId: string) {
    try {
      return await this.prisma.fridge.findUnique({
        where: { id: fridgeId, ownerId },
      });
    } catch (err: unknown) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' // record not found
      ) {
        throw new NotFoundException('Fridge not found');
      }
      throw err;
    }
  }

  async getFridges(userId: string) {
    return this.prisma.fridge.findMany({
      where: { ownerId: userId },
    });
  }

  createFridge(createFridgeDto: CreateFridgeDto) {
    return this.prisma.fridge.create({
      data: createFridgeDto,
    });
  }

  async updateFridge(
    fridgeId: string,
    ownerId: string,
    data: Partial<CreateFridgeDto>,
  ) {
    try {
      return await this.prisma.fridge.update({
        where: { id: fridgeId, ownerId },
        data,
      });
    } catch (err: unknown) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' // record not found
      ) {
        throw new NotFoundException('Fridge not found');
      }
      throw err;
    }
  }

  async deleteFridge(fridgeId: string) {
    try {
      return await this.prisma.fridge.delete({
        where: { id: fridgeId },
      });
    } catch (err: unknown) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' // record not found
      ) {
        throw new NotFoundException('Fridge not found');
      }
      throw err;
    }
  }
}
