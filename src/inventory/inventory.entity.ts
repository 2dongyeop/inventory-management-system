import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { InventoryStatus } from './inventory-status.enum';

@Entity()
export class Inventory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  description?: string;

  @Column()
  manufacturer?: string;

  @Column()
  status: InventoryStatus;

  @Column()
  price_fluctuation?: string;
}