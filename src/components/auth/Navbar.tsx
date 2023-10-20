import Link from "next/link";
import { getServerSession } from "next-auth";
import Image from "next/image";

import Wimage from "../../public/Warwick_W_logo (1).png";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";

import SignInOutButtons from "./SIgnInOutButtons";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="border p-2 shadow-sm">
      <ul className="flex items-center justify-between">
        <li className="relative h-8 w-8 hover:opacity-50 transition-opacity">
          <Link className="font-semibold" href={"/"}>
            <Image fill alt="" src={Wimage} />
          </Link>
        </li>

        <SignInOutButtons session={session} />
      </ul>
    </nav>
  );
};

export default Navbar;
