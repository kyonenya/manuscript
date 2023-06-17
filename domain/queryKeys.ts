export const queryKeys = {
  currentSearchStr: ['currentSearchStr'],
  entries: ({
    limit,
    keyword,
    tag,
  }: {
    limit: number;
    keyword?: string;
    tag?: string;
  }) => [['getEntries'], { input: { limit, keyword, tag }, type: 'infinite' }],
  entry: (uuid: string | undefined) => [
    ['getEntry'],
    { input: { uuid }, type: 'query' },
  ],
  tagList: ['getTagList'],
};
