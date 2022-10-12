import { Injectable } from '@nestjs/common';
import { inventory } from './inventory.model';

@Injectable()
export class InventoryService {
  private inventorys: inventory[] = [];

  getAllInventorys(): inventory[] {
    return this.inventorys;
  }
}
