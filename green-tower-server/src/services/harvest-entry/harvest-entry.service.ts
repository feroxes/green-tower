import { Injectable } from '@nestjs/common';

import { HarvestEntryCreateCutService } from './harvest-entry-create-cut.service';

import { HarvestEntryCreateCutDto } from '../../api/dtos/harvest-entry.dto';

import { ExecutorType } from '../../api/types/auth.types';

@Injectable()
export class HarvestEntryService {
  constructor(private readonly harvestEntryCreateCutService: HarvestEntryCreateCutService) {}

  async createCut(harvestEntryCreateCutDto: HarvestEntryCreateCutDto, executor: ExecutorType) {
    return this.harvestEntryCreateCutService.createCut(harvestEntryCreateCutDto, executor);
  }
}
