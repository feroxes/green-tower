import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '../../strategies/jwt.strategy';

import { Farm } from '../../entities/farm.entity';
import { User } from '../../entities/user.entity';

import { UserController } from '../controllers/user.controller';

import { UserService } from '../../services/user/user.service';
import { UserCreateService } from '../../services/user/user-create.service';
import { UserDeleteService } from '../../services/user/user-delete.service';
import { UserSetRoleService } from '../../services/user/user-set-role.service';

import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';

@Module({
  imports: [TypeOrmModule.forFeature([User, Farm])],
  controllers: [UserController],
  providers: [
    UserService,
    UserCreateService,
    UserDeleteService,
    UserSetRoleService,
    JwtStrategy,
    FarmComponent,
    UserComponent,
  ],
  exports: [UserService],
})
export class UserModule {}
