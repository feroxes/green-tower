import { Injectable } from '@nestjs/common';

import { HarvestEntryCreateCutService } from './harvest-entry-create-cut.service';
import { HarvestEntryCreatePlateService } from './harvest-entry-create-plate.service';

import { HarvestEntryCreateCutDto, HarvestEntryCreatePlateDto } from '../../api/dtos/harvest-entry.dto';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class HarvestEntryService {
  constructor(
    private readonly harvestEntryCreateCutService: HarvestEntryCreateCutService,
    private readonly harvestEntryCreatePlateService: HarvestEntryCreatePlateService,
  ) {}

  async createCut(harvestEntryCreateCutDto: HarvestEntryCreateCutDto, executor: ExecutorType) {
    return this.harvestEntryCreateCutService.createCut(harvestEntryCreateCutDto, executor);
  }

  async createPlate(harvestEntryCreatePlateDto: HarvestEntryCreatePlateDto, executor: ExecutorType) {
    return this.harvestEntryCreatePlateService.createPlate(harvestEntryCreatePlateDto, executor);
  }
}
