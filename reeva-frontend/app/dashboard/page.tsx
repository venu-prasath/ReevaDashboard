import { Suspense } from "react";
import { CreateButton } from "@/app/components/ui/CreateButton";
import NavBar from "@/app/components/ui/NavBar";
import Pagination from "@/app/components/ui/Pagination";
import Search from "@/app/components/ui/Search";
import { registerUser } from "@/app/lib/users/fetchData";
import { fetchTotalProjects } from "@/app/lib/project/fetchData";
import ProjectTable from "@/app/components/ui/projects/Table";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard | Projects",
  description: "My Project",
};

type DashboardProps = {
  searchParams?: Promise<{ query?: string; page?: string }>;
};

export default async function Dashboard(props: DashboardProps) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  const client = await clerkClient();
  const user = await client?.users.getUser(userId);

  const userData = {
    name: user.username || user.firstName || "Anonymous",
    email: user.primaryEmailAddress?.emailAddress || "",
    clerk_id: user.id,
  };
  await registerUser(userData);

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  //const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchTotalProjects(query);
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
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
