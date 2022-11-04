import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UserService } from '../application/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('/:id/username')
  updateUserName(
    @Param('id', ParseIntPipe) id: number,
    @Body('username') username: string,
  ) {
    return this.userService.updateUserName(id, username);
  }
}
