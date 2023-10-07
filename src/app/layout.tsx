import { Toaster } from "../components/ui/toaster";

import { NextAuthProvider } from "~/components/auth/SessionProvider";
import "~/styles/globals.css";

export const metadata = {
  title: "Weekendless",
  description: "Make reservations for your favorite weekend activities!",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className="">
          {children}

          <Toaster />
        </body>
      </html>
    </NextAuthProvider>
  );
}
