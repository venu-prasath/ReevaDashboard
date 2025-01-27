import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type CreateButtonProps = {
  ctaText: string;
  href: string;
};

export const CreateButton = ({ ctaText, href }: CreateButtonProps) => {
  return (
    <Link
      href={href}
      className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-colors 
      hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
    >
      <span className="hidden md:block">{ctaText}</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
};
