import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { UserCreateCmdDto, UserDeleteDto } from '../dtos/user.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { OwnerTokenType } from '../types/auth.types';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createDto: UserCreateCmdDto, @Req() req: Request) {
    const owner = req.user as OwnerTokenType;
    return this.userService.create(createDto, owner);
  }

  @Post('delete')
  async delete(@Body() deleteDto: UserDeleteDto, @Req() req: Request) {
    const owner = req.user as OwnerTokenType;
    return this.userService.delete(deleteDto, owner);
  }
}
