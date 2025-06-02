import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '../../strategies/jwt.strategy';

import { Customer } from '../../entities/customer.entity';
import { Farm } from '../../entities/farm.entity';
import { User } from '../../entities/user.entity';

import { CustomerController } from '../controllers/customer.controller';

import { CustomerService } from '../../services/customer/customer.service';
import { CustomerCreateService } from '../../services/customer/customer-create.service';
import { TokenService } from '../../services/token/token.service';

import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, User, Farm])],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerCreateService, UserComponent, FarmComponent, JwtStrategy, TokenService],
  exports: [CustomerService],
})
export class CustomerModule {}
