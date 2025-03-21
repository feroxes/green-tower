import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { OwnerOrAdminTokenType } from '../types/auth.types';
import { OwnerOrAdminGuard } from '../../guards/ownerOrAdmin.guard';
import { PlantService } from '../../services/plant/plant.service';
import { PlantCreateDto } from '../dtos/plant.dto';

@Controller('plant')
@UseGuards(JwtAuthGuard)
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Post('create')
  @UseGuards(OwnerOrAdminGuard)
  async create(@Body() plantCreateDto: PlantCreateDto, @Req() req: Request) {
    const userToken = req.user as OwnerOrAdminTokenType;
    return this.plantService.create(plantCreateDto, userToken);
  }
}
