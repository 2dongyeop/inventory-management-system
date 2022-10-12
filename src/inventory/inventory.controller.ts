import { Controller, Get } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { inventory } from './inventory.model';

@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {
    /**
     * Service를 Controller에서 이용할 수 있도록 의존성 주입
     * DI : Dependency Injection
     * @param inventoryService
     */
  }

  @Get()
  getAllInventorys(): inventory[] {
    return this.inventoryService.getAllInventorys();
  }

}
