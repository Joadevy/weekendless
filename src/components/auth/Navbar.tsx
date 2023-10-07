import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "../../app/api/auth/[...nextauth]/route";

import SignInOutButtons from "./SIgnInOutButtons";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="border p-2 shadow-md">
      <ul className="flex items-center justify-between">
        <li>
          <Link href={"/"}>Weekendless!</Link>
        </li>

        <SignInOutButtons session={session} />
      </ul>
    </nav>
  );
};

export default Navbar;
