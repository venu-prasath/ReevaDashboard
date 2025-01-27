import React from "react";

import CreateProjectForm from "@/app/components/ui/projects/CreateProjectForm";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full pt-8">
      <CreateProjectForm />
    </div>
  );
};
export default page;
