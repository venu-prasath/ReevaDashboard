import { deleteEntityWithId } from "@/app/lib/fetchData";
import { TrashIcon } from "@heroicons/react/24/outline";

export async function DeleteEntity({
  entity,
  id,
}: {
  entity: string;
  id: number;
}) {
  async function handleSubmit() {
    "use server";
    await deleteEntityWithId(entity, id);
  }

  return (
    <form action={handleSubmit}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
