import "../styles/globals.css";
import type { AppProps } from "next/app";
import SessionProvider from "../providers/session";
import { Amplify } from "aws-amplify";
import Layout from "../components/layout";
import graphQLClient from "../utils/graphql-fetcher";
import { GraphQLClientProvider } from "../providers/graphql-client";
import { Hydrate } from "@tanstack/react-query";
import ToastProvider from "providers/toast";

Amplify.configure({
  aws_project_region: process.env.NEXT_PUBLIC_COGNITO_REGION!,
  aws_cognito_region: process.env.NEXT_PUBLIC_COGNITO_REGION!,
  aws_cognito_identity_pool_id: process.env.NEXT_PUBLIC_COGNITO_ID_POOL!,
  aws_user_pools_id: process.env.NEXT_PUBLIC_USER_POOL!,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
});

const client = graphQLClient;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GraphQLClientProvider client={client}>
      <Hydrate state={pageProps.dehydratedState}>
        <ToastProvider>
          <SessionProvider client={client}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </ToastProvider>
      </Hydrate>
    </GraphQLClientProvider>
  );
}

export default MyApp;
