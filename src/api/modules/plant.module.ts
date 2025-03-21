import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PlantController } from '../controllers/plant.controller';
import { PlantService } from '../../services/plant/plant.service';
import { PlantCreateService } from '../../services/plant/plant-create.service';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { User } from '../../entities/user.entity';
import { Farm } from '../../entities/farm.entity';
import { Plant } from '../../entities/plant.entity';

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
  providers: [PlantService, PlantCreateService, JwtStrategy],
  exports: [PlantService],
})
export class PlantModule {}
