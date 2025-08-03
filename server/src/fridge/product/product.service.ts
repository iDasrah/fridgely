import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '../../../generated/prisma';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getProducts(fridgeId: string) {
    try {
      return await this.prisma.product.findMany({
        where: { fridgeId },
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

  async getProduct(productId: string, fridgeId: string) {
    try {
      return await this.prisma.product.findUnique({
        where: { id: productId, fridgeId },
      });
    } catch (err: unknown) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' // record not found
      ) {
        throw new NotFoundException('Product not found');
      }
      throw err;
    }
  }

  async createProduct(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async updateProduct(
    productId: string,
    fridgeId: string,
    data: Partial<Omit<CreateProductDto, 'fridgeId'>>,
  ) {
    try {
      return await this.prisma.product.update({
        where: { id: productId, fridgeId },
        data,
      });
    } catch (err: unknown) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' // record not found
      ) {
        throw new NotFoundException('Product not found');
      }
      throw err;
    }
  }

  async deleteProduct(productId: string, fridgeId: string) {
    try {
      return await this.prisma.product.delete({
        where: { id: productId, fridgeId },
      });
    } catch (err: unknown) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' // record not found
      ) {
        throw new NotFoundException('Product not found');
      }
      throw err;
    }
  }
}
