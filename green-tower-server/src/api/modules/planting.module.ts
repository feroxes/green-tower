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
import { PlantingUGetService } from '../../services/planting/planting-get.service';
import { PlantingUpdateService } from '../../services/planting/planting-update.service';
import { PlantingDeleteService } from '../../services/planting/planting-delete.service';
import { PlantingListService } from '../../services/planting/planting-list.service';
import { TokenService } from '../../services/token/token.service';

import { FarmComponent } from '../../components/farm.component';
import { PlantComponent } from '../../components/plant.component';
import { PlantingComponent } from '../../components/planting.component';
import { UserComponent } from '../../components/user.component';

@Module({
  imports: [TypeOrmModule.forFeature([User, Plant, Farm, Planting])],
  controllers: [PlantingController],
  providers: [
    PlantingService,
    PlantingCreateService,
    PlantingUpdateService,
    PlantingUGetService,
    PlantingDeleteService,
    PlantingListService,
    JwtStrategy,
    FarmComponent,
    UserComponent,
    PlantComponent,
    PlantingComponent,
    TokenService,
  ],
  exports: [PlantingService],
})
export class PlantingModule {}
