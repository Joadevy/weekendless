import Link from "next/link";
import { getServerSession } from "next-auth";
import Image from "next/image";

import Wimage from "../../public/Warwick_W_logo (1).png";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";

import SignInOutButtons from "./SIgnInOutButtons";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="border p-2 shadow-sm absolute top-0 w-full h-14 z-50">
      <ul className="flex items-center justify-between">
        <Link href={"/"}>
          <li className="h-8 w-8 relative hover:opacity-50 transition-opacity">
            <Image fill alt="" sizes="5vw" src={Wimage} />
          </li>
        </Link>

        <SignInOutButtons session={session} />
      </ul>
    </nav>
  );
};

export default Navbar;
