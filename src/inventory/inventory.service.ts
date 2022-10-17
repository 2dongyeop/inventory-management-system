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
    const found = await this.inventoryRepository.findOne({ where: { id: id } });

    if (!found) {
      throw new NotFoundException('해당 Id를 가진 재고는 존재하지 않습니다.');
    }

    return found;
  }

  async createInventory(
    createInventoryDto: CreateInventoryDto,
  ): Promise<Inventory> {
    const { name, price } = createInventoryDto;

    const inventory: Inventory = this.inventoryRepository.create({
      name,
      price,
      status: InventoryStatus.NONSALE,
    });

    await this.inventoryRepository.save(inventory);
    return inventory;
  }

  async updateInventoryStatus(
    id: number,
    status: InventoryStatus,
  ): Promise<Inventory> {
    const inventory = this.getInventoryById(id);

    (await inventory).status = status;
    await this.inventoryRepository.save(await inventory);

    return inventory;
  }

  async deleteInventory(id: number): Promise<void> {
    const result = await this.inventoryRepository.delete(id);

    if (result.affected == 0) {
      throw new NotFoundException(`해당 Id를 가진 재고는 존재하지 않습니다.`);
    }

    console.log('result', result);
  }
}
