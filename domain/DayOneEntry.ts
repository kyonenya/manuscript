import { newEntry } from './Entry';

export type DayOneEntry = {
  text: string;
  tags: string[];
  starred: boolean;
  uuid: string;
  creationDate: string;
  modifiedDate: string;
};

export const unescape = (text: string) =>
  text
    .replace(/\\n/g, '\n') // unescape linebreak
    .replace(/\\/g, '') // remove backslash
    .replace(/[\u200B-\u200D\uFEFF]/g, ''); // remove zero width space

export const toEntry = (row: DayOneEntry) =>
  newEntry({
    text: unescape(row.text ?? ''),
    tags: row.tags,
    starred: row.starred,
    uuid: row.uuid,
    createdAt: row.creationDate,
    modifiedAt: row.modifiedDate,
  });
