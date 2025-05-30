'use client';

import { InboxIcon } from '@heroicons/react/24/solid';
import { PropsWithChildren, useState } from 'react';
import { Entry, sortByCreatedAt } from '../domain/Entry';
import { SearchQuery } from '../domain/SearchQuery';
import { ListItem, ListItemSkelton } from './ListItem';
import { Previews } from './Preview';

const PostListContainer = (props: PropsWithChildren) => (
  <div className="mx-auto max-w-4xl py-3 md:py-6">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
      {props.children}
    </div>
  </div>
);

export const PostList = ({
  entries,
  searchQuery,
  isPreviewMode = false,
  isSelectMode = false,
  isDemoMode = false,
}: {
  entries: Entry[];
  searchQuery?: SearchQuery | undefined;
  isPreviewMode?: boolean;
  isSelectMode?: boolean;
  isDemoMode?: boolean;
}) => {
  const [selectedEntries, setSelectedEntries] = useState<Entry[]>([]);

  if (isPreviewMode && entries) {
    return (
      <Previews
        entries={
          selectedEntries.length > 0
            ? sortByCreatedAt(selectedEntries)
            : entries
        }
      />
    );
  }

  return (
    <PostListContainer>
      {entries.length > 0 &&
        entries
          .filter(
            (entry) =>
              (!searchQuery?.keyword ||
                entry.text.includes(searchQuery.keyword)) &&
              (!searchQuery?.tag || entry.tags.includes(searchQuery.tag)),
          )
          .map((entry) => (
            <ListItem
              entry={entry}
              searchQuery={searchQuery}
              isSelectMode={isSelectMode}
              isSelected={isSelectMode && selectedEntries.includes(entry)}
              isDemoMode={isDemoMode}
              onSelect={() =>
                setSelectedEntries((prevEntries) => {
                  if (prevEntries.includes(entry)) {
                    return prevEntries.filter(
                      (prevEntry) => prevEntry !== entry,
                    );
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
