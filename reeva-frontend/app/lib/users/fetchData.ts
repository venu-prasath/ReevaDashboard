import { errors, user } from "@/app/lib/definitions";

export const registerUser = async (data: {
  name: string;
  email: string;
  clerk_id: string;
}) => {
  try {
    const response = await fetch("http://localhost:8000/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await JSON.parse(await response.text());

    return responseData;
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: error } as errors;
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await fetch("http://localhost:8000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await JSON.parse(await response.text());
    return responseData;
  } catch (error) {
    console.error("Error fetching all users:", error);
    return { error: error } as errors;
  }
};

export const fetchUserById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8000/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await JSON.parse(await response.text());
    return responseData as user;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return { error: error } as errors;
  }
};
