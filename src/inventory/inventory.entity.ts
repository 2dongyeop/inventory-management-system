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

  @Column({
    default: null,
  })
  description?: string;

  @Column({
    default: null,
  })
  manufacturer?: string;

  @Column()
  status: InventoryStatus;

  @Column({
    default: null,
  })
  price_fluctuation?: string;
}