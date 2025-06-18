/* istanbul ignore file */
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './api/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableCors({
    origin: (configService.get<string>('APP_URL') || "").split(',') || [],
    methods: 'GET,HEAD,POST',
    credentials: true,
    exposedHeaders: ['New-Access-Token'],
  });
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
