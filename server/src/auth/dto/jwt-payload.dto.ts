export class JwtPayloadDto {
  username: string;
  sub: string;
}

export class JwtPayloadValidatedDto {
  userId: string;
  username: string;
}
