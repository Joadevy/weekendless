"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/dashboard");
    },
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>hola, estas logeado XD</div>
    </>
  );
}
