module.exports = {
  overwrite: true,
  schema: [
    {
      [process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL]: {
        headers: {
          "X-Hasura-Admin-Secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
        },
      },
    },
  ],
  documents: ["./queries/**/*.graphql"],
  overwrite: true,
  ignoreNoDocuments: true,
  require: ["dotenv/config"],
  generates: {
    "./queries/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
        "add",
      ],
      config: {
        content: ["// @ts-nocheck"],
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        fetcher: "graphql-request",
        mergeFragmentTypes: true,
        enumPrefix: false,
        dedupeFragments: true,
        exposeDocument: true,
        fragmentVariableSuffix: "Fragment",
        exposeFetcher: true,
      },
    },
  },
};
