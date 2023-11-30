import { ReactNode } from "react";

import { NextAuthProvider } from "../components/auth/SessionProvider";
import { Toaster } from "../components/ui/toaster";
import "../styles/globals.css";
import Navbar from "../components/auth/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Weekendless",
  description: "Make reservations for your favorite weekend activities!",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className="relative">
          <Navbar />

          {children}

          <Toaster />

          <Footer />
        </body>
      </html>
    </NextAuthProvider>
  );
}
