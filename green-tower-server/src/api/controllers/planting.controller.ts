import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';

import { AuthorizedGuard } from '@guards/authorized.guard';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';

import { Executor } from '@decorators/executor.decorator';

import { PlantingService } from '@services/planting/planting.service';

import {
  PlantingCreateDto,
  PlantingDeleteDto,
  PlantingGetDto,
  PlantingHarvestDto,
  PlantingListDto,
  PlantingSetStateDto,
  PlantingUpdateDto,
} from '@dtos/planting.dto';

import { ExecutorType } from '@app-types/auth.types';

@Controller('planting')
@UseGuards(JwtAuthGuard)
export class PlantingController {
  constructor(private readonly plantingService: PlantingService) {}

  @Post('create')
  @UseGuards(AuthorizedGuard)
  async create(@Body() plantingCreateDto: PlantingCreateDto, @Executor() executor: ExecutorType) {
    return this.plantingService.create(plantingCreateDto, executor);
  }

  @Post('update')
  @UseGuards(AuthorizedGuard)
  async update(@Body() plantingUpdateDto: PlantingUpdateDto, @Executor() executor: ExecutorType) {
    return this.plantingService.update(plantingUpdateDto, executor);
  }

  @Get('get')
  @UseGuards(AuthorizedGuard)
  async get(@Body() plantingGetDto: PlantingGetDto, @Executor() executor: ExecutorType) {
    return this.plantingService.get(plantingGetDto, executor);
  }

  @Post('delete')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthorizedGuard)
  async delete(@Body() plantingDeleteDto: PlantingDeleteDto, @Executor() executor: ExecutorType) {
    return this.plantingService.delete(plantingDeleteDto, executor);
  }

  @Get('list')
  @UseGuards(AuthorizedGuard)
  async list(@Body() plantingListDto: PlantingListDto, @Executor() executor: ExecutorType) {
    return this.plantingService.list(plantingListDto, executor);
  }

  @Post('/setState')
  @UseGuards(AuthorizedGuard)
  async setState(@Body() plantingSetStateDto: PlantingSetStateDto, @Executor() executor: ExecutorType) {
    return this.plantingService.setState(plantingSetStateDto, executor);
  }

  @Post('/harvest')
  @UseGuards(AuthorizedGuard)
  async harvest(@Body() plantingHarvestDto: PlantingHarvestDto, @Executor() executor: ExecutorType) {
    return this.plantingService.harvest(plantingHarvestDto, executor);
  }
}
