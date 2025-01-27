import NavBar from "@/app/components/ui/NavBar";
import { fetchAllUsers, registerUser } from "@/app/lib/users/fetchData";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ProjectCard from "../components/ui/projects/ProjectCard";
import { fetchAllProjects } from "../lib/project/fetchData";
import { fetchAllTasks } from "../lib/tasks/fetchData";
import EntityTimeline from "../components/ui/EntityTimeline";
import BarChart from "../components/ui/BarCharts";
import { tasks } from "../lib/definitions";
import Card from "../components/ui/Card";

export const metadata = {
  title: "Dashboard",
  description: "My Project",
};

export default async function Dashboard() {
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

  const [allProjects, allTasks, allUsers] = await Promise.all([
    fetchAllProjects(),
    fetchAllTasks(),
    fetchAllUsers(),
  ]);

  if ("error" in allProjects) {
    console.error("Error fetching projects: ", allProjects.error);
    return (
      <div className="bg-background text-foreground w-screen">
        <NavBar />
        <div className="p-4 w-screen">
          <h1 className="text-2xl font-bold">Error loading projects</h1>
        </div>
      </div>
    );
  }

  function countTasksPerProject(allTasks: tasks): Record<number, number> {
    const taskCountMap: Record<number, number> = {};
    for (const task of allTasks) {
      if (task.project in taskCountMap) {
        taskCountMap[task.project] += 1;
      } else {
        taskCountMap[task.project] = 1;
      }
    }
    return taskCountMap;
  }

  const projectIdToNameMap: Record<number, string> = {};
  function getProjectNamesByIds(projectIds: number[]): string[] {
    if (!Array.isArray(allProjects)) return [];
    const projectNames = projectIds.map((id) => {
      const project = allProjects.find((p) => p.id === id);
      if (project) {
        projectIdToNameMap[id] = project.title;
        return project.title;
      }
      return "Unknown Project";
    });
    return projectNames;
  }

  const taskCountsPerProject = countTasksPerProject(allTasks);
  const projectIds = Object.keys(taskCountsPerProject).map(Number);
  const projectNames = getProjectNamesByIds(projectIds);
  const taskCounts = Object.values(taskCountsPerProject);

  return (
    <div className="flex flex-col bg-background text-foreground">
      <NavBar />
      <div className="p-4 w-screen">
        <h1 className="text-2xl font-bold">Welcome to your dashboard!</h1>
        <br />
        <br />
        <div className="flex justify-center min-w-full px-4">
          <ProjectCard ctaText="My Projects" href="/projects" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-row gap-4 justify-center p-8 bg-background text-foreground">
            <Card title="Total Projects" value={allProjects.length} />
            <Card title="Total Tasks" value={allTasks.length} />
            <Card title="Total Users" value={allUsers.length} />
          </div>
          <EntityTimeline
            allEntities={allProjects}
            title={"Project Creation Timeline"}
          />
          <BarChart labels={projectNames} dataValues={taskCounts} />
        </div>
      </div>
    </div>
  );
}
