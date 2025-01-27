import { cookies } from "next/headers";

export async function getServerTheme() {
  const cookieStore = await cookies();
  const theme =
    (cookieStore.get("theme")?.value as "light" | "dark") || "light";
  return theme;
}
