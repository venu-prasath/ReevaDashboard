import {
  ClockIcon,
  ExclamationCircleIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function Priority({ priority }: { priority: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-green-500 text-white": priority === "low",
          "bg-yellow-400 text-white": priority === "medium",
          "bg-red-400 text-white": priority === "high",
        }
      )}
    >
      {priority === "low" ? (
        <>
          Low
          <ClockIcon className="ml-1 w-4 text-gray-600" />
        </>
      ) : null}
      {priority === "medium" ? (
        <>
          Medium
          <PlayIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {priority === "high" ? (
        <>
          High
          <ExclamationCircleIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
