import { Injectable, NotFoundException } from '@nestjs/common';
import { Inventory, InventoryStatus } from './inventory.model';
import { v1 as uuid } from 'uuid';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoryService {
  private inventorys: Inventory[] = [];

  getInventoryById(id: string): Inventory {
    const found = this.inventorys.find((inventory) => inventory.id === id);

    if (!found) {
      throw new NotFoundException("해당 Id를 가진 재고는 존재하지 않습니다.");
    }
    return found;
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

  updateInventoryStatus(id: string, status: InventoryStatus): Inventory {
    const inventory = this.getInventoryById(id);

    inventory.status = status;
    return inventory;
  }


  deleteInventory(id: string): void {
    const found = this.getInventoryById(id);

    this.inventorys = this.inventorys.filter((inventory) => inventory.id !== found.id);
  }
}
