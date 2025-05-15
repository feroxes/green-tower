import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Farm } from '../../entities/farm.entity';
import { Plant } from '../../entities/plant.entity';
import { User } from '../../entities/user.entity';

import { AuthModule } from './auth.module';
import { FarmModule } from './farm.module';
import { JwtGlobalModule } from './jwt.module';
import { PlantModule } from './plant.module';
import { UserModule } from './user.module';

import { CleanupService } from '../../services/cleanup/cleanup.service';
import { TokenService } from '../../services/token/token.service';

import { RefreshTokenMiddleware } from '../../middleware/refresh-token.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Farm]),
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
  ],
  controllers: [],
  providers: [TokenService, CleanupService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RefreshTokenMiddleware).exclude('/auth/(.*)').forRoutes('*');
  }
}
