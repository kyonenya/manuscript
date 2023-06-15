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
    <div className="flex flex-col min-h-screen">
      <ArticleHeader
        entry={props.entry}
        tagList={props.tagList}
        isLoading={props.isLoading}
        onUpdate={props.onUpdate}
        onDelete={props.onDelete}
      />

      <div className="container mx-auto max-w-3xl px-0 py-4 flex-1">
        <div className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 shadow-lg p-6 rounded-none md:rounded-xl">
          <MarkdownText>{props.entry.text}</MarkdownText>
          <div className="flex flex-row space-x-4 mt-3">
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
