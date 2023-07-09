import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { IEnvConstants } from 'src/interfaces/env.interface';
import { DataSource, DataSourceOptions } from 'typeorm';
require('dotenv').config();

const configService = new ConfigService<IEnvConstants>();

function getDataSourceOptions(
  configService: ConfigService<IEnvConstants>,
): DataSourceOptions {
  return {
    type: configService.get<any>('TYPEORM_DB_TYPE'),
    host: configService.get<string>('TYPEORM_SQL_HOST'),
    port: configService.get<number>('TYPEORM_SQL_PORT'),
    username: configService.get<string>('TYPEORM_SQL_USERNAME'),
    password: configService.get<string>('TYPEORM_SQL_PASSWORD'),
    database: configService.get<string>('TYPEORM_SQL_DATABASE'),
    entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  };
}

export const asyncDataSourceOptions: TypeOrmModuleAsyncOptions = {
  useFactory: async (configService: ConfigService<IEnvConstants>) =>
    getDataSourceOptions(configService),
  inject: [ConfigService],
};

const dataSource = new DataSource(getDataSourceOptions(configService));

export default dataSource;
