import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  DocumentTextIcon,
  CalendarIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/components/ui/Button";
import { editProject } from "@/app/lib/actions";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type EditFormProps = {
  project_id: number;
  title: string;
  description: string;
  status: string;
  deadline: string;
};

export default async function Form({
  project_id,
  title,
  description,
  status,
  deadline,
}: EditFormProps) {
  const updateProjectById = editProject.bind(null, project_id);

  const { userId } = await auth();
  if (!userId) {
    redirect("/dashboard");
  }
  const client = await clerkClient();
  const { id } = await client?.users.getUser(userId);

  async function handleSubmit(formData: FormData) {
    "use server";
    formData.append("clerk_id", id);
    await updateProjectById(formData);
  }

  return (
    <form action={handleSubmit}>
      <div className="rounded-md bg-background p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-4">Edit project</h1>
        <div className="rounded-md bg-background p-4 md:p-6">
          {/* Project Title */}
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Project Title
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="title"
                  name="title"
                  type="text"
                  defaultValue={title}
                  placeholder="Enter project title"
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
              Project Description
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="description"
                  name="description"
                  type="textarea"
                  defaultValue={description}
                  placeholder="Enter project description"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-foreground text-foreground bg-background"
                />
                <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-foreground peer-focus:text-foreground" />
              </div>
            </div>
          </div>

          {/* Project Deadline */}
          <div className="mb-4">
            <label
              htmlFor="deadline"
              className="mb-2 block text-sm font-medium"
            >
              Choose a deadline
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="deadline"
                  name="deadline"
                  type="date"
                  defaultValue={deadline}
                  placeholder="Select a date"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-foreground text-foreground bg-background"
                />
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-foreground peer-focus:text-foreground" />
              </div>
            </div>
          </div>

          {/* Project Status */}
          <fieldset>
            <legend className="mb-2 block text-sm font-medium">
              Set the project status
            </legend>
            <div className="rounded-md border border-gray-200 bg-background px-[14px] py-3">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="onhold"
                    name="status"
                    type="radio"
                    value="onhold"
                    defaultChecked={status === "onhold"}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="onhold"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    On Hold <ClockIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="active"
                    name="status"
                    type="radio"
                    value="active"
                    defaultChecked={status === "active"}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="active"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Active <PlayIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="completed"
                    name="status"
                    type="radio"
                    value="completed"
                    defaultChecked={status === "completed"}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="completed"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Completed <CheckIcon className="h-4 w-4" />
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Project</Button>
      </div>
    </form>
  );
}
