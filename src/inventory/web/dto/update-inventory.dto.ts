import { InventoryStatus } from '../inventory-status.enum';

export class UpdateInventoryDto {
  status?: InventoryStatus;
  description?: string;
  manufacturer?: string;

  generateChanges(): object {
    return {
      status: this.status.toString(),
      description: this.description,
      manufacturer: this.manufacturer,
    };
  }
}
