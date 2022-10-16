import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [
    InventoryModule,
    TypeOrmModule.forRoot(typeORMConfig)],
})
export class AppModule {}
