'use client';

import { useState } from 'react';
import { Entry } from '../domain/Entry';
import { SearchQuery } from '../domain/SearchQuery';
import { ListItem } from './ListItem';
import { Previews } from './Preview';
import { Skelton } from './_components/Skelton';

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
    <div className="mx-auto max-w-4xl py-3 md:py-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
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
      </div>
    </div>
  );
};

export const PostListSkelton = () => {
  const SkeltonCard = () => (
    <div
      className={
        'flex h-[150px] flex-col justify-center rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 lg:h-[200px]'
      }
    >
      <Skelton />
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl py-3 md:py-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
        <SkeltonCard />
      </div>
    </div>
  );
};
