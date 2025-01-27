import { Suspense } from "react";
import { CreateButton } from "@/app/components/ui/CreateButton";
import NavBar from "@/app/components/ui/NavBar";
import Pagination from "@/app/components/ui/Pagination";
import Search from "@/app/components/ui/Search";
import ProjectTable from "@/app/components/ui/projects/Table";

export const metadata = {
  title: "Dashboard | Projects",
  description: "My Project",
};

export default async function ProjectDashboard() {
  return (
    <div>
      <NavBar />
      <div className="p-4">
        <h1 className="text-2xl font-bold">Welcome to your dashboard!</h1>
        <br />
        <br />
        <h1 className="text-xl font-bold">Projects</h1>
        <div className="flex justify-start items-center w-2/3 space-x-4">
          <Search placeholder="Search projects..." />
          <CreateButton ctaText="Create Project" href="/projects/create" />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectTable query="" currentPage={1} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={0} />
        </div>
      </div>
    </div>
  );
}
