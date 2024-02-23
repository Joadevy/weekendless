"use client"; // Error components must be Client Components

import { useEffect } from "react";

import { buttonVariants } from "../components/ui/button";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full w-full flex-col  justify-center items-center pt-16">
      <div className=" border-black w-3/4 lg:w-5/12 text-balance space-y-2">
        <h2 className="text-2xl lg:Text-3xl font-extrabold">
          Houston... you already know what we have
        </h2>
        <p className=" text-md font-semibold">
          Im really sorry but we&apos;ve a problem. It&apos;s probably related
          to the database because this app is using a free plan and the database
          is paused after certain time.
        </p>

        <div>
          <div className="bg-black text-slate-100 p-2 flex flex-col gap-2 border-slate-600 rounded-md">
            <h3 className="b">
              I would be very grateful if you could report this error to me via
              message at:
            </h3>
            <div className="flex gap-4 items-center justify-center">
              <a
                className={buttonVariants({ variant: "secondary" }) + "  w-fit"}
                href="https://twitter.com/JoaquinArlettaz"
              >
                X (Twitter)
              </a>

              <a
                className={buttonVariants({ variant: "secondary" }) + "  w-fit"}
                href="https://www.linkedin.com/in/joaqu%C3%ADn-arlettaz/"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
