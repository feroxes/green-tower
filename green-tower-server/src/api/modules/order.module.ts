import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from '@entities/customer.entity';
import { Farm } from '@entities/farm.entity';
import { HarvestEntry } from '@entities/harvest-entry.entity';
import { Order } from '@entities/order.entity';
import { OrderItem } from '@entities/order-item.entity';
import { Plant } from '@entities/plant.entity';
import { Planting } from '@entities/planting.entity';
import { User } from '@entities/user.entity';

import { OrderController } from '../controllers/order.controller';

import { HarvestEntryService } from '@services/harvest-entry/harvest-entry.service';
import { HarvestEntryCreateCutService } from '@services/harvest-entry/harvest-entry-create-cut.service';
import { HarvestEntryCreatePlateService } from '@services/harvest-entry/harvest-entry-create-plate.service';
import { HarvestEntryCutPlateService } from '@services/harvest-entry/harvest-entry-cut-plate.service';
import { HarvestEntryListGroupedService } from '@services/harvest-entry/harvest-entry-list-grouped.service';
import { OrderService } from '@services/order/order.service';
import { OrderCreateService } from '@services/order/order-create.service';
import { OrderListService } from '@services/order/order-list.service';
import { TokenService } from '@services/token/token.service';

import { CustomerComponent } from '@components/customer.component';
import { FarmComponent } from '@components/farm.component';
import { HarvestEntryComponent } from '@components/harvest-entry.component';
import { OrderComponent } from '@components/order.component';
import { PlantComponent } from '@components/plant.component';
import { PlantingComponent } from '@components/planting.component';
import { UserComponent } from '@components/user.component';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Customer, User, Farm, Plant, HarvestEntry, Planting])],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderCreateService,
    OrderListService,
    UserComponent,
    FarmComponent,
    CustomerComponent,
    PlantComponent,
    TokenService,
    HarvestEntryService,
    HarvestEntryComponent,
    PlantingComponent,
    HarvestEntryCutPlateService,
    HarvestEntryCreateCutService,
    HarvestEntryCreatePlateService,
    HarvestEntryListGroupedService,
    OrderComponent,
  ],
  exports: [OrderService],
})
export class OrderModule {}
