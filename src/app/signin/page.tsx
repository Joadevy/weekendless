"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Login from "../../components/auth/Login";
import AccordionQA from "../../components/Accordeon/AccordeonContainer";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return router.push("/");
  }

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="relative w-10/12 lg:w-1/2 flex flex-col gap-4">
        <Login />

        <footer>
          <AccordionQA />
        </footer>
      </div>
    </div>
  );
};

export default Page;
