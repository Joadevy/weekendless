"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Login from "../../components/auth/Login";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return router.push("/");
  }

  return <Login />;
};

export default Page;
