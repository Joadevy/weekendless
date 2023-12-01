import { ReactNode } from "react";

interface Iprops {
  children?: ReactNode;
  name: string;
  details: string;
}

function Information({ children, name, details }: Iprops) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-5 w-5/12 lg:w-1/3 relative">
        <div className="absolute left-1">{children}</div>
        <p className="ml-7">{name}</p>
      </div>
      <p className="text-right font-semibold">{details}</p>
    </div>
  );
}

export default Information;
