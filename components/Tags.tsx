import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export const Tags = (props: { tags: string[]; searchedTag?: string }) => {
  return (
    <div className="flex flex-row space-x-2">
      {props.tags?.map((tag) => (
        <Link href={`/?tag=${tag}`} key={tag}>
          <div
            className={twMerge(
              'rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-500 dark:bg-gray-700 dark:font-medium dark:text-gray-400',
              props.searchedTag === tag &&
                'border border-gray-300 bg-yellow-100 text-gray-600 dark:bg-gray-500 dark:text-gray-300'
            )}
          >
            #{tag}
          </div>
        </Link>
      ))}
    </div>
  );
};
