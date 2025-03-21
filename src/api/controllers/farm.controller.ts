import { Controller, Get, Body, Req, UseGuards } from '@nestjs/common';
import { FarmService } from '../../services/farm/farm.service';
import { FarmGetDto } from '../dtos/farm.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { OwnerGuard } from '../../guards/owner.guard';
import { OwnerTokenType } from '../types/auth.types';

@Controller('farm')
@UseGuards(JwtAuthGuard)
export class FarmController {
  constructor(private farmService: FarmService) {}

  @Get('get')
  @UseGuards(OwnerGuard)
  async get(@Body() farmGetDto: FarmGetDto, @Req() req: Request) {
    const owner = req.user as OwnerTokenType;
    return this.farmService.get(farmGetDto, owner);
  }
}
