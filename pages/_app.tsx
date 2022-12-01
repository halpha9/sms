import '../styles/globals.css';
import type { AppProps } from 'next/app';
import SessionProvider from '../providers/session';
import { Amplify } from 'aws-amplify';
import Layout from '../components/layout';
import ToastProvider from 'providers/toast';

Amplify.configure({
  Auth: {
    region: process.env.NEXT_PUBLIC_COGNITO_REGION!,
    userPoolId: 'eu-west-2_H5L9iFZ1S',
    userPoolWebClientId: '1q92o2f9nuqvv9cl03lkjb0jsp',
    identityPoolId: 'eu-west-2:e2eebd08-a0c2-47be-bbfb-89a4d4d88d4d'
  },
  Storage: {
    AWSS3: {
      bucket: 'alpha-sms-filestoragestack-alphasmsbucket5eb2e059-oamstdnae9ru',
      region: process.env.NEXT_PUBLIC_COGNITO_REGION!
    }
  },
  aws_project_region: process.env.NEXT_PUBLIC_COGNITO_REGION!,
  aws_appsync_graphqlEndpoint: 'https://sybjuyeqwrcajjhrbyidpmeiti.appsync-api.eu-west-2.amazonaws.com/graphql',
  aws_appsync_region: process.env.NEXT_PUBLIC_COGNITO_REGION!,
  aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
  aws_appsync_apiKey: 'i3y4evjdvbenvfy32tc3eovbzq', // (optional) - AWS AppSync API Key
  ssr: true
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <SessionProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </ToastProvider>
  );
}

export default MyApp;
