import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InventoryStatus } from '../web/inventory-status.enum';
import { User } from '../../auth/persistence/user.entity';

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

  @ManyToOne((type) => User, (user) => user.inventorys, { eager: false })
  user: User;
}
