import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../application/user.service';
import { UserDeleteDto } from './dto/user-delete.dto';
import { UserUpdateDto } from "./dto/user-update.dto";

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('/:id/username')
  updateUserName(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) userUpdateDto: UserUpdateDto,
  ) {
    return this.userService.updateUserName(id, userUpdateDto);
  }

  @Delete('/:id')
  deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) userDeleteDto: UserDeleteDto,
  ): void {
    this.userService.deleteUser(id, userDeleteDto);
  }
}
