import { Entry } from '../../domain/Entry';
import { formatTZ } from '../../domain/dateUtils';
import { MarkdownText } from '../_components/MarkdownText';
import { Skelton } from '../_components/Skelton';
import { Tags } from '../_components/Tags';

const ArticleContainer = (props: React.PropsWithChildren) => (
  <div className="container mx-auto max-w-3xl flex-1 px-0 py-4">
    <div className="rounded-none bg-white p-6 text-gray-700 shadow-lg md:rounded-xl dark:bg-gray-800 dark:text-gray-300">
      {props.children}
    </div>
  </div>
);

export const Article = (props: { entry: Entry; isDemoMode?: boolean }) => {
  return (
    <ArticleContainer>
      <MarkdownText>
        {props.entry.text.replace(
          /dayone:\/\/view\?entryId=([A-Z0-9]+)/g, // Internal link
          '/$1',
        )}
      </MarkdownText>
      <div className="mt-3 flex flex-row space-x-4">
        <p className="text-gray-600 dark:text-gray-400">
          {formatTZ(props.entry.createdAt, 'yyyy-MM-dd')}
        </p>
        <Tags tags={props.entry.tags} isDemoMode={props.isDemoMode} />
      </div>
    </ArticleContainer>
  );
};

export const ArticleSkelton = () => (
  <ArticleContainer>
    <Skelton className="mb-4" />
    <Skelton className="mb-4" />
    <Skelton />
  </ArticleContainer>
);
