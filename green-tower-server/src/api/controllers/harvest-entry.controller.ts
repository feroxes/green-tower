import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthorizedGuard } from '../../guards/authorized.guard';

import { HarvestEntryService } from '../../services/harvest-entry/harvest-entry.service';

import {
  HarvestEntryCreateCutDto,
  HarvestEntryCreatePlateDto,
  HarvestEntryCutPlateDto,
} from '../dtos/harvest-entry.dto';

import { ExecutorType } from '../types/auth.types';

import { Executor } from '../../decorators/executor.decorator';

@Controller('harvestEntry')
export class HarvestEntryController {
  constructor(private readonly harvestEntryService: HarvestEntryService) {}

  @Post('createCut')
  @UseGuards(AuthorizedGuard)
  async createCut(@Body() harvestEntryCreateCutDto: HarvestEntryCreateCutDto, @Executor() executor: ExecutorType) {
    return this.harvestEntryService.createCut(harvestEntryCreateCutDto, executor);
  }

  @Post('createPlate')
  @UseGuards(AuthorizedGuard)
  async createPlate(
    @Body() harvestEntryCreatePlateDto: HarvestEntryCreatePlateDto,
    @Executor() executor: ExecutorType,
  ) {
    return this.harvestEntryService.createPlate(harvestEntryCreatePlateDto, executor);
  }

  @Post('cutPlate')
  @UseGuards(AuthorizedGuard)
  async cutPlate(@Body() harvestEntryCutPlateDto: HarvestEntryCutPlateDto, @Executor() executor: ExecutorType) {
    return this.harvestEntryService.cutPlate(harvestEntryCutPlateDto, executor);
  }
}
