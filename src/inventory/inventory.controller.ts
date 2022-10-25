import {
  Body,
  Controller,
  Delete,
  Get, Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { InventoryService } from './inventory.service';
import { InventoryStatus } from './inventory-status.enum';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { InventoryStatusValidationPipe } from './pipes/inventory-status-validation.pipe';
import { Inventory } from './inventory.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('inventorys')
@UseGuards(AuthGuard())
export class InventoryController {
  private logger = new Logger('InventoryController');
  constructor(private inventoryService: InventoryService) {
    /**
     * Service를 Controller에서 이용할 수 있도록 의존성 주입
     * DI : Dependency Injection
     * @param inventoryService
     */
  }

  @Get()
  getAllInventorys(@GetUser() user: User): Promise<Inventory[]> {
    this.logger.verbose(`User ${user.username} trying to get all inventorys`);
    return this.inventoryService.getAllInventorys(user);
  }

  @Get('/:id')
  getInventoryById(@Param('id') id: number): Promise<Inventory> {
    return this.inventoryService.getInventoryById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createInventory(
    @Body() createInventoryDto: CreateInventoryDto,
    @GetUser() user: User,
  ): Promise<Inventory> {
    return this.inventoryService.createInventory(createInventoryDto, user);
  }

  @Patch('/:id/status')
  updateInventoryStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', InventoryStatusValidationPipe) status: InventoryStatus,
  ) {
    return this.inventoryService.updateInventoryStatus(id, status);
  }

  @Patch('/:id/descriptions')
  updateInventoryDescription(
    @Param('id', ParseIntPipe) id: number,
    @Body('description') description: string,
  ) {
    return this.inventoryService.updateInventoryDescription(id, description);
  }

  @Patch('/:id/manufacturers')
  updateInventoryManufacturer(
    @Param('id', ParseIntPipe) id: number,
    @Body('manufacturer') manufacturer: string,
  ) {
    return this.inventoryService.updateInventoryManufacturer(id, manufacturer);
  }

  @Delete('/:id')
  deleteInventory(@Param('id', ParseIntPipe) id: number): void {
    this.inventoryService.deleteInventory(id);
  }
}
