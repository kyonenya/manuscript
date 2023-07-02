import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { Entry } from '../../domain/Entry';
import dayjs from '../../infra/dayjs';
import { MarkdownText } from '../_components/MarkdownText';
import { Skelton } from '../_components/Skelton';
import { Tags } from '../_components/Tags';

const ArticleContainer = (props: PropsWithChildren<{ className?: string }>) => (
  <div
    className={twMerge(
      'container mx-auto max-w-3xl flex-1 px-0 py-4',
      props.className
    )}
  >
    <div className="rounded-none bg-white p-6 text-gray-700 shadow-lg dark:bg-gray-800 dark:text-gray-300 md:rounded-xl">
      {props.children}
    </div>
  </div>
);

export const Article = (props: { entry: Entry }) => {
  return (
    <ArticleContainer>
      <MarkdownText>{props.entry.text}</MarkdownText>
      <div className="mt-3 flex flex-row space-x-4">
        <p className="text-gray-600 dark:text-gray-400">
          {dayjs(props.entry.createdAt).format('YYYY-MM-DD')}
        </p>
        <Tags tags={props.entry.tags} />
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
