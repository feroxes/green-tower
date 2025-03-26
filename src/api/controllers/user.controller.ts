import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthorizedGuard } from '../../guards/authorized.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { OwnerGuard } from '../../guards/owner.guard';

import { UserService } from '../../services/user/user.service';

import { UserCreateCmdDto, UserDeleteDto, UserGetDto, UserSetRoleDto, UserUpdateDto } from '../dtos/user.dto';

import { ExecutorType } from '../types/auth.types';

import { Executor } from '../../decorators/executor.decorator';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseGuards(OwnerGuard)
  async create(@Body() userCreateDto: UserCreateCmdDto, @Executor() executor: ExecutorType) {
    return this.userService.create(userCreateDto, executor);
  }

  @Post('update')
  @UseGuards(AuthorizedGuard)
  async update(@Body() userUpdateDto: UserUpdateDto, @Executor() executor: ExecutorType) {
    return this.userService.update(userUpdateDto, executor);
  }

  @Post('delete')
  @UseGuards(OwnerGuard)
  async delete(@Body() userDeleteDto: UserDeleteDto, @Executor() executor: ExecutorType) {
    return this.userService.delete(userDeleteDto, executor);
  }

  @Post('setRole')
  @UseGuards(OwnerGuard)
  async setRole(@Body() userSetRoleDto: UserSetRoleDto, @Executor() executor: ExecutorType) {
    return this.userService.setRole(userSetRoleDto, executor);
  }

  @Get('get')
  @UseGuards(AuthorizedGuard)
  async get(@Body() userGetDto: UserGetDto, @Executor() executor: ExecutorType) {
    return this.userService.get(userGetDto, executor);
  }
}
