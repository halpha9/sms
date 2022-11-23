import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession } from "../providers/session";

const Home = () => {
  const router = useRouter();
  const { user } = useSession();
  console.log(user, "xx23");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      {user && <p>{user.attributes.email}</p>}
    </div>
  );
};

export default Home;
