import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
//controllers
import { AppController } from '../controllers/app.controller';
//services
import { AppService } from '../services/app.service';
//modules
import { FarmModule } from './farm.module';
//entities
import { Farm } from '../entities/farm.entity';

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
          entities: [Farm],
        };
      },
    }),
    FarmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
