import Image from "next/image";
import Link from "next/link";

import Wimage from "../public/Warwick_W_logo (1).png";

const Footer = () => {
  return (
    <footer className="p-2 grid grid-cols-2 lg:grid-cols-3 place-content-center grid-flow-dense h-20 bg-primary">
      <div className="flex items-center">
        <Link className="h-10 w-10 relative hover:opacity-90" href={"/"}>
          <Image fill alt="" sizes="5vw" src={Wimage} />
        </Link>
      </div>

      <ul className="flex flex-col gap-2">
        <li className="text-slate-600 text-center flex items-center w-fit gap-1">
          <svg
            height="1.4em"
            viewBox="0 0 24 24"
            width="1.4em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.856 6.84a.75.75 0 0 0-1.106.66V17a.75.75 0 0 0 1.5 0V8.756l5.394 2.904c.222.12.49.12.712 0l5.394-2.904V17a.75.75 0 0 0 1.5 0V7.5a.75.75 0 0 0-1.106-.66L12 10.148L5.856 6.84Z"
              fill="currentColor"
            />
            <path
              clipRule="evenodd"
              d="M17.31 3.722a59.632 59.632 0 0 0-10.62 0l-1.518.135a3.53 3.53 0 0 0-3.179 3.006a35.508 35.508 0 0 0 0 10.274a3.53 3.53 0 0 0 3.18 3.005l1.516.136c3.534.316 7.088.316 10.622 0l1.517-.136a3.53 3.53 0 0 0 3.179-3.005a35.508 35.508 0 0 0 0-10.274a3.53 3.53 0 0 0-3.18-3.006l-1.516-.135ZM6.824 5.216a58.133 58.133 0 0 1 10.354 0l1.517.136a2.03 2.03 0 0 1 1.829 1.728a34.005 34.005 0 0 1 0 9.84a2.03 2.03 0 0 1-1.829 1.728l-1.517.136c-3.444.308-6.91.308-10.354 0l-1.517-.136a2.03 2.03 0 0 1-1.829-1.728a34.008 34.008 0 0 1 0-9.84a2.03 2.03 0 0 1 1.829-1.728l1.517-.136Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
          <Link href="mailto:reservationsweekendless@gmail.com">Email us</Link>
        </li>
        <li className="text-slate-600 text-center flex items-center w-fit gap-1">
          <svg
            height="1.4em"
            viewBox="0 0 256 256"
            width="1.4em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M128 84a44 44 0 1 0 44 44a44.05 44.05 0 0 0-44-44Zm0 80a36 36 0 1 1 36-36a36 36 0 0 1-36 36Zm48-136H80a52.06 52.06 0 0 0-52 52v96a52.06 52.06 0 0 0 52 52h96a52.06 52.06 0 0 0 52-52V80a52.06 52.06 0 0 0-52-52Zm44 148a44.05 44.05 0 0 1-44 44H80a44.05 44.05 0 0 1-44-44V80a44.05 44.05 0 0 1 44-44h96a44.05 44.05 0 0 1 44 44ZM188 76a8 8 0 1 1-8-8a8 8 0 0 1 8 8Z"
              fill="currentColor"
            />
          </svg>
          <a href={"https://www.instagram.com/"}>Instagram</a>
        </li>
      </ul>

      <div className="hidden lg:block">
        <p className=" text-slate-600 italic text-center">
          the only thing left is to enjoy!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
