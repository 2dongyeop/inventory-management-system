import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { InventoryService } from './inventory.service';
import { InventoryStatus } from './inventory-status.enum';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { InventoryStatusValidationPipe } from './pipes/inventory-status-validation.pipe';
import { Inventory } from './inventory.entity';

@Controller('inventorys')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {
    /**
     * Service를 Controller에서 이용할 수 있도록 의존성 주입
     * DI : Dependency Injection
     * @param inventoryService
     */
  }

  @Get()
  getAllInventorys(): Promise<Inventory[]> {
    return this.inventoryService.getAllInventorys();
  }

  @Get('/:id')
  getInventoryById(@Param('id') id: number): Promise<Inventory> {
    return this.inventoryService.getInventoryById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createInventory(@Body() createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    return this.inventoryService.createInventory(createInventoryDto);
  }

  @Patch('/:id/status')
  updateInventoryStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', InventoryStatusValidationPipe) status: InventoryStatus,
  ) {
    return this.inventoryService.updateInventoryStatus(id, status);
  }

  @Delete('/:id')
  deleteInventory(@Param('id', ParseIntPipe) id: number): void {
    this.inventoryService.deleteInventory(id);
  }
}
