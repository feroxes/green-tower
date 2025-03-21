import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';

import { AppModule } from '../src/api/modules/app.module';

export interface TestModuleOptions {
  imports?: any[];
  providers?: any[];
  controllers?: any[];
}

export async function init(): Promise<{ module: TestingModule; app: INestApplication }> {
  const module = await createTestModule();
  const app = module.createNestApplication();
  await app.init();
  return { module, app };
}

export async function createTestModule(options: TestModuleOptions = {}): Promise<TestingModule> {
  return Test.createTestingModule({
    imports: [
      AppModule,
      await ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env/.env.test',
      }),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ...(options.imports || []),
    ],
    providers: options.providers || [],
    controllers: options.controllers || [],
  }).compile();
}

export async function clearDatabase(module: TestingModule): Promise<void> {
  const dataSource = module.get<DataSource>(DataSource);
  // Drop all tables in the current database.
  await dataSource.dropDatabase();
  // Recreate the schema.
  await dataSource.synchronize();
}

export async function closeDatabaseConnection(module: TestingModule): Promise<void> {
  const dataSource = module.get<DataSource>(DataSource);
  await dataSource.destroy();
}
