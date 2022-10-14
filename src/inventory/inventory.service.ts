import { Injectable } from '@nestjs/common';
import { Inventory, InventoryStatus } from './inventory.model';
import { v1 as uuid } from 'uuid';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoryService {
  private inventorys: Inventory[] = [];

  getInventoryById(id: string): Inventory {
    return this.inventorys.find((inventory) => inventory.id === id);
  }

  getAllInventorys(): Inventory[] {
    return this.inventorys;
  }

  createInventory(createInventoryDto: CreateInventoryDto) {
    const { name, price } = createInventoryDto;

    const inventory: Inventory = {
      id: uuid(),
      name,
      price,
      status: InventoryStatus.NONSALE,
    }

    this.inventorys.push(inventory);
    return inventory;
  }
}
