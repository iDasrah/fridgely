import { Exclude } from 'class-transformer';
import { User } from '../../../generated/prisma';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;

  @Exclude()
  password: string;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
