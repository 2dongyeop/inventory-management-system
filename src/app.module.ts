import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { InventoryRepository } from './inventory/inventory.repository';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    InventoryModule,
    AuthModule
  ],
})
export class AppModule {}
