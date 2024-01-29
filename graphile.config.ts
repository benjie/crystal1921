//graphile.config.ts
import { makePgService } from "postgraphile/adaptors/pg";
import { PostGraphileAmberPreset } from "postgraphile/presets/amber";

const connectionString = process.env.TSDB_CONNECTION_STRING;

export const pgService = makePgService({ connectionString });

const preset: GraphileConfig.Preset = {
  extends: [PostGraphileAmberPreset],
  pgServices: [pgService],
};

export default preset;
