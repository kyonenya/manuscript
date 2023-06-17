import dayjs from 'dayjs';
import { Entry } from '../domain/Entry';
import { ArticleHeader } from './ArticleHeader';
import { MarkdownText } from './MarkdownText';
import { Tags } from './Tags';

export const ArticlePage = (props: {
  entry: Entry;
  tagList: string[];
  isLoading: boolean;
  onDelete: () => void;
  onUpdate: (props: { createdAt: string; tags: string[] }) => void;
}) => {
  return (
    <div className="flex min-h-screen flex-col">
      <ArticleHeader
        entry={props.entry}
        tagList={props.tagList}
        isLoading={props.isLoading}
        onUpdate={props.onUpdate}
        onDelete={props.onDelete}
      />

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
    </div>
  );
};
