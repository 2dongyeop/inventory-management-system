import { createParamDecorator } from '@nestjs/common';
import { User } from '../../user/persistence/user.entity';

export const GetUser = createParamDecorator((data, ctx): User => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
})