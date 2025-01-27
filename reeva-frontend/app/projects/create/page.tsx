import React from "react";

import CreateProjectForm from "@/app/components/ui/projects/CreateProjectForm";
import NavBar from "@/app/components/ui/NavBar";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center w-full h-full pt-8 bg-background text-foreground">
        <CreateProjectForm />
      </div>
    </>
  );
};
export default page;
