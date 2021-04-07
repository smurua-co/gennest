import { Controller, Get } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '../../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
