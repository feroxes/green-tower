import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '../../strategies/jwt.strategy';

import { Farm } from '../../entities/farm.entity';
import { Plant } from '../../entities/plant.entity';
import { User } from '../../entities/user.entity';

import { FarmController } from '../controllers/farm.controller';

import { FarmService } from '../../services/farm/farm.service';
import { FarmGetService } from '../../services/farm/farm-get.service';

import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, User, Plant])],
  controllers: [FarmController],
  providers: [FarmService, FarmGetService, JwtStrategy, FarmComponent, UserComponent],
  exports: [FarmService],
})
export class FarmModule {}
