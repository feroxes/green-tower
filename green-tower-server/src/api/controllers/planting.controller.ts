import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthorizedGuard } from '../../guards/authorized.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

import { PlantingService } from '../../services/planting/planting.service';

import { PlantingCreateDto } from '../dtos/planting.dto';

import { ExecutorType } from '../types/auth.types';

import { Executor } from '../../decorators/executor.decorator';

@Controller('planting')
@UseGuards(JwtAuthGuard)
export class PlantingController {
  constructor(private readonly plantingService: PlantingService) {}

  @Post('create')
  @UseGuards(AuthorizedGuard)
  async create(@Body() plantingCreateDto: PlantingCreateDto, @Executor() executor: ExecutorType) {
    return this.plantingService.create(plantingCreateDto, executor);
  }
}
