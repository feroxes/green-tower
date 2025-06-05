import { numeric } from '@entities/config';
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

import { Customer } from './customer.entity';
import { Farm } from './farm.entity';
import { OrderItem } from './order-item.entity';

export enum OrderState {
  CREATED = 'created',
  CANCELLED = 'cancelled',
}

@Entity()
@Index('IDX_ORDER_CUSTOMER_ID', ['customer'])
@Index('IDX_ORDER_FARM_ID', ['farm'])
@Index('IDX_ORDER_STATE', ['state'])
@Index('IDX_ORDER_CREATED_AT', ['createdAt'])
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Farm)
  farm: Farm;

  @ManyToOne(() => Customer, (item) => item.orders)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @Column({ type: 'enum', enum: OrderState, default: OrderState.CREATED })
  state: OrderState;

  @Column(numeric)
  totalPrice: number;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
