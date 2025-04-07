import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '../../strategies/jwt.strategy';

import { Farm } from '../../entities/farm.entity';
import { Plant } from '../../entities/plant.entity';
import { User } from '../../entities/user.entity';

import { PlantController } from '../controllers/plant.controller';

import { PlantService } from '../../services/plant/plant.service';
import { PlantCreateService } from '../../services/plant/plant-create.service';
import { PlantDeleteService } from '../../services/plant/plant-delete.service';
import { PlantGetService } from '../../services/plant/plant-get.service';
import { PlantListService } from '../../services/plant/plant-list.service';
import { PlantUpdateService } from '../../services/plant/plant-update.service';
import { TokenService } from '../../services/token/token.service';

import { FarmComponent } from '../../components/farm.component';
import { PlantComponent } from '../../components/plant.component';
import { UserComponent } from '../../components/user.component';

@Module({
  imports: [TypeOrmModule.forFeature([User, Plant, Farm])],
  controllers: [PlantController],
  providers: [
    PlantService,
    PlantCreateService,
    PlantUpdateService,
    JwtStrategy,
    FarmComponent,
    UserComponent,
    PlantGetService,
    PlantDeleteService,
    PlantListService,
    PlantComponent,
    TokenService,
  ],
  exports: [PlantService],
})
export class PlantModule {}
