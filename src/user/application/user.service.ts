import { Injectable, NotFoundException } from '@nestjs/common';
import { UserUpdateDto } from '../web/dto/user-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../persistence/user.entity';
import { UserRepository } from '../persistence/user.repository';
import { UserDeleteDto } from '../web/dto/user-delete.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository
  ) {
  }

  async updateUserName(
    id: number,
    userUpdateDto: UserUpdateDto,
  ): Promise<UserUpdateDto> {
    const { username } = userUpdateDto;

    const user = await this.userRepository.findOne({
      where: { id: id, username: username },
    });

    if (!user) {
      throw new NotFoundException('해당 Id를 가진 회원은 존재하지 않습니다.');
    } else {
      user.username = username;
      await this.userRepository.save(user);
    }

    return user;
  }

  async deleteUser(id: number, userDeleteDto: UserDeleteDto): Promise<void> {
    const { username } = userDeleteDto;

    const user = await this.userRepository.findOne({
      where: { id: id, username: username },
    });

    let result;
    if (user) {
      result = await this.userRepository.delete(id);
    } else {
      //result.affected == 0
      throw new NotFoundException(`해당 Id를 가진 회원은 존재하지 않습니다.`);
    }

    console.log('result', result);
  }
}
