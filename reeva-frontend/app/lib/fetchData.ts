import { deleteProjectById, deleteTaskById } from "./actions";

export const deleteEntityWithId = async (entity: string, id: number) => {
  if (entity === "projects") {
    await deleteProjectById(id);
  } else if (entity === "tasks") {
    await deleteTaskById(id);
  }
};
