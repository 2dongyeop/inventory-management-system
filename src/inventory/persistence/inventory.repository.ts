import { EntityRepository, Repository } from 'typeorm';
import { Inventory } from './inventory.entity';

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {}
