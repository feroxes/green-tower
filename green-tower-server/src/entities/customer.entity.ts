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
import { Order } from './order.entity';
import { User } from './user.entity';

@Entity()
@Index('IDX_CUSTOMER_FARM_ID', ['farm'])
@Index('IDX_CUSTOMER_IS_DELETED', ['isDeleted'])
@Index('IDX_CUSTOMER_NAME', ['name'])
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
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

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
