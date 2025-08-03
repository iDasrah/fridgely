import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFridgeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  ownerId: string;

  @IsString()
  description?: string;
}
