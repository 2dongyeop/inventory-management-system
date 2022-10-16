import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoryStatus } from './inventory-status.enum';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryRepository } from './inventory.repository';
import { Inventory } from './inventory.entity';

@Injectable()
export class InventoryService {

  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: InventoryRepository,
  ) {}

  async getInventoryById(id: number): Promise<Inventory> {
    const found = await this.inventoryRepository.findOne({ where: {id: id} });

    if (!found) {
      throw new NotFoundException("해당 Id를 가진 재고는 존재하지 않습니다.");
    }

    return found;
  }

  async createInventory(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    const { name, price } = createInventoryDto;

    const inventory: Inventory = this.inventoryRepository.create({
      name,
      price,
      status: InventoryStatus.NONSALE,
    });

    await this.inventoryRepository.save(inventory);
    return inventory;

  }

  // updateInventoryStatus(id: string, status: InventoryStatus): Inventory {
  //   const inventory = this.getInventoryById(id);
  //
  //   inventory.status = status;
  //   return inventory;
  // }
  //
  //
  // deleteInventory(id: string): void {
  //   const found = this.getInventoryById(id);
  //
  //   this.inventorys = this.inventorys.filter((inventory) => inventory.id !== found.id);
  // }
}
