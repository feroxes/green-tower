import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '../../strategies/jwt.strategy';

import { Farm } from '../../entities/farm.entity';
import { HarvestEntry } from '../../entities/harvest-entry.entity';
import { Plant } from '../../entities/plant.entity';
import { Planting } from '../../entities/planting.entity';
import { User } from '../../entities/user.entity';

import { HarvestEntryController } from '../controllers/harvest-entry.controller';

import { HarvestEntryService } from '../../services/harvest-entry/harvest-entry.service';
import { HarvestEntryCreateCutService } from '../../services/harvest-entry/harvest-entry-create-cut.service';
import { TokenService } from '../../services/token/token.service';

import { FarmComponent } from '../../components/farm.component';
import { PlantComponent } from '../../components/plant.component';
import { PlantingComponent } from '../../components/planting.component';
import { UserComponent } from '../../components/user.component';

@Module({
  imports: [TypeOrmModule.forFeature([User, Plant, Farm, Planting, HarvestEntry])],
  controllers: [HarvestEntryController],
  providers: [
    HarvestEntryService,
    HarvestEntryCreateCutService,
    JwtStrategy,
    FarmComponent,
    UserComponent,
    PlantComponent,
    PlantingComponent,
    TokenService,
  ],
  exports: [HarvestEntryService],
})
export class HarvestEntryModule {}
