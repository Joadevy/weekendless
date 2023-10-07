"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

import { Button } from "../ui/button";

type Props = {
  session: any;
};

const SignInOutButtons = ({ session }: Props) => {
  return (
    <li className="flex items-center gap-2">
      {session ? (
        <>
          <p>{session?.user?.name}</p>
          <Button onClick={() => signOut()}>Log out</Button>
        </>
      ) : (
        <Link
          className="absolute right-32 top-0 border p-2 shadow-md"
          href={"/signIn"}
        >
          Sign In
        </Link>
      )}
    </li>
  );
};

export default SignInOutButtons;
