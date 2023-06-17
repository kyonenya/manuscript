export const Tags = (props: { tags: string[] }) => {
  return (
    <div className="flex flex-row space-x-2">
      {props.tags?.map((tag) => (
        <div
          className="rounded-md bg-gray-600 bg-opacity-10 px-2 py-1 text-sm font-medium text-gray-600  dark:bg-gray-600 dark:text-gray-300"
          key={tag}
        >
          #{tag}
        </div>
      ))}
    </div>
  );
};
