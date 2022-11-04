import { IsNotEmpty } from 'class-validator';
import { InventoryStatus } from '../inventory-status.enum';
import { User } from '../../../auth/persistence/user.entity';

export class ReadInventoryDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: string;

  id: number;

  description?: string;

  manufacturer?: string;

  status: InventoryStatus;

  user: User;
}
