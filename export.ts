import { makeSchema } from "postgraphile";
import { exportSchema } from "graphile-export";
import preset, { pgService } from "./graphile.config.js";
import path from "path";

const __dirname = path.resolve();

console.log(
  `Exporting a GraphQL schema from the database at ${preset?.pgServices?.[0].name}...`,
);

const { schema, resolvedPreset } = await makeSchema(preset);
const exportFileLocation = `${__dirname}/exported-schema.js`;

await exportSchema(schema, exportFileLocation, {
  mode: "typeDefs",
});

await pgService.release?.();
