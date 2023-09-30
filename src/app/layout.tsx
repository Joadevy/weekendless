import Navbar from "~/components/auth/Navbar";
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
          <Navbar />
          {children}
        </body>
      </html>
    </NextAuthProvider>
  );
}
