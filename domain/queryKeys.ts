export const queryKeys = {
  currentSearch: 'currentSearch',
  entries: 'entries',
  searchedEntries: ({ keyword, tag }: { keyword?: string; tag?: string }) => [
    'entries',
    { keyword, tag },
  ],
  entry: (uuid: string | undefined) => ['getEntry', { uuid }],
  tagList: 'tagList',
};
