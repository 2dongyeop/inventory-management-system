import { Injectable, NotFoundException } from '@nestjs/common';
import { InventoryStatus } from '../web/inventory-status.enum';
import { CreateInventoryDto } from '../web/dto/create-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryRepository } from '../persistence/inventory.repository';
import { Inventory } from '../persistence/inventory.entity';
import { User } from '../../user/persistence/user.entity';
import { ReadInventoryDto } from '../web/dto/read-inventory.dto';
import { UpdateInventoryDto } from '../web/dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: InventoryRepository
  ) {}

  async getAllInventorys(user: User): Promise<ReadInventoryDto[]> {
    const query = this.inventoryRepository.createQueryBuilder('inventory');

    query.where('inventory.user_Id = :user_Id', { user_Id: user.id });

    const inventorys = await query.getMany();

    return inventorys;
  }

  async getInventoryById(id: number): Promise<ReadInventoryDto> {
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

  async deleteInventory(id: number): Promise<void> {
    const result = await this.inventoryRepository.delete(id);

    if (result.affected == 0) {
      throw new NotFoundException(`해당 Id를 가진 재고는 존재하지 않습니다.`);
    }

    console.log('result', result);
  }

  async updateInventory(id: number, updateInventoryDto: UpdateInventoryDto) {
    await this.inventoryRepository
      .createQueryBuilder()
      .update(Inventory)
      .set(updateInventoryDto.generateChanges())
      .where('id = :id', { id })
      .execute();
  }
}
