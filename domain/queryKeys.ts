export const queryKeys = {
  currentSearchStr: 'currentSearchStr',
  entries: ({ keyword, tag }: { keyword?: string; tag?: string }) => [
    'getEntries',
    { keyword, tag },
  ],
  entry: (uuid: string | undefined) => ['getEntry', { uuid }],
  tagList: 'getTagList',
};
