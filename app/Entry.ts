import dayjs, { Dayjs } from 'dayjs';
import short from 'short-uuid';

const translator = short();

export type Entry = {
  text: string;
  starred: boolean;
  uuid: string;
  tags: string[] | null;
  createdAt: string; // ISO8601
  modifiedAt: string;
};

export const toEntry = (props: {
  text: string;
  starred?: boolean;
  uuid?: string;
  tags?: string[] | null;
  createdAt?: string | Date | Dayjs;
  modifiedAt?: string | Date | Dayjs;
}): Entry => {
  return {
    text: props.text,
    starred: props.starred ?? false,
    uuid: props.uuid ?? translator.uuid().replace(/-/g, '').toUpperCase(),
    tags: props.tags ?? null,
    createdAt: dayjs(props.createdAt).format(), // current time if empty
    modifiedAt: dayjs(props.modifiedAt).format(),
  };
};
