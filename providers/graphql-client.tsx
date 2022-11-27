import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { GraphQLClient } from 'graphql-request';
import React from 'react';

type Props = {
  children: React.ReactNode;
  client: GraphQLClient;
};

export type GraphQLClientState = {
  graphQLClient: GraphQLClient;
};

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
