"use client";

import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MenuNavigationLinks from "../MenuNavigation";

type Props = {
  session: Session | null;
};

const SignInOutButtons = ({ session }: Props) => {
  return (
    <li className="flex items-center gap-3">
      {session ? (
        <>
          <MenuNavigationLinks
            links={[
              {
                href: "/reservations",
                text: "My reservations",
                image: (
                  <svg
                    height="1em"
                    viewBox="0 0 14 14"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m4.656 2.255l-.39.09a1.19 1.19 0 0 1-.91 1.43a1.22 1.22 0 0 1-1.44-.92l-.78.16a.81.81 0 0 0-.61 1s.36 1.67.78 3.55m10.85-5.32a1.32 1.32 0 1 1-2.44-1l-.81-.38a.89.89 0 0 0-1.16.47l-3.36 7.91l-.44 1a.89.89 0 0 0 .47 1.16l4.06 1.73a.89.89 0 0 0 1.16-.47l3.8-8.94a.89.89 0 0 0-.43-1.13l-.85-.35Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
              },
              {
                href: "/",
                text: "New events",
                image: (
                  <svg
                    height="1em"
                    viewBox="0 0 14 14"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m11.85 13.2l-6.68-2.49a1.25 1.25 0 0 1-.48-2.05l4.19-4.19a1.26 1.26 0 0 1 2.06.53l2.48 6.68a1.22 1.22 0 0 1-1.57 1.52v0Zm-9.8-6.07a2.06 2.06 0 0 1 1.46-.21m.82-2.64A2.1 2.1 0 0 1 4 2.83M6.63.72A4.72 4.72 0 0 0 6.76 4M1 3.78a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
              },
            ]}
          >
            <div className="flex gap-1 items-center justify-center">
              {session?.user?.image && (
                <Avatar>
                  <AvatarImage src={session?.user?.image} />
                  <AvatarFallback>W</AvatarFallback>
                </Avatar>
              )}
              <p className="">{session?.user?.name}</p>
            </div>
          </MenuNavigationLinks>
          <Button onClick={() => signOut()}>Log out</Button>
        </>
      ) : (
        <Button onClick={() => signIn()}>Sign In</Button>
      )}
    </li>
  );
};

export default SignInOutButtons;
