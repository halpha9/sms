import { GraphQLClient } from 'graphql-request';

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL!);

export default graphQLClient;
