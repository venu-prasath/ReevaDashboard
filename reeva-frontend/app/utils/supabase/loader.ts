import { ImageLoaderProps } from "next/image";

export default function customImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const url = `https://jqfwswewpawokeegozjs.supabase.co/storage/v1/object/public/milestone_tasks/tasks/${src}?w=${width}&q=${
    quality || 75
  }`;
  return url;
}
