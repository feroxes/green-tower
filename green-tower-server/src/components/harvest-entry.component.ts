import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HarvestEntry } from '@entities/harvest-entry.entity';

import { HarvestEntryComponentError } from '@errors/harvest-entry-component.errors';

@Injectable()
export class HarvestEntryComponent {
  constructor(
    @InjectRepository(HarvestEntry)
    private harvestEntryRepository: Repository<HarvestEntry>,
  ) {}

  async checkHarvestEntryExistence(
    filter: { id: string; farm: { id: string } },
    useCase: string,
    params?: object,
  ): Promise<HarvestEntry> {
    const Errors = new HarvestEntryComponentError(useCase);

    const harvestEntry = await this.harvestEntryRepository.findOne({
      where: filter,
      ...(params && { ...params }),
    });

    if (!harvestEntry) {
      throw Errors.HarvestEntryNotFound();
    }
    return harvestEntry;
  }
}
