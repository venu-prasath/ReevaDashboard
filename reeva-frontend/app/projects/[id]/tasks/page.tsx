import { Suspense } from "react";
import { CreateButton } from "@/app/components/ui/CreateButton";
import NavBar from "@/app/components/ui/NavBar";
import Pagination from "@/app/components/ui/Pagination";
import Search from "@/app/components/ui/Search";
import TasksTable from "@/app/components/ui/tasks/Table";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Projects | Tasks",
  description: "My Project Dashboard",
};

type TaskDashboardProps = {
  searchParams?: Promise<{ query?: string; page?: string }>;
  params: Promise<{ id: string }>;
};

export default async function TaskDashboard(props: TaskDashboardProps) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }
  const params = await props.params;
  const projectId = await params.id;

  return (
    <div>
      <NavBar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Tasks dashboard!</h1>
        <br />
        <br />
        <h1 className="text-xl font-bold">Tasks</h1>
        <div className="flex justify-start items-center w-2/3 space-x-4">
          <Search placeholder="Search tasks..." />
          <CreateButton
            ctaText="Create Task"
            href={`/projects/${projectId}/tasks/create`}
          />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <TasksTable projectId={projectId} query="" currentPage={1} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={0} />
        </div>
      </div>
    </div>
  );
}
