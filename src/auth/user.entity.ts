import {
  BaseEntity,
  Column,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
  Unique
} from "typeorm";
import { Inventory } from "../inventory/inventory.entity";
import { type } from "os";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany((type) => Inventory, (inventory) => inventory.user, {
    eager: true,
  })
  inventorys: Inventory[];
}
