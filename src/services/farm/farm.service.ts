import { Injectable } from '@nestjs/common';

import { User } from '../../entities/user.entity';

import { FarmGetService } from './farm-get.service';

import { FarmGetDto } from '../../api/dtos/farm.dto';

@Injectable()
export class FarmService {
  constructor(private farmGetService: FarmGetService) {}

  async get(farmGetDto: FarmGetDto, owner: Partial<User>) {
    return this.farmGetService.get(farmGetDto, owner);
  }
}
