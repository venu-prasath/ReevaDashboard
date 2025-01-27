import { tasks } from "@/app/lib/definitions";
import { cookies } from "next/headers";

export const fetchTotalTasks = async (query: string) => {
  //const response = await fetch(`/api/projects?query=${query}`);
  //const data = await response.json();
  //return data.total;
  return 0;
};

export const fetchTasks = async (
  query: string = "",
  currentPage: number = 1
) => {
  try {
    const cookieStore = await cookies();
    const myCookie = cookieStore.get("clerk_id");
    if (!myCookie) {
      return { error: "No clerk_id cookie found" };
    }
    const response = await fetch(
      `http://localhost:8000/tasks?query=${query}&page=${currentPage}`,
      {
        headers: {
          "x-clerk-id": myCookie.value.toString(),
        },
      }
    );
    if (!response.ok) {
      //console.error("Error fetching tasks:", response);
      return [] as tasks[];
    }
    const data = await JSON.parse(await response.text());
    return data as tasks[];
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [] as tasks[];
  }
};

export const fetchTasksById = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const myCookie = cookieStore.get("clerk_id");
    if (!myCookie) {
      return { error: "No clerk_id cookie found" };
    }
    const response = await fetch(`http://localhost:8000/tasks/${id}`, {
      headers: {
        "x-clerk-id": myCookie.value.toString(),
      },
    });
    if (!response.ok) {
      //console.error("Error fetching tasks:", response);
      return {} as tasks;
    }
    const data = await JSON.parse(await response.text());
    console.log("FetchTaskById: ", data);
    return data as tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return {} as tasks;
  }
};

export const createTask = async (data: tasks) => {
  try {
    const cookieStore = await cookies();
    const myCookie = cookieStore.get("clerk_id");
    if (!myCookie) {
      return { error: "No clerk_id cookie found" };
    }
    const response = await fetch("http://localhost:8000/tasks/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-clerk-id": myCookie.value.toString(),
      },
      body: JSON.stringify(data),
    });
    console.log(JSON.stringify(data));
    console.log(response);
    const responseData = await JSON.parse(await response.text());
    return responseData;
  } catch (error) {
    console.error("Error creating task:", error);
    return { error: error };
  }
};

export const updateTask = async (id: number, task: tasks) => {
  try {
    const cookieStore = await cookies();
    const myCookie = cookieStore.get("clerk_id");
    if (!myCookie) {
      return { error: "No clerk_id cookie found" };
    }
    const response = await fetch(`http://localhost:8000/tasks/${id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-clerk-id": myCookie.value.toString(),
      },
      body: JSON.stringify(task),
    });
    console.log("TaskToUpdate: ", task);
    if (!response.ok) {
      console.error("Error updating the task:", response);
      return {} as tasks;
    }
    const responseData = await JSON.parse(await response.text());
    return responseData;
  } catch (error) {
    console.error("Error updating task:", error);
    return {} as tasks;
  }
};

export const deleteTask = async (id: number) => {
  try {
    const cookieStore = await cookies();
    const myCookie = cookieStore.get("clerk_id");
    if (!myCookie) {
      return { error: "No clerk_id cookie found" };
    }
    const response = await fetch(`http://localhost:8000/tasks/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-clerk-id": myCookie.value.toString(),
      },
    });
    if (!response.ok) {
      console.error("Error deleting task. Wrong response:", response);
      return {} as tasks;
    }
    return;
  } catch (error) {
    console.error("Error deleting task:", error);
    return {} as tasks;
  }
};
