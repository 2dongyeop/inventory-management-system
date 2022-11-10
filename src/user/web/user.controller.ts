import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../application/user.service';
import { UserDeleteDto } from './dto/user-delete.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { GetUser } from '../../auth/web/get-user.decorator';
import { User } from '../persistence/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('/:id/username')
  @UseGuards(AuthGuard('jwt'))
  updateUserName(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) userUpdateDto: UserUpdateDto,
    @GetUser() user: User,
  ) {
    return this.userService.updateUserName(id, userUpdateDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) userDeleteDto: UserDeleteDto,
    @GetUser() user: User,
  ): void {
    this.userService.deleteUser(id, userDeleteDto, user);
  }
}
