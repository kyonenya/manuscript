import dayjs from 'dayjs';
import short from 'short-uuid';

const translator = short();

export class Entry {
  public readonly text: string;
  public readonly starred: boolean;
  public readonly uuid: string;
  public readonly tags: string[] | null;
  public readonly createdAt: string; // ISO8601
  public readonly modifiedAt: string;

  constructor(props: {
    text: string;
    starred?: boolean;
    uuid?: string;
    tags: string[] | null;
    createdAt?: string; // 2020-11-19T11:48:24.000Z
    modifiedAt?: string;
  }) {
    this.text = props.text;
    this.starred = props.starred ?? false;
    this.uuid = props.uuid ?? translator.uuid().replace(/-/g, '').toUpperCase();
    this.tags = props.tags;
    this.createdAt = props.createdAt ?? dayjs().format();
    this.modifiedAt = props.modifiedAt ?? dayjs().format();
  }
}

export type EntryProps = {
  text: string;
  starred: boolean;
  uuid: string;
  tags: string[] | null;
  createdAt: string;
  modifiedAt: string;
};

export const serialize = (entry: Entry): EntryProps => {
  const { text, starred, uuid, tags, createdAt, modifiedAt } = entry;
  return { text, starred, uuid, tags, createdAt, modifiedAt };
};
