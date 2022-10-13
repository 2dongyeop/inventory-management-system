import { Injectable } from '@nestjs/common';
import { Inventory, InventoryStatus } from './inventory.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class InventoryService {
  private inventorys: Inventory[] = [];

  getAllInventorys(): Inventory[] {
    return this.inventorys;
  }

  createInventory(name: string, price: string) {
    const inventory: Inventory = {
      id: uuid,
      name,
      price,
      status: InventoryStatus.NONSALE,
    }

    this.inventorys.push(inventory);
    return inventory;
  }
}
