import fs from 'fs';
import { Entry, toEntry } from '../domain/Entry';

type jsonEntry = {
  text: string | null;
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

const entryFactory = (row: jsonEntry) =>
  toEntry({
    text: unescape(row.text ?? ''),
    tags: row.tags,
    starred: row.starred,
    uuid: row.uuid,
    createdAt: row.creationDate,
    modifiedAt: row.modifiedDate,
  });

export const readAll = async (filePath: string): Promise<Entry[]> => {
  const json = await fs.promises.readFile(filePath, 'utf-8');
  const jsonEntries: jsonEntry[] = JSON.parse(json).entries;
  return jsonEntries
    .filter((jsonEntry) => jsonEntry.text !== undefined)
    .map((jsonEntry) => entryFactory(jsonEntry));
};
