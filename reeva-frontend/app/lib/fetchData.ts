import { deleteProjectById, deleteTaskById } from "./actions";

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
  console.log("fetchTotalTasks: ", projectId, query);
  return 0;
};
