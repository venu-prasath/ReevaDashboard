import { projects } from "@/app/lib/definitions";
import { cookies } from "next/headers";

export const createProject = async (data: projects) => {
  try {
    const cookieStore = await cookies();
    const myCookie = cookieStore.get("clerk_id");
    if (!myCookie) {
      return { error: "No clerk_id cookie found" };
    }
    const response = await fetch("http://localhost:8000/projects/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-clerk-id": myCookie.value.toString(),
      },
      body: JSON.stringify(data),
    });
    const responseData = await JSON.parse(await response.text());
    return responseData;
  } catch (error) {
    console.error("Error creating project:", error);
    return { error: error };
  }
};

export const fetchTotalProjects = async (query: string) => {
  //const response = await fetch(`/api/projects?query=${query}`);
  //const data = await response.json();
  //return data.total;
  return 0;
};

export const fetchProjects = async (
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
      `http://localhost:8000/projects?query=${query}&page=${currentPage}`,
      {
        headers: {
          "x-clerk-id": myCookie.value.toString(),
        },
      }
    );
    if (!response.ok) {
      //console.error("Error fetching projects:", response);
      return [] as projects[];
    }
    const data = await JSON.parse(await response.text());
    return data as projects[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [] as projects[];
  }
};

export const fetchProjectById = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const myCookie = cookieStore.get("clerk_id");
    if (!myCookie) {
      return { error: "No clerk_id cookie found" };
    }
    const response = await fetch(`http://localhost:8000/projects/${id}`, {
      headers: {
        "x-clerk-id": myCookie.value.toString(),
      },
    });
    if (!response.ok) {
      //console.error("Error fetching projects:", response);
      return {} as projects;
    }
    const data = await JSON.parse(await response.text());
    return data as projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {} as projects;
  }
};

export const updateProject = async (id: number, project: projects) => {
  try {
    const cookieStore = await cookies();
    const myCookie = cookieStore.get("clerk_id");
    if (!myCookie) {
      return { error: "No clerk_id cookie found" };
    }
    const response = await fetch(
      `http://localhost:8000/projects/${id}/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-clerk-id": myCookie.value.toString(),
        },
        body: JSON.stringify(project),
      }
    );
    if (!response.ok) {
      console.error("Error fetching projects:", response);
      return {} as projects;
    }
    const responseData = await JSON.parse(await response.text());
    return responseData;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {} as projects;
  }
};

export const deleteProject = async (id: number) => {
  try {
    const cookieStore = await cookies();
    const myCookie = cookieStore.get("clerk_id");
    if (!myCookie) {
      return { error: "No clerk_id cookie found" };
    }
    const response = await fetch(
      `http://localhost:8000/projects/${id}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-clerk-id": myCookie.value.toString(),
        },
      }
    );
    if (!response.ok) {
      console.error("Error deleting project:", response);
      return {} as projects;
    }
    const responseData = await JSON.parse(await response.text());
    return responseData;
  } catch (error) {
    console.error("Error deleting project:", error);
    return {} as projects;
  }
};
