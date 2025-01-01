import { Tag } from '@prisma/client';
import { Entry } from './Entry';

export const tagNameToId = (props: {
  name: string;
  tags: Tag[];
}): number | undefined => props.tags.find((tag) => props.name === tag.name)?.id;

/**
 * A: entry.uuid, B: tag.id
 */
export const entriesTagToABs = (props: { entries: Entry[]; tags: Tag[] }) => {
  return props.entries
    .map((entry) =>
      entry.tags.map((tag) => [
        entry.uuid,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        tagNameToId({ name: tag, tags: props.tags })!,
      ])
    )
    .flat();
};
