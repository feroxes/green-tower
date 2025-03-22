import { Injectable } from '@nestjs/common';

import { FarmGetService } from './farm-get.service';

import { FarmGetDto } from '../../api/dtos/farm.dto';

import { OwnerTokenType } from '../../api/types/auth.types';

@Injectable()
export class FarmService {
  constructor(private farmGetService: FarmGetService) {}

  async get(farmGetDto: FarmGetDto, owner: OwnerTokenType) {
    return this.farmGetService.get(farmGetDto, owner);
  }
}
