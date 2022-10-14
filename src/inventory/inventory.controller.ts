import { Body, Controller, Get, Post } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.model';
import { CreateInventoryDto } from './dto/create-inventory.dto';

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
    @Body() createInventoryDto: CreateInventoryDto
  ): Inventory {
    return this.inventoryService.createInventory(createInventoryDto);
  }
}
