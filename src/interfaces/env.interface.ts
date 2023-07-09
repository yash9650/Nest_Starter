export interface IEnvConstants {
  JWT_SECRET_KEY: string;
  SALT_ROUNDS: string;
  TYPEORM_DB_TYPE: string;
  TYPEORM_SQL_HOST: string;
  TYPEORM_SQL_PORT: number;
  TYPEORM_SQL_USERNAME: string;
  TYPEORM_SQL_PASSWORD: string;
  TYPEORM_SQL_DATABASE: string;
}

export type EnvKeys = keyof IEnvConstants;
