import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Farm } from './farm.entity';
import { User } from './user.entity';

export enum PlantType {
  MICROGREEN = 'microgreen',
  COMMON = 'common',
}

@Entity()
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
