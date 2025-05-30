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
import { Planting } from './planting.entity';

import { PlantingType } from './enums/planting-type.enum';

export enum HarvestEntryState {
  READY = 'ready',
  SOLD = 'sold',
  PRESENT = 'present',
  DEAD = 'dead',
}

@Entity()
@Index('IDX_HARVEST_ENTRY_CREATED_AT', ['createdAt'])
export class HarvestEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isManualCreate: boolean;

  @Column({
    type: 'enum',
    enum: PlantingType,
  })
  type: PlantingType;

  @Column({ type: 'enum', enum: HarvestEntryState, default: HarvestEntryState.READY })
  state: HarvestEntryState;

  @ManyToOne(() => Farm)
  @JoinColumn({ name: 'farmId' })
  @Exclude()
  farm: Farm;

  @ManyToOne(() => Planting, (planting) => planting.harvestEntries, { nullable: true })
  @JoinColumn({ name: 'plantingId' })
  planting?: Planting;

  @ManyToOne(() => Plant, (plant) => plant.harvestEntries)
  @JoinColumn({ name: 'plantId' })
  plant: Plant;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 6,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  harvestGram: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 6,
    nullable: true,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  harvestGramsLeft?: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 6,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  gramsDead: number;

  @VersionColumn()
  version: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
