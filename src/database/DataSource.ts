import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { IEnvConstants } from 'src/interfaces/env.interface';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as fs from 'fs';
import { join } from 'path';
require('dotenv').config();

const configService = new ConfigService<IEnvConstants>();

function getDataSourceOptions(
  configService: ConfigService<IEnvConstants>,
): DataSourceOptions {
  return {
    type: 'postgres',
    host: configService.get<string>('TYPEORM_SQL_HOST'),
    port: configService.get<number>('TYPEORM_SQL_PORT'),
    username: configService.get<string>('TYPEORM_SQL_USERNAME'),
    password: configService.get<string>('TYPEORM_SQL_PASSWORD'),
    database: configService.get<string>('TYPEORM_SQL_DATABASE'),
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync(join(__dirname, '/../../root.crt')).toString(),
    },
    entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations_nestjs_chat',
    synchronize: false,
  };
}

export const asyncDataSourceOptions: TypeOrmModuleAsyncOptions = {
  useFactory: async (configService: ConfigService<IEnvConstants>) =>
    getDataSourceOptions(configService),
  inject: [ConfigService],
};

const dataSource = new DataSource(getDataSourceOptions(configService));

export default dataSource;
