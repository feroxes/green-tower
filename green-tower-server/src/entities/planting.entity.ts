import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { Farm } from './farm.entity';
import { Plant } from './plant.entity';
import { User } from './user.entity';

export enum PlantingState {
  GROWING = 'growing',
  READY = 'ready',
  HARVESTED = 'harvested',
  DEAD = 'dead',
}

export const PlantingFinalStates = [PlantingState.HARVESTED, PlantingState.DEAD] as PlantingState[];

@Entity()
@Index('IDX_PLANTING_CREATED_AT', ['createdAt'])
export class Planting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: PlantingState,
  })
  state: PlantingState;

  @Column({ length: 2048, nullable: true, type: 'varchar' })
  notes?: string | null;

  @Column()
  amountOfPlates: number;

  @Column()
  amountOfGramsOfSeeds: number;

  @Exclude()
  @ManyToOne(() => Farm, (farm) => farm.plantings)
  @JoinColumn({ name: 'farmId' })
  farm: Farm;

  @ManyToOne(() => User, (user) => user.plantings)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @ManyToOne(() => Plant, (plant) => plant.plantings)
  @JoinColumn({ name: 'plantId' })
  plant: Plant;

  @VersionColumn()
  version: number;

  @Column({ type: 'timestamptz' })
  expectedHarvestTs: Date;

  @Column({ nullable: true, type: 'timestamptz' })
  harvestTs?: Date;

  @Column({ nullable: true, type: 'timestamptz' })
  deadTs?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
