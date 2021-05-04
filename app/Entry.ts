import short from 'short-uuid';

const translator = short();

export class Entry {
  public readonly text: string;
  public readonly starred: boolean;
  public readonly uuid: string;
  public readonly tags: string[] | null;
  public readonly createdAt?: string;
  public readonly modifiedAt?: string;

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
    this.uuid = props.uuid ?? translator.uuid().replace(/-/g, '');
    this.tags = props.tags;
    this.createdAt = props.createdAt;
    this.modifiedAt = props.modifiedAt;
  }
}
