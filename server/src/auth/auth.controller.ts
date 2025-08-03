import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guard/local.guard';
import { RegisterDto } from './dto/register.dto';
import { Request } from 'express';
import { UserDto } from './dto/user.dto';

interface LoginRequest extends Request {
  user?: UserDto;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  login(@Req() req: LoginRequest) {
    console.log(req.user);
    return this.authService.login(req.user as UserDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { name, email, password } = registerDto;
    return this.authService.registerUser(name, email, password);
  }
}
