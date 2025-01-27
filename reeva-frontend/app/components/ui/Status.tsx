import { CheckIcon, ClockIcon, PlayIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function Status({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-800": status === "onhold",
          "bg-green-500 text-white":
            status === "active" || status === "completed",
          "bg-red-400 text-gray-800": status === "todo",
          "bg-yellow-400 text-white": status === "inprogress",
          "bg-green-400 text-white": status === "done",
        }
      )}
    >
      {status === "onhold" ? (
        <>
          On Hold
          <ClockIcon className="ml-1 w-4 text-gray-600" />
        </>
      ) : null}
      {status === "active" ? (
        <>
          Active
          <PlayIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === "completed" ? (
        <>
          Completed
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
      {status === "todo" ? (
        <>
          To Do
          <ClockIcon className="ml-1 w-4 text-gray-600" />
        </>
      ) : null}
      {status === "inprogress" ? (
        <>
          In Progress
          <PlayIcon className="ml-1 w-4 text-gray-800" />
        </>
      ) : null}
      {status === "done" ? (
        <>
          Done
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
