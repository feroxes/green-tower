import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { Plant } from './plant.entity';
import { User } from './user.entity';

import { FarmConstants } from '../utils/constants';

@Entity()
export class Farm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: FarmConstants.NAME_MAX_LENGTH })
  name: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @OneToMany(() => User, (user: User) => user.farm)
  users: User[];

  @OneToMany(() => Plant, (user: Plant) => user.farm)
  plants: Plant[];

  @VersionColumn()
  version: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
