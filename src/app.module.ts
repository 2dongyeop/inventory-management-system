import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    InventoryModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
