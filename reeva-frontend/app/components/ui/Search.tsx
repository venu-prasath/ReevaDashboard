"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/app/contexts/ThemeContext";
import { debounce, cn } from "@/app/lib/utils";

export default function Search({ placeholder }: { placeholder: string }) {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = debounce((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term as string);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div
      className={cn(
        "relative flex flex-1 flex-shrink-0 my-4",
        theme === "dark" ? "text-white bg-black" : "text-black bg-white"
      )}
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className={cn(
          "peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 ",
          theme === "dark"
            ? "bg-black text-white placeholder:text-white"
            : "bg-white text-black placeholder:text-gray-500"
        )}
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon
        className={cn(
          "absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2",
          theme === "dark"
            ? "text-white peer-focus:text-white"
            : "text-black peer-focus:text-gray-900"
        )}
      />
    </div>
  );
}
