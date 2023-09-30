"use client";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="border p-2 shadow-md">
      <ul className="flex items-center justify-between">
        <li>Weekendless!</li>
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
      </ul>
    </nav>
  );
};

export default Navbar;
