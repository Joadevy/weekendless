"use client";

import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  session: Session | null;
};

const SignInOutButtons = ({ session }: Props) => {
  return (
    <li className="flex items-center gap-3">
      {session ? (
        <>
          <div className="flex gap-1 items-center justify-center">
            {session?.user?.image && (
              <Avatar>
                <AvatarImage src={session?.user?.image} />
                <AvatarFallback>W</AvatarFallback>
              </Avatar>
            )}
            <p className="">{session?.user?.name}</p>
          </div>
          <Button onClick={() => signOut()}>Log out</Button>
        </>
      ) : (
        <Button onClick={() => signIn()}>Sign In</Button>
      )}
    </li>
  );
};

export default SignInOutButtons;
