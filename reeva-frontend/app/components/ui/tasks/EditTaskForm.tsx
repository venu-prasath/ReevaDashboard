"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  DocumentTextIcon,
  CalendarIcon,
  PlayIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/components/ui/Button";
import { tasks, user } from "@/app/lib/definitions";
import { convertToDatetimeLocal } from "@/app/lib/utils";
import Photos from "./Photos";
import { editTask2 } from "@/app/lib/actions";

type EditFormProps = {
  users: user[];
  task: tasks;
};

export default function EditTaskForm({ users, task }: EditFormProps) {
  const [formData, setFormData] = useState({
    id: task.id,
    title: task.title,
    description: task.description,
    due_date: task.due_date,
    status: task.status,
    priority: task.priority,
    project_id: task.project,
    assignee_id: task.assignee,
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>(
    task.image_urls
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleFormSubmission(event) {
    editTask2(formData, uploadedImages);
  }

  return (
    <form action={(e) => handleFormSubmission(e)}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* Task Title */}
          <div className="mb-4">
            <label htmlFor="title" className="mb-2 block text-sm font-medium">
              Task Title
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="title"
                  name="title"
                  type="text"
                  onChange={handleChange}
                  defaultValue={task.title}
                  placeholder="Enter task title"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          {/* Task Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium"
            >
              Task Description
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="description"
                  name="description"
                  type="textarea"
                  onChange={handleChange}
                  defaultValue={task.description}
                  placeholder="Enter task description"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* Task Duedate */}
          <div className="mb-4">
            <label htmlFor="duedate" className="mb-2 block text-sm font-medium">
              Choose a due date
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="duedate"
                  name="duedate"
                  type="datetime-local"
                  step="0.01"
                  onChange={handleChange}
                  defaultValue={convertToDatetimeLocal(task.due_date)}
                  placeholder="Select a date"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>

          {/* Task Status */}
          <fieldset>
            <legend className="mb-2 block text-sm font-medium">
              Set the Task status
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="todo"
                    name="status"
                    type="radio"
                    value="todo"
                    onChange={handleChange}
                    defaultChecked={task.status === "todo"}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="todo"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                  >
                    Todo <ClockIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="inprogress"
                    name="status"
                    type="radio"
                    onChange={handleChange}
                    value="inprogress"
                    defaultChecked={task.status === "inprogress"}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="inprogress"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    In Progress <PlayIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="done"
                    name="status"
                    type="radio"
                    value="done"
                    onChange={handleChange}
                    defaultChecked={task.status === "done"}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="done"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Done <CheckIcon className="h-4 w-4" />
                  </label>
                </div>
              </div>
            </div>
          </fieldset>
          {/* Task priority */}
          <fieldset className="my-4">
            <legend className="mb-2 block text-sm font-medium">
              Set the task priorty
            </legend>
            <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    id="low"
                    name="priority"
                    type="radio"
                    value="low"
                    onChange={handleChange}
                    defaultChecked={task.priority === "low"}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="low"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Low <ClockIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="medium"
                    name="priority"
                    type="radio"
                    value="medium"
                    onChange={handleChange}
                    defaultChecked={task.priority === "medium"}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="medium"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    Medium <PlayIcon className="h-4 w-4" />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="high"
                    name="priority"
                    type="radio"
                    value="high"
                    onChange={handleChange}
                    defaultChecked={task.priority === "high"}
                    className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  />
                  <label
                    htmlFor="high"
                    className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    High <ExclamationCircleIcon className="h-4 w-4" />
                  </label>
                </div>
              </div>
            </div>
          </fieldset>

          {/* Task Assignee */}
          <div className="my-4">
            <label
              htmlFor="assignee"
              className="mb-2 block text-sm font-medium"
            >
              Choose assignee
            </label>
            <div className="relative">
              <select
                id="assignee"
                name="assignee"
                onChange={handleChange}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={
                  users !== undefined
                    ? users.find((user) => user.id === task.assignee)?.name
                    : ""
                }
              >
                <option value="" disabled>
                  Select a user
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
            <input type="hidden" name="id" value={task.id} />
            <input type="hidden" name="project_id" value={task.project} />
          </div>

          <div className="my-4">
            <Photos
              uploadedImages={uploadedImages}
              setUploadedImages={setUploadedImages}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={`/projects/${task.project}/tasks`}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Task</Button>
      </div>
    </form>
  );
}
