export const Tags = (props: { tags: string[] }) => {
  return (
    <div className="flex flex-row space-x-2">
      {props.tags?.map((tag) => (
        <div
          className="rounded-md bg-gray-200 px-2 py-1 text-sm font-semibold text-gray-500 dark:bg-gray-700 dark:text-gray-400"
          key={tag}
        >
          #{tag}
        </div>
      ))}
    </div>
  );
};
