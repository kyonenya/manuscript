import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export const Tags = (props: {
  tags: string[];
  searchedTag?: string;
  className?: string;
  isDemoMode?: boolean;
}) => {
  return (
    <div className={twMerge('flex flex-row space-x-2', props.className)}>
      {props.tags?.map((tag) => (
        <Link
          href={`/${props.isDemoMode ? 'demo' : ''}${
            props.searchedTag === tag ? '' : `?tag=${tag}`
          }`}
          key={tag}
          prefetch={!!props.isDemoMode}
        >
          <div
            className={twMerge(
              'rounded-md px-2 py-1 text-sm dark:font-medium',
              props.searchedTag !== tag &&
                'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
              props.searchedTag === tag &&
                'border border-gray-300 bg-yellow-100 text-gray-600 dark:bg-gray-500 dark:text-gray-300',
            )}
          >
            #{tag}
          </div>
        </Link>
      ))}
    </div>
  );
};
