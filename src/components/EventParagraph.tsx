import React from "react";

type Props = {
  description: string;
  children: React.ReactNode;
};

const EventParagraph = ({ description, children }: Props) => {
  return (
    <p className="flex gap-1 items-center p-1 rounded-md transition-opacity border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground w-[250px] hover">
      {children}
      {description}
    </p>
  );
};

export default EventParagraph;
