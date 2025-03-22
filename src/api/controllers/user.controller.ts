import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { OwnerGuard } from '../../guards/owner.guard';

import { UserService } from '../../services/user/user.service';

import { UserCreateCmdDto, UserDeleteDto, UserSetRoleDto } from '../dtos/user.dto';

import { ExecutorType } from '../types/auth.types';

import { Executor } from '../../decorators/executor.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseGuards(OwnerGuard)
  async create(@Body() createDto: UserCreateCmdDto, @Executor() executor: ExecutorType) {
    return this.userService.create(createDto, executor);
  }

  @Post('delete')
  @UseGuards(OwnerGuard)
  async delete(@Body() deleteDto: UserDeleteDto, @Executor() executor: ExecutorType) {
    return this.userService.delete(deleteDto, executor);
  }

  @Post('setRole')
  @UseGuards(OwnerGuard)
  async setRole(@Body() setRoleDto: UserSetRoleDto, @Executor() executor: ExecutorType) {
    return this.userService.setRole(setRoleDto, executor);
  }
}
