import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { Farm } from './farm.entity';
import { User } from './user.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  contactName?: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  notes?: string;

  @Exclude()
  @ManyToOne(() => Farm, (farm) => farm.customers)
  @JoinColumn({ name: 'farmId' })
  farm: Farm;

  @Exclude()
  @ManyToOne(() => User, (user) => user.customers)
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

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
