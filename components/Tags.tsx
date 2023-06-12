export const Tags = (props: { tags: string[] }) => {
  return (
    <div className="flex flex-row space-x-2">
      {props.tags?.map((tag) => (
        <div
          className="px-2 py-1 text-sm font-medium bg-gray-600 text-gray-600 dark:bg-gray-600 dark:text-gray-300  bg-opacity-10 rounded-md"
          key={tag}
        >
          #{tag}
        </div>
      ))}
    </div>
  );
};
