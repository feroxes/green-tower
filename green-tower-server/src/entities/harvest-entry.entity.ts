import { numeric } from '@entities/config';
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
export type HarvestEntryWithoutPlant = Omit<HarvestEntry, 'plant'>;

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

  @Column(numeric)
  harvestGram: number;

  @Column({ nullable: true, ...numeric })
  harvestGramsLeft?: number;

  @Column({ nullable: true, ...numeric })
  harvestAmountOfPlates?: number;

  @Column({ nullable: true, ...numeric })
  harvestAmountOfPlatesLeft?: number;

  @Column(numeric)
  gramsDead: number;

  @Column({ nullable: true, ...numeric })
  amountOfPlatesDead?: number;

  @VersionColumn()
  version: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
