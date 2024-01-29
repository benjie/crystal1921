import { grafserv } from "grafserv/node";
import { createServer } from "node:http";
import preset from "./graphile.config.js";
import { schema } from "./exported-schema.js";

const server = createServer();
const serv = grafserv({ preset, schema });
serv.addTo(server);
server.listen(5555);
console.log("Listening on http://localhost:5555/");
