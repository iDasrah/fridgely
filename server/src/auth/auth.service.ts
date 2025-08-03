import {
  BadRequestException,
  ClassSerializerInterceptor,
  Injectable,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  async validateUser(email: string, password: string): Promise<UserDto | null> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return null;
    }

    return new UserDto(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  async registerUser(
    name: string,
    email: string,
    password: string,
  ): Promise<UserDto> {
    const existingUser = await this.userService.getUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await argon2.hash(password);
    const newUser = await this.userService.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return new UserDto(newUser);
  }

  login(user: UserDto) {
    const payload = { username: user.name, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
