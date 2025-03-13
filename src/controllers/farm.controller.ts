import { Controller, Post, Body } from '@nestjs/common';
import { FarmService } from '../services/farm/farm.service';
import { FarmCreateDto } from '../dtos/farm.dto';

@Controller('farm')
export class FarmController {
  constructor(private farmService: FarmService) {}

  @Post('create')
  create(@Body() body: FarmCreateDto) {
    return this.farmService.create(body);
  }
}
