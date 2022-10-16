import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryRepository } from './inventory.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryRepository])
  ],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
