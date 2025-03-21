import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
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
  imports: [
    TypeOrmModule.forFeature([User, Farm]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthSignupService, AuthLoginService, JwtStrategy, UserComponent],
  exports: [AuthService],
})
export class AuthModule {}
