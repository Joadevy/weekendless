"use client";

import { signIn, signOut } from "next-auth/react";

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
        <Button onClick={() => signIn()}>Sign In</Button>
      )}
    </li>
  );
};

export default SignInOutButtons;
