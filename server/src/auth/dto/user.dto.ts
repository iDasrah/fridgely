export class UserDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export class JwtPayload {
  username: string;
  sub: string;
}

export class JwtPayloadValidated {
  userId: string;
  username: string;
}
