"use client";

import React from "react";
import { useTheme } from "@/app/contexts/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const ThemeButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-1 rounded-md border-2 border-gray-500"
    >
      {theme === "light" ? (
        <MoonIcon className="h-6 w-6 bg-black text-white dark:bg-white dark:text-black" />
      ) : (
        <SunIcon className="h-6 w-6 bg-white text-black dark:bg-black dark:text-white" />
      )}
    </button>
  );
};
export default ThemeButton;
