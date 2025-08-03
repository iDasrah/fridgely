import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FridgeModule } from './fridge/fridge.module';

@Module({
  imports: [AuthModule, UserModule, FridgeModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
