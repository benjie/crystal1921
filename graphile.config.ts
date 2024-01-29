//graphile.config.ts
import { makePgService } from 'postgraphile/adaptors/pg';
import { PostGraphileAmberPreset } from 'postgraphile/presets/amber';

interface PgConnectConfig {
  user: string
  database: string
  password: string
  host: string
  port: string
}

const pgConfig: PgConnectConfig = {
  user: process.env.TSDB_USERNAME! || 'postgres',
  password: process.env.TSDB_PASSWORD! || 'password',
  database: process.env.TSDB_DATABASE! || 'local_test',
  host: process.env.TSDB_HOST! || '127.0.0.1',
  port: process.env.TSDB_PORT! || '5432',
};

const connectionString = `postgres://${pgConfig.user}:${pgConfig.password}@${pgConfig.host}:${pgConfig.port}/${pgConfig.database}`;

const preset: GraphileConfig.Preset = {
  extends: [PostGraphileAmberPreset],
  pgServices: [makePgService({ connectionString })],
};

export default preset;
