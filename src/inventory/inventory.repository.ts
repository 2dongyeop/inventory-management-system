import { EntityRepository, Repository } from 'typeorm';
import { Inventory } from './inventory.entity';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { InventoryStatus } from './inventory-status.enum';

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {

}