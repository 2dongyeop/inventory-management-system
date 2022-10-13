import { Body, Controller, Get, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.model';

@Controller('inventorys')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {
    /**
     * Service를 Controller에서 이용할 수 있도록 의존성 주입
     * DI : Dependency Injection
     * @param inventoryService
     */
  }

  @Get('/')
  getAllInventorys(): Inventory[] {
    return this.inventoryService.getAllInventorys();
  }

  @Post()
  createInventory(
    @Body('name') name: string,
    @Body('price') price: string
  ): Inventory {
    return this.inventoryService.createInventory(name, price);
  }
}
