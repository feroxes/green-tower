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
import { User } from './user.entity';

export enum PlantType {
  MICROGREEN = 'microgreen',
  COMMON = 'common',
}

@Entity()
@Index('IDX_PLANT_CREATED_AT', ['createdAt'])
export class Plant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 2048 })
  description: string;

  @Column({ length: 2048 })
  notes: string;

  @Column({ length: 512 })
  imageUrl: string;

  @Column({
    type: 'enum',
    enum: PlantType,
    default: PlantType.MICROGREEN,
  })
  type: PlantType;

  @Column()
  expectedHoursToHarvest: number;

  @Column()
  hoursToSoak: number;

  @Column()
  hoursToMoveToLight: number;

  @Column()
  shouldBePressed: boolean;

  @Column()
  seedsGramPerPlate: number;

  @Column()
  expectedHarvestGramsPerPlate: number;

  @ManyToOne(() => Farm, (farm) => farm.plants)
  @JoinColumn({ name: 'farmId' })
  farm: Farm;

  @ManyToOne(() => User, (user) => user.plants)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @VersionColumn()
  version: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
