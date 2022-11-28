import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { GraphQLClient } from 'graphql-request';
import React from 'react';

interface Props {
  children: React.ReactNode;
  client: GraphQLClient;
}

export interface GraphQLClientState {
  graphQLClient: GraphQLClient;
}

export type GraphQLClientProviderState = GraphQLClientState | null;

export const GraphQLClientContext = React.createContext<GraphQLClientProviderState>(null);

export const queryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    error: console.error
  }
});

export function GraphQLClientProvider({ children, client }: Props) {
  return (
    <GraphQLClientContext.Provider
      value={{
        graphQLClient: client
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </GraphQLClientContext.Provider>
  );
}
