import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { InventoryStatus } from './inventory-status.enum';
import { User } from "../auth/user.entity";

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

  @ManyToOne((type) => User, (user) => user.inventorys, { eager: false })
  user: User;
}
