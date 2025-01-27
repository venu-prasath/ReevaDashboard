import EditProjectForm from "@/app/components/ui/projects/EditProjectForm";
import { projects, errors } from "@/app/lib/definitions";
import { fetchProjectById } from "@/app/lib/project/fetchData";
import { convertToDatetimeLocal } from "@/app/lib/utils";
import React from "react";

type pageProps = {
  params: Promise<{
    id: string;
  }>;
};

const page: React.FC<pageProps> = async ({ params }) => {
  const { id } = await params;
  const project: projects | errors = await fetchProjectById(id);
  if ("error" in project) {
    return <div>Error: {(project as errors).error}</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center w-full h-full pt-8">
      <EditProjectForm
        project_id={project.id}
        title={project.title}
        description={project.description}
        deadline={convertToDatetimeLocal(project.deadline)}
        status={project.status}
      />
    </div>
  );
};
export default page;
