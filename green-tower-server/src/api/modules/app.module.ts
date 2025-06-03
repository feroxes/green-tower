import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import type { RouteInfo } from '@nestjs/common/interfaces';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Customer } from '@entities/customer.entity';
import { Farm } from '@entities/farm.entity';
import { HarvestEntry } from '@entities/harvest-entry.entity';
import { Plant } from '@entities/plant.entity';
import { Planting } from '@entities/planting.entity';
import { User } from '@entities/user.entity';

import { AuthModule } from './auth.module';
import { CustomerModule } from './customer.module';
import { FarmModule } from './farm.module';
import { HarvestEntryModule } from './harvest-entry.module';
import { JwtGlobalModule } from './jwt.module';
import { PlantModule } from './plant.module';
import { PlantingModule } from './planting.module';
import { UserModule } from './user.module';

import { CleanupService } from '@services/cleanup/cleanup.service';
import { PlantingAutoSetStateService } from '@services/planting/planting-auto-set-state.service';
import { TokenService } from '@services/token/token.service';

import { RefreshTokenMiddleware } from '../../middleware/refresh-token.middleware';

const excludedAuthRoutes: RouteInfo[] = [
  { path: '/auth/login', method: RequestMethod.ALL },
  { path: '/auth/signup', method: RequestMethod.ALL },
  { path: '/auth/refresh', method: RequestMethod.ALL },
  { path: '/auth/confirmEmail/*', method: RequestMethod.ALL },
  { path: '/auth/resendConfirmationEmail', method: RequestMethod.ALL },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Farm, Plant, Planting, HarvestEntry, Customer]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env/.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('HOST'),
          port: config.get<number>('PORT'),
          username: config.get<string>('USERNAME'),
          password: config.get<string>('PASSWORD'),
          database: config.get<string>('DB_NAME'),
          autoLoadEntities: config.get<boolean>('AUTO_LOAD_ENTITIES'),
          synchronize: config.get<boolean>('SYNCHRONIZE'),
          entities: [Farm, User, Plant],
        };
      },
    }),
    ScheduleModule.forRoot(),
    JwtGlobalModule,
    FarmModule,
    AuthModule,
    UserModule,
    PlantModule,
    PlantingModule,
    CustomerModule,
    HarvestEntryModule,
  ],
  controllers: [],
  providers: [TokenService, CleanupService, PlantingAutoSetStateService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RefreshTokenMiddleware)
      .exclude(...excludedAuthRoutes)
      .forRoutes('*');
  }
}
