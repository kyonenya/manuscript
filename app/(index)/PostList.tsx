'use client';

import { InboxIcon } from '@heroicons/react/24/solid';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Entry, sortByCreatedAt } from '../../domain/Entry';
import { SearchQuery } from '../../domain/SearchQuery';
import { ListItem, ListItemSkelton } from './ListItem';
import { Previews } from './Preview';

const PostListContainer = (props: React.PropsWithChildren) => (
  <div className="mx-auto max-w-4xl py-3 md:py-6">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
      {props.children}
    </div>
  </div>
);

export const PostList = ({
  entries,
  searchQuery,
  isDemoMode = false,
}: {
  entries: Entry[];
  searchQuery?: SearchQuery | undefined;
  isDemoMode?: boolean;
}) => {
  const searchParams = useSearchParams();
  const isPreviewMode = !!searchParams.get('preview');
  const isSelectMode = !!searchParams.get('select');
  const isAsc = searchParams.get('order') === 'asc';

  const [selectedEntries, setSelectedEntries] = useState<Entry[]>([]);

  if (isPreviewMode && entries) {
    return (
      <Previews
        entries={sortByCreatedAt(
          selectedEntries.length > 0 ? selectedEntries : entries,
          isAsc,
        )}
      />
    );
  }

  return (
    <PostListContainer>
      {entries.length > 0 &&
        sortByCreatedAt(entries, isAsc).map((entry) => (
          <ListItem
            entry={entry}
            searchQuery={searchQuery}
            isSelectMode={isSelectMode}
            isSelected={
              isSelectMode && selectedEntries.some((e) => e.uuid === entry.uuid)
            }
            isDemoMode={isDemoMode}
            onSelect={() =>
              setSelectedEntries((prevEntries) => {
                if (prevEntries.some((e) => e.uuid === entry.uuid)) {
                  return prevEntries.filter((e) => e.uuid !== entry.uuid);
                }
                return [entry, ...prevEntries];
              })
            }
            key={entry.uuid}
          />
        ))}
      {entries.length === 0 && (
        <div className="col-span-2 py-6 text-center text-gray-500 dark:text-gray-300">
          <div className="flex flex-col items-center justify-center space-y-4">
            <InboxIcon className="w-10" />
            <h2 className="text-lg font-semibold">No Posts Yet</h2>
            <p className="text-gray-400 dark:text-gray-400">
              There are no posts available yet. Please import your posts.
            </p>
          </div>
        </div>
      )}
    </PostListContainer>
  );
};

export const PostListSkelton = () => (
  <PostListContainer>
    <ListItemSkelton />
    <ListItemSkelton />
    <ListItemSkelton />
    <ListItemSkelton />
    <ListItemSkelton />
    <ListItemSkelton />
    <ListItemSkelton />
    <ListItemSkelton />
  </PostListContainer>
);
