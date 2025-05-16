import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtStrategy } from '../../strategies/jwt.strategy';

import { Farm } from '../../entities/farm.entity';
import { User } from '../../entities/user.entity';

import { AuthController } from '../controllers/auth.controller';

import { AuthService } from '../../services/auth/auth.service';
import { AuthConfirmEmailService } from '../../services/auth/auth-confirm-email.service';
import { AuthLoginService } from '../../services/auth/auth-login.service';
import { AuthLogoutService } from '../../services/auth/auth-logout.service';
import { AuthRefreshService } from '../../services/auth/auth-refresh.service';
import { AuthResendConfirmationEmailService } from '../../services/auth/auth-resend-confirmation-email.service';
import { AuthSignupService } from '../../services/auth/auth-signup.service';
import { EmailService } from '../../services/email/email.service';
import { TokenService } from '../../services/token/token.service';

import { FarmComponent } from '../../components/farm.component';
import { UserComponent } from '../../components/user.component';

@Module({
  imports: [TypeOrmModule.forFeature([User, Farm])],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthLoginService,
    AuthLogoutService,
    AuthSignupService,
    AuthRefreshService,
    AuthConfirmEmailService,
    AuthResendConfirmationEmailService,
    EmailService,
    TokenService,
    FarmComponent,
    UserComponent,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
