import Image from "next/image";

import icon from "../public/Warwick_W_logo (1).png";

const loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center animate-pulse">
      <div className="h-36 w-36 lg:h-44 lg:w-44 relative animate-bounce">
        <Image fill alt="" src={icon} />
      </div>
      <p className="text-xl lg:text-2xl font-semibold text-black italic -mt-5 lg:-mt-12">
        Loading...
      </p>
    </div>
  );
};

export default loading;
