import { errors } from "@/app/lib/definitions";
import EditTaskForm from "@/app/components/ui/tasks/EditTaskForm";
import React from "react";
import { fetchAllUsers } from "@/app/lib/users/fetchData";
import { fetchTasksById } from "@/app/lib/tasks/fetchData";
import NavBar from "@/app/components/ui/NavBar";

type pageProps = {
  params: {
    id: string;
    task_id: string;
  };
};

const page: React.FC<pageProps> = async ({ params }) => {
  const { id, task_id } = await params;
  console.log("Edit Task Page", id, task_id);
  const [task, users] = await Promise.all([
    fetchTasksById(task_id),
    fetchAllUsers(),
  ]);

  if ("error" in task) {
    return <div>Error: {(task as errors).error}</div>;
  }

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center w-full h-full pt-8">
        <EditTaskForm users={users} task={task} />
      </div>
    </>
  );
};
export default page;
