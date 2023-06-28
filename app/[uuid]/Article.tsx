import { Entry } from '../../domain/Entry';
import dayjs from '../../infra/dayjs';
import { MarkdownText } from '../_components/MarkdownText';
import { Tags } from '../_components/Tags';

export const Article = (props: { entry: Entry }) => {
  return (
    <div className="container mx-auto max-w-3xl flex-1 px-0 py-4">
      <div className="rounded-none bg-white p-6 text-gray-700 shadow-lg dark:bg-gray-800 dark:text-gray-300 md:rounded-xl">
        <MarkdownText>{props.entry.text}</MarkdownText>
        <div className="mt-3 flex flex-row space-x-4">
          <p className="text-gray-600 dark:text-gray-400">
            {dayjs(props.entry.createdAt).format('YYYY-MM-DD')}
          </p>
          <Tags tags={props.entry.tags} />
        </div>
      </div>
    </div>
  );
};
