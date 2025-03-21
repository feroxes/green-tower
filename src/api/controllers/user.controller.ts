import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { OwnerGuard } from '../../guards/owner.guard';

import { UserService } from '../../services/user/user.service';

import { UserCreateCmdDto, UserDeleteDto, UserSetRoleDto } from '../dtos/user.dto';

import { OwnerTokenType } from '../types/auth.types';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @UseGuards(OwnerGuard)
  async create(@Body() createDto: UserCreateCmdDto, @Req() req: Request) {
    const owner = req.user as OwnerTokenType;
    return this.userService.create(createDto, owner);
  }

  @Post('delete')
  @UseGuards(OwnerGuard)
  async delete(@Body() deleteDto: UserDeleteDto, @Req() req: Request) {
    const owner = req.user as OwnerTokenType;
    return this.userService.delete(deleteDto, owner);
  }

  @Post('setRole')
  @UseGuards(OwnerGuard)
  async setRole(@Body() setRoleDto: UserSetRoleDto, @Req() req: Request) {
    const owner = req.user as OwnerTokenType;
    return this.userService.setRole(setRoleDto, owner);
  }
}
