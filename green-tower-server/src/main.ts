/* istanbul ignore file */
import { ValidationPipe } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './api/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableCors({
    origin: ['http://localhost:3001'], //FIXME
    methods: 'GET,HEAD,POST',
    credentials: true,
    exposedHeaders: ['New-Access-Token'],
  });

  await app.listen(3000);
}
bootstrap();
