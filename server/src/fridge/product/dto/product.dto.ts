import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @Type(() => Date)
  @IsNotEmpty()
  expirationDate: Date;

  fridgeId: string;
}
