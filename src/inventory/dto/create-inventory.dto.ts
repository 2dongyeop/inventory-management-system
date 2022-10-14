import { IsNotEmpty } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: string;
}