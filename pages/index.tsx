import React from 'react';
import { useSession } from 'providers/session';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Layout = dynamic(() => import('components/layout'));

const Home = () => {
  const router = useRouter();
  const { user } = useSession();

  if (!user) {
    return router.replace('/sign-in');
  } else if (user) {
    return router.replace('/dashboard');
  }

  return (
    <Layout>
      <main className="h-screen flex-1 relative pb-24 z-0 overflow-y-auto bg-slate-800"></main>
    </Layout>
  );
};

export default Home;
