import { StarIcon } from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import Link from 'next/link';
import { generateSummaryEntity, SummaryEntity } from 'search-summary';
import { twMerge } from 'tailwind-merge';
import { Entry } from '../domain/Entry';
import { SearchQuery } from '../domain/SearchQuery';
import { Skelton } from './_components/Skelton';
import { Tags } from './_components/Tags';

const Summary = (props: { text: string }) => {
  const limit = 120;

  return (
    <div>
      <p className="text-gray-700 dark:text-gray-300">
        {props.text.length > limit
          ? `${props.text.substring(0, limit)}...`
          : props.text}
      </p>
    </div>
  );
};

const SearchSummary = (props: { summary: SummaryEntity }) => {
  const { summary } = props;

  return (
    <div>
      <span className="text-gray-700 dark:text-gray-300">
        {summary.isBeforeEllipsed && '...'}
        {summary.beforeText}
      </span>
      <span className="mx-1 inline-block rounded-sm border border-gray-300 bg-yellow-200 p-1 text-gray-800">
        {summary.keyword}
      </span>
      <span className="text-gray-700 dark:text-gray-300">
        {summary.afterText}
        {summary.isAfterEllipsed && '...'}
      </span>
    </div>
  );
};

const listItemClassName = 'flex flex-col rounded-xl p-6 shadow-lg text-left';

export const ListItem = (props: {
  entry: Entry;
  searchQuery: SearchQuery | undefined;
  isSelected: boolean;
  isSelectMode: boolean;
  onSelect: () => void;
}) => {
  const { entry } = props;
  const summary = props.searchQuery?.keyword
    ? generateSummaryEntity(entry.text, props.searchQuery.keyword, {
        maxLength: 120,
        beforeLength: 50,
      })
    : undefined;
  const SummaryComponent = () =>
    summary ? (
      <SearchSummary summary={summary} />
    ) : (
      <Summary text={entry.text} />
    );

  return (
    <button
      className={twMerge(
        listItemClassName,
        props.isSelected && 'bg-yellow-100 dark:bg-gray-600',
        !props.isSelected && 'bg-white dark:bg-gray-800'
      )}
      onClick={props.isSelectMode ? props.onSelect : undefined}
    >
      {props.isSelectMode ? (
        <SummaryComponent />
      ) : (
        <Link href={`/${entry.uuid.toLowerCase()}`}>
          <SummaryComponent />
        </Link>
      )}
      <div className="mb-2" />
      <div className="mt-auto flex flex-row items-center justify-start space-x-3">
        <p className="text-gray-600 dark:text-gray-400">
          {dayjs(entry.createdAt).format('YYYY-MM-DD')}
        </p>
        {props.entry.starred && (
          <StarIcon className="w-5 text-yellow-400 dark:text-yellow-500" />
        )}
        <Tags tags={entry.tags} searchedTag={props.searchQuery?.tag} />
      </div>
    </button>
  );
};

export const ListItemSkelton = () => (
  <button
    className={twMerge(
      listItemClassName,
      'h-[150px] justify-center bg-white dark:bg-gray-800 lg:h-[200px]'
    )}
  >
    <Skelton />
  </button>
);
