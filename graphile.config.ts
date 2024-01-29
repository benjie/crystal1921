//graphile.config.ts
import { makePgService } from "postgraphile/adaptors/pg";
import { PostGraphileAmberPreset } from "postgraphile/presets/amber";

const connectionString = process.env.TSDB_CONNECTION_STRING;

const preset: GraphileConfig.Preset = {
  extends: [PostGraphileAmberPreset],
  pgServices: [makePgService({ connectionString })],
};

export default preset;
