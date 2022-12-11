import '../styles/globals.css';
import type { AppProps } from 'next/app';
import SessionProvider from '../providers/session';
import { Amplify } from 'aws-amplify';
import Layout from '../components/layout';
import ToastProvider from 'providers/toast';
import AppProvider from 'providers/chat';
import { ThemeProvider } from 'next-themes';

Amplify.configure({
  Auth: {
    region: process.env.NEXT_PUBLIC_COGNITO_REGION!,
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL!,
    userPoolWebClientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
    identityPoolId: process.env.NEXT_PUBLIC_COGNITO_ID_POOL!
  },
  Storage: {
    AWSS3: {
      bucket: process.env.NEXT_PUBLIC_BUCKET_NAME!,
      region: process.env.NEXT_PUBLIC_COGNITO_REGION!
    }
  },
  aws_project_region: process.env.NEXT_PUBLIC_COGNITO_REGION!,
  aws_appsync_graphqlEndpoint: process.env.NEXT_APPSYNC_GRAPHQL_ENDPOINT!,
  aws_appsync_region: process.env.NEXT_PUBLIC_COGNITO_REGION!,
  aws_appsync_authenticationType: process.env.NEXT_PUBLIC_APPSYNC_API_KEY!,
  aws_appsync_apiKey: process.env.NEXT_PUBLIC_APPSYNC_API_KEY!,
  ssr: true
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <ToastProvider>
        <AppProvider>
          <SessionProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
        </AppProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default MyApp;
