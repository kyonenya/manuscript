export type Entry = {
  text: string;
  starred: boolean;
  uuid: string;
  tags: string[]; // [] if empty
  createdAt: string; // ISO8601
  modifiedAt: string;
};

export const newEntry = (props: {
  text: string;
  starred?: boolean;
  uuid?: string;
  tags?: string[];
  createdAt?: string; // current time if empty
  modifiedAt?: string;
}): Entry => {
  return {
    text: props.text,
    starred: props.starred ?? false,
    uuid: props.uuid ?? crypto.randomUUID().replace(/-/g, '').toUpperCase(),
    tags: props.tags ?? [],
    createdAt: props.createdAt ?? new Date().toISOString(),
    modifiedAt: props.modifiedAt ?? new Date().toISOString(),
  };
};

export const extractTagHistory = (entries: Entry[]): string[] => [
  ...new Set(entries.map((entry) => entry.tags).flat()),
]; // uniq

export const sortByCreatedAt = (entries: Entry[]): Entry[] => {
  return entries.sort((a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  });
};
