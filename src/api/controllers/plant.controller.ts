import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthorizedGuard } from '../../guards/authorized.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { OwnerOrAdminGuard } from '../../guards/owner-or-admin.guard';

import { PlantService } from '../../services/plant/plant.service';

import { PlantCreateDto, PlantDeleteDto, PlantGetDto, PlantUpdateDto } from '../dtos/plant.dto';

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

  @Get('get')
  @UseGuards(AuthorizedGuard)
  async get(@Body() plantGetDto: PlantGetDto, @Executor() executor: ExecutorType) {
    return this.plantService.get(plantGetDto, executor);
  }

  @Post('delete')
  @UseGuards(OwnerOrAdminGuard)
  async delete(@Body() plantDeleteDto: PlantDeleteDto, @Executor() executor: ExecutorType) {
    return this.plantService.delete(plantDeleteDto, executor);
  }
}
