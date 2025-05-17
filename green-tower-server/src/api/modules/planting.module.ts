import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '../../strategies/jwt.strategy';

import { Farm } from '../../entities/farm.entity';
import { Plant } from '../../entities/plant.entity';
import { Planting } from '../../entities/planting.entity';
import { User } from '../../entities/user.entity';

import { PlantingController } from '../controllers/planting.controller';

import { PlantingService } from '../../services/planting/planting.service';
import { PlantingCreateService } from '../../services/planting/planting-create.service';
import { TokenService } from '../../services/token/token.service';

import { FarmComponent } from '../../components/farm.component';
import { PlantComponent } from '../../components/plant.component';
import { UserComponent } from '../../components/user.component';

@Module({
  imports: [TypeOrmModule.forFeature([User, Plant, Farm, Planting])],
  controllers: [PlantingController],
  providers: [
    PlantingService,
    PlantingCreateService,
    JwtStrategy,
    FarmComponent,
    UserComponent,
    PlantComponent,
    TokenService,
  ],
  exports: [PlantingService],
})
export class PlantingModule {}
