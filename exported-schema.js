/* eslint-disable graphile-export/export-instances, graphile-export/export-methods, graphile-export/exhaustive-deps */
import { constant, lambda, makeGrafastSchema, node, operationPlan } from "grafast";
function Query_queryPlan() {
  return operationPlan().rootValueStep;
}
const handler = {
  typeName: "Query",
  codec: {
    name: "raw",
    encode(value) {
      return typeof value === "string" ? value : null;
    },
    decode(value) {
      return typeof value === "string" ? value : null;
    }
  },
  match(specifier) {
    return specifier === "query";
  },
  getSpec() {
    return "irrelevant";
  },
  get() {
    return operationPlan().rootValueStep;
  },
  plan() {
    return constant`query`;
  }
};
const nodeIdCodecs = Object.assign(Object.create(null), {
  raw: handler.codec,
  base64JSON: {
    name: "base64JSON",
    encode(value) {
      return Buffer.from(JSON.stringify(value), "utf8").toString("base64");
    },
    decode(value) {
      return JSON.parse(Buffer.from(value, "base64").toString("utf8"));
    }
  },
  pipeString: {
    name: "pipeString",
    encode(value) {
      return Array.isArray(value) ? value.join("|") : null;
    },
    decode(value) {
      return typeof value === "string" ? value.split("|") : null;
    }
  }
});
const nodeIdHandlerByTypeName = Object.assign(Object.create(null), {
  Query: handler
});
export const typeDefs = /* GraphQL */`"""The root query type which gives access points into the data universe."""
type Query implements Node {
  """
  Exposes the root query type nested one level down. This is helpful for Relay 1
  which can only query top level fields if they are in a particular form.
  """
  query: Query!

  """
  The root query type must be a \`Node\` to work well with Relay 1 mutations. This just resolves to \`query\`.
  """
  id: ID!

  """Fetches an object given its globally unique \`ID\`."""
  node(
    """The globally unique \`ID\`."""
    id: ID!
  ): Node
}

"""An object with a globally unique \`ID\`."""
interface Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  id: ID!
}`;
export const plans = {
  Query: {
    __assertStep() {
      return true;
    },
    query: Query_queryPlan,
    id($parent) {
      const specifier = handler.plan($parent);
      return lambda(specifier, nodeIdCodecs[handler.codec.name].encode);
    },
    node: {
      plan(_$root, args) {
        return node(nodeIdHandlerByTypeName, args.get("id"));
      },
      args: {
        id: undefined
      }
    }
  }
};
export const schema = makeGrafastSchema({
  typeDefs: typeDefs,
  plans: plans
});