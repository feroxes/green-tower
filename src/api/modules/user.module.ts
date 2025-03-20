import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../../services/user/user.service';
import { UserCreateService } from '../../services/user/user-create.service';
import { UserDeleteService } from '../../services/user/user-delete.service';
import { UserComponent } from '../../components/user.component';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { User } from '../../entities/user.entity';
import { Farm } from '../../entities/farm.entity';

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
  controllers: [UserController],
  providers: [UserService, UserCreateService, UserDeleteService, JwtStrategy, UserComponent],
  exports: [UserService],
})
export class UserModule {}
