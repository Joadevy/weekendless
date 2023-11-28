import React from "react";

type Props = {
  description: string;
  children: React.ReactNode;
};

const EventParagraph = ({ description, children }: Props) => {
  return (
    <div className="flex gap-1 items-center p-1 transition-opacity border-b border-b-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground w-[250px] lg:w-[285px] hover">
      <div className="w-1/12 text-center flex items-center">{children}</div>
      {description}
    </div>
  );
};

export default EventParagraph;
