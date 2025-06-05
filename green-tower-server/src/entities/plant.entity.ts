import { numeric } from '@entities/config';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { Farm } from './farm.entity';
import { HarvestEntry } from './harvest-entry.entity';
import { OrderItem } from './order-item.entity';
import { Planting } from './planting.entity';
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

  @Column({ length: 2048, nullable: true, type: 'varchar' })
  description?: string | null;

  @Column({ length: 2048, nullable: true, type: 'varchar' })
  notes?: string | null;

  @Column({ length: 512, nullable: true, type: 'varchar' })
  imageUrl?: string | null;

  @Column({
    type: 'enum',
    enum: PlantType,
    default: PlantType.MICROGREEN,
  })
  type: PlantType;

  @Column()
  expectedHoursToHarvest: number;

  @Column({ nullable: true, type: 'int' })
  hoursToSoak?: number | null;

  @Column({ nullable: true, type: 'int' })
  hoursToMoveToLight?: number | null;

  @Column({ nullable: true, type: 'boolean' })
  shouldBePressed?: boolean | null;

  @Column()
  seedsGramPerPlate: number;

  @Column()
  expectedHarvestGramsPerPlate: number;

  @Column(numeric)
  expectedHarvestGramsPerGramOfSeeds: number;

  @Column(numeric)
  sellPricePerGram: number;

  @Column(numeric)
  sellPricePerPlate: number;

  @Exclude()
  @ManyToOne(() => Farm, (farm) => farm.plants)
  @JoinColumn({ name: 'farmId' })
  farm: Farm;

  @ManyToOne(() => User, (user) => user.plants)
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @OneToMany(() => Planting, (planting) => planting.plant)
  plantings: Planting[];

  @OneToMany(() => HarvestEntry, (harvestEntry) => harvestEntry.plant)
  harvestEntries: HarvestEntry[];

  @Exclude()
  @OneToMany(() => OrderItem, (orderItem) => orderItem.plant)
  orderItems: OrderItem[];

  @Exclude()
  @Column({ default: false })
  isDeleted: boolean;

  @VersionColumn()
  version: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
