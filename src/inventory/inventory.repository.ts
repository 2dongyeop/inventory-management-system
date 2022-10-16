import { EntityRepository, Repository } from 'typeorm';
import { Inventory } from './inventory.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { InventoryStatus } from './inventory-status.enum';

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {

  async createInventory(createInventoryDto: CreateInventoryDto): Promise<Inventory> {

    const { name, price } = createInventoryDto;

    const inventory: Inventory = this.create({
      name,
      price,
      status: InventoryStatus.NONSALE,
    });

    await this.save(inventory);
    return inventory;
  }
}