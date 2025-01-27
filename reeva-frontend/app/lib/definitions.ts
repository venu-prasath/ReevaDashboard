export type user = {
  id: number;
  name: string;
  email: string;
  clerk_id: string;
};

export type projects = {
  id: number;
  title: string;
  description: string;
  status: "active" | "onhold" | "completed";
  deadline: string;
  createdAt: string;
  modifiedAt: string;
};

export type tasks = {
  id: number;
  project_id: number;
  title: string;
  description: string;
  status: "todo" | "inprogress" | "done";
  priority: "low" | "medium" | "high";
  assignee_id: number;
  due_date: string;
  assignee: number;
  project: number;
  image_urls: string[];
};

export type photos = {
  id: string;
  url: string;
  taskId: string;
  title: string;
  description: string;
};

export type editProjectForm = {
  id: string;
  title: string;
  description: string;
  status: "active" | "onhold" | "completed";
  deadline: string;
};

export type errors = {
  error: string;
};

export interface status {
  status: string;
}

export interface projectStatus {
  status: "active" | "onhold" | "completed";
}

export interface taskStatus {
  status: "todo" | "inprogress" | "done";
}
