import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '../../strategies/jwt.strategy';

import { Farm } from '../../entities/farm.entity';
import { HarvestEntry } from '../../entities/harvest-entry.entity';
import { Plant } from '../../entities/plant.entity';
import { Planting } from '../../entities/planting.entity';
import { User } from '../../entities/user.entity';

import { PlantingController } from '../controllers/planting.controller';

import { HarvestEntryService } from '../../services/harvest-entry/harvest-entry.service';
import { HarvestEntryCreateCutService } from '../../services/harvest-entry/harvest-entry-create-cut.service';
import { HarvestEntryCreatePlateService } from '../../services/harvest-entry/harvest-entry-create-plate.service';
import { HarvestEntryCutPlateService } from '../../services/harvest-entry/harvest-entry-cut-plate.service';
import { PlantingService } from '../../services/planting/planting.service';
import { PlantingCreateService } from '../../services/planting/planting-create.service';
import { PlantingDeleteService } from '../../services/planting/planting-delete.service';
import { PlantingUGetService } from '../../services/planting/planting-get.service';
import { PlantingHarvestService } from '../../services/planting/planting-harvest.service';
import { PlantingListService } from '../../services/planting/planting-list.service';
import { PlantingSetStateService } from '../../services/planting/planting-set-state.service';
import { PlantingUpdateService } from '../../services/planting/planting-update.service';
import { TokenService } from '../../services/token/token.service';

import { FarmComponent } from '../../components/farm.component';
import { HarvestEntryComponent } from '../../components/harvest-entry.component';
import { PlantComponent } from '../../components/plant.component';
import { PlantingComponent } from '../../components/planting.component';
import { UserComponent } from '../../components/user.component';

@Module({
  imports: [TypeOrmModule.forFeature([User, Plant, Farm, Planting, HarvestEntry])],
  controllers: [PlantingController],
  providers: [
    HarvestEntryService,
    HarvestEntryCreateCutService,
    HarvestEntryCreatePlateService,
    HarvestEntryCutPlateService,
    PlantingService,
    PlantingCreateService,
    PlantingUpdateService,
    PlantingUGetService,
    PlantingDeleteService,
    PlantingListService,
    PlantingSetStateService,
    PlantingHarvestService,
    JwtStrategy,
    FarmComponent,
    UserComponent,
    PlantComponent,
    PlantingComponent,
    HarvestEntryComponent,
    TokenService,
  ],
  exports: [PlantingService],
})
export class PlantingModule {}
