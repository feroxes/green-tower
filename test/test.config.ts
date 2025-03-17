import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from '../src/entities/user.entity';
import { Farm } from '../src/entities/farm.entity';
import { AppModule } from '../src/api/modules/app.module';

export interface TestModuleOptions {
  imports?: any[];
  providers?: any[];
  controllers?: any[];
}

export async function createTestModule(
  options: TestModuleOptions = {},
): Promise<TestingModule> {
  return Test.createTestingModule({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    imports: [AppModule, ...(options.imports || [])],
    providers: options.providers || [],
    controllers: options.controllers || [],
  }).compile();
}

export async function clearDatabase(module: TestingModule): Promise<void> {
  const dataSource = module.get<DataSource>(DataSource);

  // Disable foreign key checks
  await dataSource.query('SET session_replication_role = replica;');

  // Clear tables using raw SQL
  await dataSource.query('TRUNCATE TABLE "user" CASCADE;');
  await dataSource.query('TRUNCATE TABLE "farm" CASCADE;');

  // Re-enable foreign key checks
  await dataSource.query('SET session_replication_role = DEFAULT;');
}

export async function closeDatabaseConnection(
  module: TestingModule,
): Promise<void> {
  const dataSource = module.get<DataSource>(DataSource);
  await dataSource.destroy();
}
