import { StarIcon } from '@heroicons/react/24/solid';
import { Entry } from '../../domain/Entry';
import { formatTZ } from '../../domain/dateUtils';
import { MarkdownText } from '../_components/MarkdownText';

export const Preview = (props: { entry: Entry }) => {
  return (
    <div className="mx-auto max-w-3xl px-10 pt-10 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
      <div className="mb-3 flex flex-row items-center space-x-3">
        <p className="text-xl text-gray-500 dark:text-gray-400">
          {formatTZ(props.entry.createdAt, 'yyyy-MM-dd HH:mm')}
        </p>

        {props.entry.starred && (
          <StarIcon className="w-5 text-yellow-400 dark:text-yellow-500" />
        )}

        <div className="flex flex-row space-x-2">
          {props.entry.tags.map((tag) => (
            <div className="text-sm text-gray-500 dark:text-gray-400" key={tag}>
              #{tag}
            </div>
          ))}
        </div>
      </div>

      <MarkdownText>{props.entry.text}</MarkdownText>
    </div>
  );
};

export const Previews = (props: { entries: Entry[] }) => {
  return (
    <>
      {props.entries.map((entry) => (
        <Preview entry={entry} key={entry.uuid} />
      ))}
    </>
  );
};
