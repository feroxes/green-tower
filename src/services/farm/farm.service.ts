import { Injectable } from '@nestjs/common';
import { FarmCreateService } from './farm-create.service';
import { Farm } from '../../entities/farm.entity';

@Injectable()
export class FarmService {
  constructor(private farmCreateService: FarmCreateService) {}

  async create(data: Partial<Farm>) {
    return await this.farmCreateService.create(data);
  }
}
