import { InventoryStatus } from '../inventory-status.enum';

export class UpdateInventoryDto {
  status?: InventoryStatus;
  description?: string;
  manufacturer?: string;
}
