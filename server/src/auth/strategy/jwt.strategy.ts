import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import fromAuthHeaderAsBearerToken = ExtractJwt.fromAuthHeaderAsBearerToken;
import { JwtPayloadDto, JwtPayloadValidatedDto } from '../dto/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'default',
    });
  }

  validate(payload: JwtPayloadDto): JwtPayloadValidatedDto {
    return { userId: payload.sub, username: payload.username };
  }
}
