import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { Farm } from './farm.entity';
import { Plant } from './plant.entity';
import { Planting } from './planting.entity';

export enum UserRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30 })
  firstName: string;

  @Column({ length: 30 })
  lastName: string;

  @Column({ length: 40 })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ default: false })
  @Exclude()
  isEmailConfirmed: boolean;

  @Column({ type: 'text', nullable: true })
  @Exclude()
  emailConfirmationToken: string | null;

  @Column({ type: 'timestamp', nullable: true })
  @Exclude()
  emailConfirmationExpires: Date | null;

  @Column({ type: 'text', nullable: true })
  @Exclude()
  refreshToken: string | null;

  @Exclude()
  @ManyToOne(() => Farm, (farm) => farm.users)
  @JoinColumn({ name: 'farmId' })
  farm: Farm;

  @OneToMany(() => Plant, (plant) => plant.createdBy)
  plants: Plant[];

  @OneToMany(() => Planting, (planting) => planting.createdBy)
  plantings: Planting[];

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
