import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Farm } from '../../entities/farm.entity';
import { plantCreateError } from '../../api/errors/plant.errors';
import { OwnerOrAdminTokenType } from '../../api/types/auth.types';
import { PlantCreateDto } from '../../api/dtos/plant.dto';
import { Plant } from '../../entities/plant.entity';

@Injectable()
export class PlantCreateService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
    @InjectRepository(Plant)
    private plantRepository: Repository<Plant>,
  ) {}

  async create(plantCreateDto: PlantCreateDto, userToken: OwnerOrAdminTokenType): Promise<Plant> {
    const user = await this.userRepository.findOne({ where: { id: userToken.id, farm: { id: userToken.farmId } } });

    if (!user) {
      throw plantCreateError.UserNotFound();
    }

    const farm = await this.farmRepository.findOne({ where: { id: userToken.farmId } });

    if (!farm) {
      throw plantCreateError.FarmNotFound();
    }

    const _plantCreateDto = {
      ...plantCreateDto,
      createdBy: user,
      farm,
    };

    const plant = this.plantRepository.create(_plantCreateDto);

    return await this.plantRepository.save(plant);
  }
}
