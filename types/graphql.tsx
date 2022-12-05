import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';

export interface GraphQLOptions {
  input?: object;
  variables?: object;
  authMode?: GRAPHQL_AUTH_MODE;
}
