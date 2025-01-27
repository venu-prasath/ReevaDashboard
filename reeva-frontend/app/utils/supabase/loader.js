export default function customImageLoader({ src, width, quality }) {
  const url = `https://jqfwswewpawokeegozjs.supabase.co/storage/v1/object/public/milestone_tasks/tasks/${src}?w=${width}&q=${
    quality || 75
  }`;
  console.log(`Loading image from URL: ${url}`);
  return url;
}
