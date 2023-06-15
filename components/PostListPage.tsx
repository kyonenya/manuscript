import clsx from 'clsx';
import dayjs from 'dayjs';
import { useState } from 'react';
import { generateSummaryEntity, SummaryEntity } from 'search-summary';
import { Entry } from '../domain/Entry';
import { SearchQuery } from '../domain/SearchQuery';
import { Link } from './Link';
import { PostListHeader } from './PostListHeader';
import { Previews } from './Preview';
import { Tags } from './Tags';

const Summary = (props: { text: string }) => {
  const limit = 120;

  return (
    <div>
      <p className="text-gray-700 dark:text-gray-300">
        {props.text.length > limit
          ? `${props.text.substr(0, limit)}...`
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
      <span className="bg-yellow-100 text-orange-800 p-1 mx-1">
        {summary.keyword}
      </span>
      <span className="text-gray-700 dark:text-gray-300">
        {summary.afterText}
        {summary.isAfterEllipsed && '...'}
      </span>
    </div>
  );
};

const ListItem = (props: {
  entry: Entry;
  searchQuery: SearchQuery | undefined;
  isSelected: boolean;
  isSelectMode: boolean;
  onSelect: () => void;
}) => {
  const { entry } = props;
  const summary = generateSummaryEntity(entry.text, props.searchQuery?.keyword);

  return (
    <div
      className={clsx('flex flex-col shadow-lg p-6 rounded-xl', {
        'bg-yellow-100 dark:bg-gray-600': props.isSelected,
        'bg-white dark:bg-gray-800': !props.isSelected,
      })}
      onClick={props.isSelectMode ? props.onSelect : undefined}
    >
      <Link
        href={`/${entry.uuid.toLowerCase()}`}
        isEnabled={!props.isSelectMode}
      >
        {summary ? (
          <SearchSummary summary={summary} />
        ) : (
          <Summary text={entry.text} />
        )}
      </Link>
      <div className="mb-2" />
      <div className="flex flex-row items-center justify-start space-x-3 mt-auto">
        <p className="text-gray-600 dark:text-gray-400">
          {dayjs(entry.createdAt).format('YYYY-MM-DD')}
        </p>
        <Tags tags={entry.tags} />
      </div>
    </div>
  );
};

export const PostListPage = (props: {
  entries: Entry[] | undefined;
  searchQuery: SearchQuery | undefined;
  searchStr: string | undefined;
  isPreviewMode: boolean;
  isImported: boolean;
  isImporting: boolean;
  onSearch: (data: { searchStr: string }) => void;
  onSignOut: () => void;
  onImport: (props: { entries: Entry[] }) => void;
  onDeleteAll: () => void;
}) => {
  const [selectedEntries, setSelectedEntries] = useState<Entry[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);

  if (props.isPreviewMode && props.entries) {
    return (
      <Previews
        entries={selectedEntries.length > 0 ? selectedEntries : props.entries}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-700">
      <PostListHeader
        searchStr={props.searchStr}
        isSelectMode={isSelectMode}
        isImported={props.isImported}
        isImporting={props.isImporting}
        onSearch={props.onSearch}
        onSignOut={props.onSignOut}
        toggleSelectMode={() =>
          setIsSelectMode((prevMode) => {
            if (!prevMode) setSelectedEntries([]);
            return !prevMode;
          })
        }
        onImport={props.onImport}
        onDeleteAll={props.onDeleteAll}
      />

      <div className="max-w-4xl py-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {props.entries &&
            props.entries.map((entry) => (
              <ListItem
                entry={entry}
                searchQuery={props.searchQuery}
                isSelectMode={isSelectMode}
                isSelected={isSelectMode && selectedEntries.includes(entry)}
                onSelect={() =>
                  setSelectedEntries((prevEntries) => {
                    if (prevEntries.includes(entry)) {
                      return prevEntries.filter(
                        (prevEntry) => prevEntry !== entry
                      );
                    }
                    return [entry, ...prevEntries];
                  })
                }
                key={entry.uuid}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
