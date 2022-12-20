export const queryKeys = {
  currentSearchStr: 'currentSearchStr',
  entries: ({
    limit,
    keyword,
    tag,
  }: {
    limit: number;
    keyword?: string;
    tag?: string;
  }) => ['getEntries', { limit, keyword, tag }],
  entry: (uuid: string | undefined) => ['getEntry', { uuid }],
  tagList: 'getTagList',
};
