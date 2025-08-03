import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalGuard } from './guard/local.guard';
import { RegisterDto } from './dto/register.dto';
import { Request } from 'express';

interface LoginRequest extends Request {
  user?: LoginDto;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  login(@Req() req: LoginRequest) {
    return this.authService.login(req.user as LoginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { name, email, password } = registerDto;
    return this.authService.registerUser(name, email, password);
  }
}
