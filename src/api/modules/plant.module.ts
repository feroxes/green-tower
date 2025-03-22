import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '../../strategies/jwt.strategy';

import { Farm } from '../../entities/farm.entity';
import { Plant } from '../../entities/plant.entity';
import { User } from '../../entities/user.entity';

import { PlantController } from '../controllers/plant.controller';

import { PlantService } from '../../services/plant/plant.service';
import { PlantCreateService } from '../../services/plant/plant-create.service';

import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Farm, Plant]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PlantController],
  providers: [PlantService, PlantCreateService, JwtStrategy, FarmComponent, UserComponent],
  exports: [PlantService],
})
export class PlantModule {}
