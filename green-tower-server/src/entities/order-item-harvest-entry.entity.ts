import { numeric } from '@entities/config';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Index } from 'typeorm';

import { HarvestEntry } from './harvest-entry.entity';
import { OrderItem } from './order-item.entity';

@Entity()
@Index('IDX_ORDER_ITEM_HARVEST_ENTRY_ORDER_ITEM_ID', ['orderItem'])
@Index('IDX_ORDER_ITEM_HARVEST_ENTRY_HARVEST_ENTRY_ID', ['harvestEntry'])
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
