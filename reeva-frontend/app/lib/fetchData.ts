import { tasks } from "@/app/lib/definitions";
import { deleteProjectById, deleteTaskById } from "./actions";

export const fetchTasks = async (
  projectId: string,
  query?: string,
  currentPage: number
) => {
  //const response = await fetch(`/api/projects/${projectId}/tasks`);
  //const data = await response.json();
  //return data.tasks;
  return [
    {
      id: "1",
      projectId: "1",
      title: "Task 1",
      description: "This is a task description",
      status: "todo",
      priority: "low",
      assignee: "John Doe",
      dueDate: "2021-01-01",
    },
    {
      id: "2",
      projectId: "1",
      title: "Task 2",
      description: "This is a task description",
      status: "inprogress",
      priority: "medium",
      assignee: "Jane Doe",
      dueDate: "2021-01-02",
    },
    {
      id: "3",
      projectId: "1",
      title: "Task 3",
      description: "This is a task description",
      status: "done",
      priority: "high",
      assignee: "John Doe",
      dueDate: "2021-01-03",
    },
  ] as tasks[];
};

export const deleteEntityWithId = async (entity: string, id: number) => {
  if (entity === "projects") {
    await deleteProjectById(id);
  } else if (entity === "tasks") {
    await deleteTaskById(id);
  }
};

export const fetchTotalTasks = async (projectId: string, query: string) => {
  //const response = await fetch(`/api/projects/${projectId}/tasks?query=${query}`);
  //const data = await response.json();
  //return data.total;
  return 0;
};
