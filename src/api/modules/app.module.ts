import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../../services/app.service';
import { FarmModule } from './farm.module';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { Farm } from '../../entities/farm.entity';
import { User } from '../../entities/user.entity';

@Module({
  imports: [
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
          entities: [Farm, User],
        };
      },
    }),
    FarmModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
