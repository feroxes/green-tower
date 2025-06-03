import { Injectable } from '@nestjs/common';

import { FarmGetService } from './farm-get.service';

import { FarmGetDto } from '@dtos/farm.dto';

import { ExecutorType } from '@app-types/auth.types';

@Injectable()
export class FarmService {
  constructor(private farmGetService: FarmGetService) {}

  async get(farmGetDto: FarmGetDto, executor: ExecutorType) {
    return this.farmGetService.get(farmGetDto, executor);
  }
}
