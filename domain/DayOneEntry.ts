import { newEntry } from './Entry';

export type DayOneEntry = {
  text: string;
  tags: string[];
  starred: boolean;
  uuid: string;
  creationDate: string; // '2021-04-12T11:01:28Z' (UTC)
  modifiedDate: string;
  timeZone: string; // 'Asia/Tokyo'
  creationDeviceType?: string; // 'iPad'
  creationDevice?: string; // 'TakashiのiPad'
  creationDeviceModel?: string; // 'iPad6,11'
  creationOSName?: string; // 'iOS'
  creationOSVersion?: string; // '14.4.2'
  duration?: number; // 0
  editingTime?: number;
  richText?: string;
};

export type DayOneData = {
  metadata: {
    version: string; // '1.0'
  };
  entries: DayOneEntry[];
};

export const unescape = (text: string) =>
  text
    .replace(/\\n/g, '\n') // unescape linebreak
    .replace(/\\/g, '') // remove backslash
    .replace(/[\u200B-\u200D\uFEFF]/g, ''); // remove zero width space

export const toEntry = (row: DayOneEntry) =>
  newEntry({
    text: unescape(row.text),
    tags: row.tags,
    starred: row.starred,
    uuid: row.uuid,
    createdAt: row.creationDate, // ISO8601 without fraction seconds
    modifiedAt: row.modifiedDate,
  });
