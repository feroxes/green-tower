import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from './order.entity';
import { Plant } from './plant.entity';

export enum OrderItemType {
  CUT = 'cut',
  PLATE = 'plate',
}

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => Plant)
  plant: Plant;

  @Column({ type: 'enum', enum: OrderItemType })
  type: OrderItemType;

  @Column({ type: 'integer', nullable: true })
  amountOfPlates: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 6,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  amountOfGrams: number;

  @Column({ type: 'decimal' })
  unitPrice: number;

  @Column({ type: 'decimal' })
  totalPrice: number;
}
