import { Injectable } from '@nestjs/common';

import { Order } from '@entities/order.entity';

import { FarmComponent } from '@components/farm.component';
import { OrderComponent } from '@components/order.component';
import { UserComponent } from '@components/user.component';

import { OrderListDto } from '@dtos/order.dto';

import { ExecutorType } from '@app-types/auth.types';
import { ListResponseType } from '@app-types/dto.types';

@Injectable()
export class OrderListService {
  constructor(
    private userComponent: UserComponent,
    private farmComponent: FarmComponent,
    private orderComponent: OrderComponent,
  ) {}

  async list(orderListDto: OrderListDto, executor: ExecutorType): Promise<ListResponseType<Order>> {
    const useCase = 'order/list/';
    await this.userComponent.checkUserExistence(executor.id, executor.farmId, useCase);

    await this.farmComponent.checkFarmExistence(executor.farmId, useCase);

    return this.orderComponent.list(executor, orderListDto.meta);
  }
}
