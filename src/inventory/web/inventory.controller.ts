import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InventoryService } from '../application/inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../auth/web/get-user.decorator';
import { User } from '../../user/persistence/user.entity';
import { ReadInventoryDto } from './dto/read-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

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
  getAllInventorys(@GetUser() user: User): Promise<ReadInventoryDto[]> {
    this.logger.verbose(`User ${user.username} trying to get all inventorys`);
    return this.inventoryService.getAllInventorys(user);
  }

  @Get('/:id')
  getInventoryById(@Param('id') id: number): Promise<ReadInventoryDto> {
    return this.inventoryService.getInventoryById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createInventory(
    @Body() createInventoryDto: CreateInventoryDto,
    @GetUser() user: User,
  ): Promise<CreateInventoryDto> {
    this.logger.verbose(`User ${user.username} creating a new inventory.
     Payload: ${JSON.stringify(createInventoryDto)} `);
    return this.inventoryService.createInventory(createInventoryDto, user);
  }

  @Delete('/:id')
  deleteInventory(@Param('id', ParseIntPipe) id: number): void {
    this.inventoryService.deleteInventory(id);
  }

  @Patch('/:id')
  async updateInventory(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateInventoryDto: UpdateInventoryDto,
  ): Promise<void> {
    await this.inventoryService.updateInventory(id, updateInventoryDto);
  }
}
