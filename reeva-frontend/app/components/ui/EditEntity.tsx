import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function EditEntity({
  entity,
  id,
  project_id,
}: {
  entity: string;
  id: number;
  project_id?: number;
}) {
  return (
    <Link
      href={
        entity === "projects"
          ? `/${entity}/${id}/edit`
          : `/projects/${project_id}/${entity}/${id}/edit`
      }
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
