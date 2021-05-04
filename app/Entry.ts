import short from 'short-uuid';

const translator = short();

export class Entry {
  public readonly text: string;
  public readonly starred: boolean;
  public readonly uuid: string;
  public readonly tags: string[] | null;
  public readonly created_at?: string;
  public readonly modified_at?: string;

  constructor(props: {
    text: string;
    starred?: boolean;
    uuid?: string;
    tags: string[] | null;
    created_at?: string; // 2020-11-19T11:48:24.000Z
    modified_at?: string;
  }) {
    this.text = props.text;
    this.starred = props.starred ?? false;
    this.uuid = props.uuid ?? translator.uuid().replace(/-/g, '');
    this.tags = props.tags;
    this.created_at = props.created_at;
    this.modified_at = props.modified_at;
  }
}
