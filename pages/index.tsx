import React from 'react';
import { useSession } from 'providers/session';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const { user } = useSession();

  if (!user) {
    return router.replace('/sign-in');
  } else if (user) {
    return router.replace('/dashboard');
  }

  return <main className="h-screen flex-1 relative pb-24 z-0 overflow-y-auto bg-slate-800"></main>;
};

export default Home;
