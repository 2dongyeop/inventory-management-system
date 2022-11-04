import { Module } from '@nestjs/common';
import { InventoryController } from './web/inventory.controller';
import { InventoryService } from './application/inventory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './persistence/inventory.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventory]),
    AuthModule
  ],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
