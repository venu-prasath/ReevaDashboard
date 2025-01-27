"use client";

import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/components/ui/fonts";
import { useTheme } from "@/app/contexts/ThemeContext";

export default function ReevaBoardLogo() {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        lusitana.className
      } flex flex-row items-center leading-none ${
        theme === "light" ? "text-black" : "text-white"
      }`}
    >
      <GlobeAltIcon className="h-8 w-8 rotate-[15deg]" />
      <p className="text-[18px]">ReevaBoard</p>
    </div>
  );
}
