'use client';

import { useState } from 'react';
import { Previews } from '../components/Preview';
import { Entry } from '../domain/Entry';
import { SearchQuery } from '../domain/SearchQuery';
import { ListItem } from './ListItem';
import { PostListHeader } from './PostListHeader';

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

      <div className="mx-auto max-w-4xl py-3 md:py-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
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

export const PostList = ({
  entries,
  searchQuery,
  isPreviewMode = false,
  isSelectMode = false,
}: {
  entries: Entry[] | undefined;
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
          entries.map((entry) => (
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
