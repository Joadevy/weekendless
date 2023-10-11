"use client";
import { signIn } from "next-auth/react";

import { Button } from "../ui/button";

const Login = () => {
  return (
    <div className="border p-3 shadow-lg border-gray-400 rounded-md">
      <header className="mb-2 text-center">
        <h1 className="text-2xl font-bold">Weekendless</h1>
        <p>Sign In to reserve tickets for your favourite events!</p>
      </header>

      <div className="flex flex-col items-center gap-2">
        <Button
          onClick={async () =>
            await signIn("google", {
              redirect: true,
            })
          }
        >
          Sign In with Google
        </Button>
        <p className="text-gray-400 italic">
          Only email, name and avatar will be given to us.
        </p>
      </div>
    </div>
  );
};

export default Login;
