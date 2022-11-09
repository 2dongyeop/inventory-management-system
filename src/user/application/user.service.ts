import { Injectable, NotFoundException } from '@nestjs/common';
import { UserUpdateDto } from '../web/dto/user-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../persistence/user.entity';
import { UserRepository } from '../persistence/user.repository';
import { UserDeleteDto } from '../web/dto/user-delete.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async updateUserName(
    id: number,
    userUpdateDto: UserUpdateDto,
  ): Promise<UserUpdateDto> {
    const { username } = userUpdateDto;

    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException('해당 Id를 가진 회원은 존재하지 않습니다.');
    } else {
      user.username = username;
      await this.userRepository.save(user);
    }

    return user;
  }

  async deleteUser(
    id: number,
    userDeleteDto: UserDeleteDto,
    user: User,
  ): Promise<void> {
    const { username, password } = userDeleteDto;

    if (
      user &&
      user.username === username &&
      bcrypt.compare(password, user.password)
    ) {
      const result = await this.userRepository.delete(id);
      console.log(`Result: ${result}`);
    } else {
      throw new NotFoundException(`해당 Id를 가진 회원은 존재하지 않습니다.`);
    }
  }
}
