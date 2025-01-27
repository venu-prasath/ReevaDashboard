import { fetchTasks } from "@/app/lib/tasks/fetchData";
import { formatDateToLocal } from "@/app/lib/utils";
import React from "react";
import Status from "@/app/components/ui/Status";
import { EditEntity } from "../EditEntity";
import { DeleteEntity } from "../DeleteEntity";
import Link from "next/link";
import Priority from "./Priority";

type TableProps = {
  query: string;
  currentPage: number;
};

const TasksTable: React.FC<TableProps> = async ({ query, currentPage }) => {
  const tasks = await fetchTasks(query, currentPage);

  if ("error" in tasks) {
    return <div>Error: {tasks.error}</div>;
  }
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Link
                        href={`/projects/${task.id}/tasks`}
                        className="text-blue-500 hover:underline"
                      > */}
                      {task.title}
                      {/* </Link> */}
                    </div>
                    <p className="text-sm text-gray-500 pr-16 overflow-clip">
                      {task.description}
                    </p>
                  </div>
                  <Status status={task.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4 text-sm">
                  <div>
                    <p>Due Date</p>
                    <p>{task.dueDate}</p>
                  </div>
                  <div>
                    <p>Assignee</p>
                    <p>{task.assignee}</p>
                  </div>
                  <div>
                    <p>Project Id</p>
                    <p>{task.projectId}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <EditEntity entity="tasks" id={task.id} />
                    <DeleteEntity entity="tasks" id={task.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Due Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Priority
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Assignee Id
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tasks.map(
                (task) => (
                  console.log("Task Table", task),
                  (
                    <tr
                      key={task.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none 
                  [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg 
                  [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap px-3 py-3">
                        <Link
                          href={`/tasks/${task.id}/details`}
                          className="text-blue-500 hover:underline"
                        >
                          {task.title}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 max-w-20 overflow-hidden">
                        {task.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <Status status={task.status} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {formatDateToLocal(task.due_date)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        <Priority priority={task.priority} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {task.assignee}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <EditEntity
                            entity="tasks"
                            id={task.id}
                            project_id={task.project}
                          />
                          <DeleteEntity entity="tasks" id={task.id} />
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default TasksTable;
