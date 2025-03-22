import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '../../strategies/jwt.strategy';

import { Farm } from '../../entities/farm.entity';
import { User } from '../../entities/user.entity';

import { FarmController } from '../controllers/farm.controller';

import { FarmService } from '../../services/farm/farm.service';
import { FarmGetService } from '../../services/farm/farm-get.service';

import { UserComponent } from '../../components/user.component';

@Module({
  imports: [
    TypeOrmModule.forFeature([Farm, User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FarmController],
  providers: [FarmService, FarmGetService, JwtStrategy, UserComponent],
  exports: [FarmService],
})
export class FarmModule {}
