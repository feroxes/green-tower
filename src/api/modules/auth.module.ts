import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '../../strategies/jwt.strategy';

import { Farm } from '../../entities/farm.entity';
import { User } from '../../entities/user.entity';

import { AuthController } from '../controllers/auth.controller';

import { AuthService } from '../../services/auth/auth.service';
import { AuthLoginService } from '../../services/auth/auth-login.service';
import { AuthSignupService } from '../../services/auth/auth-signup.service';

import { UserComponent } from '../../components/user.component';

@Module({
  imports: [TypeOrmModule.forFeature([User, Farm])],
  controllers: [AuthController],
  providers: [AuthService, AuthSignupService, AuthLoginService, JwtStrategy, UserComponent],
  exports: [AuthService],
})
export class AuthModule {}
