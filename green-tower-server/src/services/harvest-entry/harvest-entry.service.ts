import { Injectable } from '@nestjs/common';

import { HarvestEntryCreateCutService } from './harvest-entry-create-cut.service';
import { HarvestEntryCreatePlateService } from './harvest-entry-create-plate.service';
import { HarvestEntryCutPlateService } from './harvest-entry-cut-plate.service';
import { HarvestEntryListGroupedService } from './harvest-entry-list-grouped.service';

import { HarvestEntryCreateCutDto, HarvestEntryCreatePlateDto, HarvestEntryCutPlateDto } from '@dtos/harvest-entry.dto';

import { ExecutorType } from '@app-types/auth.types';

@Injectable()
export class HarvestEntryService {
  constructor(
    private readonly harvestEntryCreateCutService: HarvestEntryCreateCutService,
    private readonly harvestEntryCreatePlateService: HarvestEntryCreatePlateService,
    private readonly harvestEntryCutPlateService: HarvestEntryCutPlateService,
    private readonly harvestEntryListGroupedService: HarvestEntryListGroupedService,
  ) {}

  async createCut(
    harvestEntryCreateCutDto: HarvestEntryCreateCutDto,
    executor: ExecutorType,
    isInternalCall?: boolean,
  ) {
    return this.harvestEntryCreateCutService.createCut(harvestEntryCreateCutDto, executor, isInternalCall);
  }

  async createPlate(
    harvestEntryCreatePlateDto: HarvestEntryCreatePlateDto,
    executor: ExecutorType,
    isInternalCall?: boolean,
  ) {
    return this.harvestEntryCreatePlateService.createPlate(harvestEntryCreatePlateDto, executor, isInternalCall);
  }

  async cutPlate(harvestEntryCutPlateDto: HarvestEntryCutPlateDto, executor: ExecutorType) {
    return this.harvestEntryCutPlateService.cutPlate(harvestEntryCutPlateDto, executor);
  }

  async listGroupedByPlant(executor: ExecutorType) {
    return this.harvestEntryListGroupedService.listGroupedByPlant(executor);
  }
}
