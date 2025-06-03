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

import { Order } from './order.entity';
import { Plant } from './plant.entity';

import { PlantingType } from './enums/planting-type.enum';

export enum OrderItemType {
  CUT = 'cut',
  PLATE = 'plate',
}

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Plant, (item) => item.orderItems)
  @JoinColumn({ name: 'plantId' })
  plant: Plant;

  @Column({ type: 'enum', enum: PlantingType })
  type: PlantingType;

  @Column({ type: 'integer', nullable: true })
  amountOfPlates?: number;

  @Column({
    nullable: true,
    type: 'numeric',
    precision: 10,
    scale: 6,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  amountOfGrams?: number;

  @Column({ type: 'decimal' })
  unitPrice: number;

  @Column({ type: 'decimal' })
  totalPrice: number;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
