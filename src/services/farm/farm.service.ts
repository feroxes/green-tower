import { Injectable } from '@nestjs/common';
import { FarmGetService } from './farm-get.service';
import { User } from '../../entities/user.entity';
import { FarmGetDto } from '../../dtos/farm.dto';

@Injectable()
export class FarmService {
  constructor(private farmGetService: FarmGetService) {}

  async get(farmGetDto: FarmGetDto, user: Partial<User>) {
    return this.farmGetService.get(farmGetDto, user);
  }
}
