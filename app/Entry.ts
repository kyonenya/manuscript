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

export type SearchedSummary = {
  isBeforeEllipsed: boolean;
  beforeText: string;
  keyword: string;
  afterText: string;
  isAfterEllipsed: boolean;
};

export const toSearchedSummary = (props: {
  keyword: string;
  text: Entry['text'];
}): SearchedSummary => {
  const { keyword, text } = props;
  const resultLength = 50;
  const beforeLength = 20;
  const afterLength = resultLength - beforeLength - keyword.length;
  const keywordIndex = text.indexOf(keyword);
  const beforeIndex = keywordIndex - beforeLength;
  const afterIndex = keywordIndex + keyword.length;

  return {
    isBeforeEllipsed: true,
    beforeText: text.substr(beforeIndex, beforeLength),
    keyword: text.substr(keywordIndex, keyword.length),
    afterText: text.substr(afterIndex, afterLength),
    isAfterEllipsed: beforeIndex + resultLength < text.length,
  };
};
