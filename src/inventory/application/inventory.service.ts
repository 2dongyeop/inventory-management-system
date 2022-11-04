import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoryStatus } from '../web/inventory-status.enum';
import { CreateInventoryDto } from '../web/dto/create-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryRepository } from '../persistence/inventory.repository';
import { Inventory } from '../persistence/inventory.entity';
import { User } from '../../auth/persistence/user.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: InventoryRepository,
  ) {}

  async getAllInventorys(user: User): Promise<Inventory[]> {
    const query = this.inventoryRepository.createQueryBuilder('inventory');

    query.where('inventory.userId = :userId', { userId: user.id });

    const inventorys = await query.getMany();

    return inventorys;
  }

  async getInventoryById(id: number): Promise<Inventory> {
    const found = await this.inventoryRepository.findOne({ where: { id: id } });

    if (!found) {
      throw new NotFoundException('해당 Id를 가진 재고는 존재하지 않습니다.');
    }

    return found;
  }

  async createInventory(
    createInventoryDto: CreateInventoryDto,
    user: User,
  ): Promise<Inventory> {
    const { name, price } = createInventoryDto;

    const inventory: Inventory = this.inventoryRepository.create({
      name,
      price,
      status: InventoryStatus.NONSALE,
      user,
    });

    await this.inventoryRepository.save(inventory);
    return inventory;
  }

  async updateInventoryStatus(
    id: number,
    status: InventoryStatus,
  ): Promise<Inventory> {
    const inventory = await this.getInventoryById(id);

    inventory.status = status;
    await this.inventoryRepository.save(inventory);

    return inventory;
  }

  async updateInventoryDescription(
    id: number,
    description: string,
  ): Promise<Inventory> {
    const inventory = await this.getInventoryById(id);

    inventory.description = description;
    await this.inventoryRepository.save(inventory);

    return inventory;
  }

  async updateInventoryManufacturer(
    id: number,
    manufacturer: string,
  ): Promise<Inventory> {
    const inventory = await this.getInventoryById(id);

    inventory.manufacturer = manufacturer;
    await this.inventoryRepository.save(inventory);

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