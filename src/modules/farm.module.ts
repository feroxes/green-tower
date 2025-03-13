import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmController } from '../controllers/farm.controller';
import { FarmService } from '../services/farm/farm.service';
import { FarmCreateService } from '../services/farm/farm.create.service';
import { Farm } from '../entities/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farm])],
  controllers: [FarmController],
  providers: [FarmService, FarmCreateService],
})
export class FarmModule {}
