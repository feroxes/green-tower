import { Injectable } from '@nestjs/common';
import { FarmCreateService } from './farm.create.service';
import { Farm } from '../../entities/farm.entity';

@Injectable()
export class FarmService {
  constructor(private farmCreateService: FarmCreateService) {}

  create(data: Partial<Farm>) {
    return this.farmCreateService.create(data);
  }
}
