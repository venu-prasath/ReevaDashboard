import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  DocumentTextIcon,
  CalendarIcon,
  PlayIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/components/ui/Button";
import { onCreateTask } from "@/app/lib/actions";
import { user } from "@/app/lib/definitions";
import { fetchAllUsers } from "@/app/lib/users/fetchData";

type FormProps = {
  projectId: string;
};

export default async function Form({ projectId }: FormProps) {
  const users: user[] = await fetchAllUsers();

  return (
    <form action={onCreateTask}>
      <div className="rounded-md bg-background p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-4">Create a new Task</h1>
        <div className="rounded-md bg-background text-foreground p-4 md:p-6">
          <input type="hidden" name="project_id" value={projectId} />
          {/* Project Title */}
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Task Title
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter task title"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-foreground text-foreground bg-background"
                />
                <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-foreground peer-focus:text-foreground" />
              </div>
            </div>
          </div>
          {/* Project Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Task Description
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Enter task description"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-foreground text-foreground bg-background"
                />
                <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-foreground peer-focus:text-foreground" />
              </div>
            </div>
          </div>

          {/* Task Due date */}
          <div className="mb-4">
            <label htmlFor="duedate" className="mb-2 block text-sm font-medium">
              Choose a due date
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="duedate"
                  name="duedate"
                  type="date"
                  step="0.01"
                  placeholder="Select a date"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-foreground text-foreground bg-background"
                />
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-foreground peer-focus:text-foreground" />
              </div>
            </div>
          </div>

          {/* Task Status */}
          <fieldset className="my-4">
            <legend className="mb-2 block text-sm font-medium">
              Set the task status
            </legend>
            <div className="rounded-md border border-gray-200 bg-background px-[14px] py-3">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="todo"
                    name="status"
                    type="radio"
                    value="todo"
                    defaultChecked={true}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="todo"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    Todo <ClockIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="inprogress"
                    name="status"
                    type="radio"
                    value="inprogress"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="inprogress"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    In Progress <PlayIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="done"
                    name="status"
                    type="radio"
                    value="done"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="done"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Done <CheckIcon className="h-4 w-4" />
                  </label>
                </div>
              </div>
            </div>
          </fieldset>

          {/* Task priority */}
          <fieldset className="my-4">
            <legend className="mb-2 block text-sm font-medium">
              Set the task priorty
            </legend>
            <div className="rounded-md border border-gray-200 bg-background px-[14px] py-3">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="low"
                    name="priority"
                    type="radio"
                    value="low"
                    defaultChecked={true}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="low"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Low <ClockIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="medium"
                    name="priority"
                    type="radio"
                    value="medium"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="medium"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Medium <PlayIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="high"
                    name="priority"
                    type="radio"
                    value="high"
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="high"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    High <ExclamationCircleIcon className="h-4 w-4" />
                  </label>
                </div>
              </div>
            </div>
          </fieldset>

          {/* Task Assignee */}
          <div className="my-4">
            <label
              htmlFor="customer"
              className="mb-2 block text-sm font-medium"
            >
              Choose assignee
            </label>
            <div className="relative">
              <select
                id="assignee"
                name="assignee"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-foreground text-foreground bg-background"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a user
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-foreground" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/projects/${projectId}/tasks`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Task</Button>
      </div>
    </form>
  );
}
