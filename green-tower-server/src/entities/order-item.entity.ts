import { numeric } from '@entities/config';
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

import { Order } from './order.entity';
import { Plant } from './plant.entity';
import { OrderItemHarvestEntry } from '@entities/order-item-harvest-entry.entity';

import { PlantingType } from './enums/planting-type.enum';

export enum OrderItemType {
  CUT = 'cut',
  PLATE = 'plate',
}

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Plant, (item) => item.orderItems)
  @JoinColumn({ name: 'plantId' })
  plant: Plant;

  @Column({ type: 'enum', enum: PlantingType })
  type: PlantingType;

  @OneToMany(() => OrderItemHarvestEntry, (entry) => entry.orderItem, { cascade: true })
  orderItemHarvestEntries: OrderItemHarvestEntry[];

  @Column({ type: 'integer', nullable: true })
  amountOfPlates?: number;

  @Column({ nullable: true, ...numeric })
  amountOfGrams?: number;

  @Column(numeric)
  unitPrice: number;

  @Column(numeric)
  totalPrice: number;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
