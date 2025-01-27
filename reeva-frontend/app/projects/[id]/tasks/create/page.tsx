import React from "react";

import CreateTaskForm from "@/app/components/ui/tasks/CreateTaskForm";
import NavBar from "@/app/components/ui/NavBar";

type pageProps = {
  params: { id: string };
};

const page: React.FC<pageProps> = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center w-full h-full pt-8">
        <CreateTaskForm projectId={id} />
      </div>
    </>
  );
};
export default page;
