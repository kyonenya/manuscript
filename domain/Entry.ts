import dayjs, { Dayjs } from 'dayjs';
import short from 'short-uuid';

const translator = short();

export type Entry = {
  text: string;
  starred: boolean;
  uuid: string;
  tags: string[]; // [] if empty
  createdAt: string; // ISO8601 without fraction seconds
  modifiedAt: string;
};

export const newEntry = (props: {
  text: string;
  starred?: boolean;
  uuid?: string;
  tags?: string[];
  createdAt?: string | Date | Dayjs;
  modifiedAt?: string | Date | Dayjs;
}): Entry => {
  return {
    text: props.text,
    starred: props.starred ?? false,
    uuid: props.uuid ?? translator.uuid().replace(/-/g, '').toUpperCase(),
    tags: props.tags ?? [],
    createdAt: dayjs(props.createdAt).format(), // current time if empty
    modifiedAt: dayjs(props.modifiedAt).format(),
  };
};

export const tagHistory = (posts: Entry[]): string[] => [
  ...new Set(posts.map((post) => post.tags).flat()),
]; // uniq
