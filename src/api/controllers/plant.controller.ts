import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { OwnerOrAdminGuard } from '../../guards/owner-or-admin.guard';

import { PlantService } from '../../services/plant/plant.service';

import { PlantCreateDto, PlantUpdateDto } from '../dtos/plant.dto';

import { ExecutorType } from '../types/auth.types';

import { Executor } from '../../decorators/executor.decorator';

@Controller('plant')
@UseGuards(JwtAuthGuard)
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Post('create')
  @UseGuards(OwnerOrAdminGuard)
  async create(@Body() plantCreateDto: PlantCreateDto, @Executor() executor: ExecutorType) {
    return this.plantService.create(plantCreateDto, executor);
  }

  @Post('update')
  @UseGuards(OwnerOrAdminGuard)
  async update(@Body() plantUpdateDto: PlantUpdateDto, @Executor() executor: ExecutorType) {
    return this.plantService.update(plantUpdateDto, executor);
  }
}
