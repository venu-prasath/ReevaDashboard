import React from "react";
import ReevaBoardLogo from "./ReevaBoard";
import ThemeButton from "./ThemeButton";
import { SignedIn, UserButton } from "@clerk/nextjs";

const NavBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center border-b-[1px] border-gray-500 shadow-md">
      <ReevaBoardLogo />
      <div className="space-x-2 p-1">
        <ThemeButton />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
export default NavBar;
