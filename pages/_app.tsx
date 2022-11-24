import "../styles/globals.css";
import type { AppProps } from "next/app";
import SessionProvider from "../providers/session";
import { Amplify } from "aws-amplify";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Layout from "../components/layout";

Amplify.configure({
  aws_project_region: process.env.NEXT_PUBLIC_COGNITO_REGION!,
  aws_cognito_region: process.env.NEXT_PUBLIC_COGNITO_REGION!,
  aws_cognito_identity_pool_id: process.env.NEXT_PUBLIC_COGNITO_ID_POOL!,
  aws_user_pools_id: process.env.NEXT_PUBLIC_USER_POOL!,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
});

const client = new ApolloClient({
  uri: process.env.HASURA_GRAPHQL_URL!,
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET!,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <SessionProvider>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </SessionProvider>
    </Layout>
  );
}

export default MyApp;
