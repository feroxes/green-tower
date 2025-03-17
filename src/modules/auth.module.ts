import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth/auth.service';

import { JwtStrategy } from '../strategies/jwt.strategy';
import { User } from '../entities/user.entity';
import { Farm } from '../entities/farm.entity';
import { AuthSignupService } from '../services/auth/auth-signup.service';
import { AuthLoginService } from '../services/auth/auth-login.service';

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
  providers: [AuthService, AuthSignupService, AuthLoginService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
