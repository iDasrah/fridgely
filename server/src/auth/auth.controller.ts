import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guard/local.guard';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { CreateUserDto, UserDto } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  login(@Req() req: { user: UserDto }) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    return this.authService.registerUser(name, email, password);
  }
}
