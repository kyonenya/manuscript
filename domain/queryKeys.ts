export const queryKeys = {
  currentSearch: 'currentSearch',
  entries: 'getEntries',
  searchedEntries: ({ keyword, tag }: { keyword?: string; tag?: string }) => [
    'getEntries',
    { keyword, tag },
  ],
  entry: (uuid: string | undefined) => ['getEntry', { uuid }],
  tagList: 'getTagList',
};
