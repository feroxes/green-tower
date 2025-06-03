import { Body, Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { OwnerGuard } from '@guards/owner.guard';

import { Executor } from '@decorators/executor.decorator';

import { FarmService } from '@services/farm/farm.service';

import { FarmGetDto } from '@dtos/farm.dto';

import { ExecutorType } from '@app-types/auth.types';

@Controller('farm')
@UseGuards(JwtAuthGuard)
export class FarmController {
  constructor(private farmService: FarmService) {}

  @Get('get')
  @UseGuards(OwnerGuard)
  async get(@Body() farmGetDto: FarmGetDto, @Executor() executor: ExecutorType) {
    return this.farmService.get(farmGetDto, executor);
  }
}
