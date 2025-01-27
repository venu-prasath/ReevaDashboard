"use client";

import React from "react";
import ReevaBoardLogo from "./ReevaBoardLogo";
import ThemeButton from "./ThemeButton";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const NavBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center border-b-[1px] border-gray-500 shadow-md">
      <Link href="/dashboard">
        <ReevaBoardLogo />
      </Link>
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
