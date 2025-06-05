import { numeric } from '@entities/config';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { HarvestEntry } from './harvest-entry.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class OrderItemHarvestEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrderItem, (orderItem) => orderItem.orderItemHarvestEntries, { onDelete: 'CASCADE' })
  orderItem: OrderItem;

  @ManyToOne(() => HarvestEntry, { eager: true, onDelete: 'CASCADE' })
  harvestEntry: HarvestEntry;

  @Column(numeric)
  amountTaken: number;
}
