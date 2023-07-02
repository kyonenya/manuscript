'use client';

import { PropsWithChildren, useState } from 'react';
import { Entry } from '../domain/Entry';
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
}: {
  entries: Entry[];
  searchQuery?: SearchQuery | undefined;
  isPreviewMode?: boolean;
  isSelectMode?: boolean;
}) => {
  const [selectedEntries, setSelectedEntries] = useState<Entry[]>([]);

  if (isPreviewMode && entries) {
    return (
      <Previews
        entries={selectedEntries.length > 0 ? selectedEntries : entries}
      />
    );
  }

  return (
    <PostListContainer>
      {entries &&
        entries
          .filter(
            (entry) =>
              (!searchQuery?.keyword ||
                entry.text.includes(searchQuery.keyword)) &&
              (!searchQuery?.tag || entry.tags.includes(searchQuery.tag))
          )
          .map((entry) => (
            <ListItem
              entry={entry}
              searchQuery={searchQuery}
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
