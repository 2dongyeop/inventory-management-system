import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryStatus } from './inventory-status.enum';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { InventoryStatusValidationPipe } from './pipes/inventory-status-validation.pipe';

@Controller('inventorys')
export class InventoryController {
  // constructor(private inventoryService: InventoryService) {
  //   /**
  //    * Service를 Controller에서 이용할 수 있도록 의존성 주입
  //    * DI : Dependency Injection
  //    * @param inventoryService
  //    */
  // }
  //
  // @Get('/')
  // getAllInventorys(): Inventory[] {
  //   return this.inventoryService.getAllInventorys();
  // }
  //
  // @Get('/:id')
  // getInventoryById(@Param('id') id:string): Inventory {
  //   return this.inventoryService.getInventoryById(id);
  // }
  //
  // @Post()
  // @UsePipes(ValidationPipe)
  // createInventory(
  //   @Body() createInventoryDto: CreateInventoryDto
  // ): Inventory {
  //   return this.inventoryService.createInventory(createInventoryDto);
  // }
  //
  // @Patch('/:id/status')
  // updateInventoryStatus(
  //   @Param('id') id: string,
  //   @Body('status', InventoryStatusValidationPipe) status: InventoryStatus
  // ) {
  //   return this.inventoryService.updateInventoryStatus(id, status);
  // }
  //
  // @Delete('/:id')
  // deleteInventory(@Param('id') id: string): void {
  //   this.inventoryService.deleteInventory(id);
  // }
}
