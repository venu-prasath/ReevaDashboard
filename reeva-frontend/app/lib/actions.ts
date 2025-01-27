"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createProject,
  deleteProject,
  updateProject,
} from "./project/fetchData";
import { projects, tasks } from "./definitions";
import { createTask, deleteTask, updateTask } from "./tasks/fetchData";

const ProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.enum(["active", "completed", "onhold"]),
  deadline: z.string(),
  createdAt: z.string(),
  modifiedAt: z.string(),
});

const CreateProject = ProjectSchema.omit({
  id: true,
  createdAt: true,
  modifiedAt: true,
});

const EditProject = ProjectSchema.omit({
  createdAt: true,
  modifiedAt: true,
});

const DeleteProject = z.object({
  project_id: z.number(),
});

export async function onCreateProject(formData: FormData) {
  const { title, description, status, deadline } = CreateProject.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    deadline: formData.get("deadline"),
  });

  const project = {
    title,
    description,
    status,
    deadline,
  } as projects;

  await createProject(project);
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function editProject(project_id: number, formData: FormData) {
  const { id, title, description, status, deadline } = EditProject.parse({
    id: project_id,
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    deadline: formData.get("deadline"),
  });

  const project = {
    id,
    title,
    description,
    status,
    deadline,
  } as projects;

  await updateProject(id, project);
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteProjectById(id: number) {
  const { project_id } = DeleteProject.parse({ project_id: id });
  await deleteProject(project_id);
  revalidatePath("/dashboard");
}

const TaskSchema = z.object({
  id: z.number(),
  project_id: z.number(),
  title: z.string(),
  description: z.string(),
  status: z.enum(["todo", "inprogress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  assignee_id: z.number(),
  due_date: z.string(),
  createdAt: z.string(),
  modifiedAt: z.string(),
});

const CreateTask = TaskSchema.omit({
  id: true,
  createdAt: true,
  modifiedAt: true,
});

const EditTask = TaskSchema.omit({
  createdAt: true,
  modifiedAt: true,
});

const DeleteTask = z.object({
  task_id: z.number(),
});

export async function onCreateTask(formData: FormData) {
  const {
    title,
    description,
    status,
    due_date,
    priority,
    assignee_id,
    project_id,
  } = CreateTask.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    due_date: formData.get("duedate"),
    priority: formData.get("priority"),
    assignee_id: Number(formData.get("assignee")),
    project_id: Number(formData.get("project_id")),
  });

  const task = {
    title,
    description,
    status,
    due_date,
    priority,
    assignee_id,
    project_id,
  } as tasks;
  await createTask(task);
  revalidatePath(`/projects/${project_id}/tasks`);
  redirect(`/projects/${project_id}/tasks`);
}

export async function editTask(formData: FormData) {
  const {
    id,
    title,
    description,
    status,
    due_date,
    priority,
    assignee_id,
    project_id,
  } = EditTask.parse({
    id: Number(formData.get("id")),
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    due_date: formData.get("duedate"),
    assignee_id: Number(formData.get("assignee")),
    priority: formData.get("priority"),
    project_id: Number(formData.get("project_id")),
  });

  const task = {
    id,
    title,
    description,
    status,
    due_date,
    priority,
    assignee_id,
    project_id,
  } as tasks;

  await updateTask(id, task);
  revalidatePath(`/projects/${project_id}/tasks`);
  redirect(`/projects/${project_id}/tasks`);
}

export async function deleteTaskById(id: number) {
  const { task_id } = DeleteTask.parse({ task_id: id });
  await deleteTask(task_id);
  revalidatePath(`/`);
}
