import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_SUBGRAPH_URL,
  documents: ["src/lib/graphql/**/*.graphql"],
  generates: {
    "src/lib/graphql/hooks.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-resolvers",
        "typescript-react-apollo",
      ],
    },
  },
  config: {
    namingConvention: {
      enumValues: "keep",
    },
    avoidOptionals: {
      field: true,
    },
    skipTypename: true,
  },
};

export default config;
