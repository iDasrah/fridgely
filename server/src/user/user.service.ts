import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UserDto } from './dto/user.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(userId: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { id: userId },
      });
    } catch (err: unknown) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' // record not found
      ) {
        throw new NotFoundException('User not found');
      }
      throw err;
    }
  }

  async getUserByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (err: unknown) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' // record not found
      ) {
        throw new NotFoundException('User not found');
      }
      throw err;
    }
  }

  async createUser(data: CreateUserDto): Promise<UserDto> {
    try {
      return await this.prisma.user.create({ data });
    } catch (err: unknown) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2002' // unique constraint
      ) {
        throw new BadRequestException('Email already exists');
      }
      throw err;
    }
  }

  async updateUser(userId: string, data: Partial<UserDto>) {
    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data,
      });
    } catch (err: unknown) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' // record not found
      ) {
        throw new NotFoundException('User not found');
      }
      throw err;
    }
  }

  async deleteUser(userId: string) {
    try {
      return await this.prisma.user.delete({
        where: { id: userId },
      });
    } catch (err: unknown) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === 'P2025' // record not found
      ) {
        throw new NotFoundException('User not found');
      }
      throw err;
    }
  }
}
