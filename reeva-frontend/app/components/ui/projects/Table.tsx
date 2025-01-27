import { fetchProjects } from "@/app/lib/project/fetchData";
import { formatDateToLocal } from "@/app/lib/utils";
import React from "react";
import Status from "@/app/components/ui/Status";
import { EditEntity } from "../EditEntity";
import { DeleteEntity } from "../DeleteEntity";
import Link from "next/link";

type TableProps = {
  query: string;
  currentPage: number;
};

const ProjectTable: React.FC<TableProps> = async ({ query, currentPage }) => {
  const projects = await fetchProjects(query, currentPage);

  if ("error" in projects) {
    return <div>Error: {projects.error}</div>;
  }
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {projects.map((project) => (
              <div
                key={project.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Link
                        href={`/projects/${project.id}/tasks`}
                        className="text-blue-500 hover:underline"
                      >
                        {project.title}
                      </Link>
                    </div>
                    <p className="text-sm text-gray-500 pr-16 overflow-clip">
                      {project.description}
                    </p>
                  </div>
                  <Status status={project.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4 text-sm">
                  <div>
                    <p>Deadline</p>
                    <p>{project.deadline}</p>
                  </div>
                  <div>
                    <p>Created At</p>
                    <p>{project.createdAt}</p>
                  </div>
                  <div>
                    <p>Modified At</p>
                    <p>{project.modifiedAt}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <EditEntity entity="projects" id={project.id} />
                    <DeleteEntity entity="projects" id={project.id} />
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
                  Deadline
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  CreatedAt
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Modified
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none 
                  [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg 
                  [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    <Link
                      href={`/projects/${project.id}/tasks`}
                      className="text-blue-500 hover:underline"
                    >
                      {project.title}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 max-w-20 overflow-hidden">
                    {project.description}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Status status={project.status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(project.deadline)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(project.createdAt)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(project.modifiedAt)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <EditEntity entity="projects" id={project.id} />
                      <DeleteEntity entity="projects" id={project.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ProjectTable;
