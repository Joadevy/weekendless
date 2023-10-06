"use client";
import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

const Login = () => {
  return (
    <div className="border p-2 shadow-md">
      <div className="flex items-center gap-2">
        <Button
          onClick={async () => await signIn("google", { redirect: true })}
        >
          Sign In With Google
        </Button>
        <p className="bg-gray-400 italic">
          Only email, name and avatar will be given to us.
        </p>
      </div>
    </div>
  );
};

export default Login;
