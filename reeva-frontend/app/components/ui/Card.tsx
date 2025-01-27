import React from "react";

type CardProps = {
  title: string;
  value: string | number;
};

const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4 text-foreground">
        <h3 className="ml-2 text-sm font-medium text-black">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-background px-4 py-8 text-center text-foreground text-2xl">
        {value}
      </p>
    </div>
  );
};
export default Card;
