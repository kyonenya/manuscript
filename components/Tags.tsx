import { Stack, Tag, TagLabel } from '@chakra-ui/react';

export const Tags = (props: { tags: string[] }) => {
  return (
    <Stack direction={'row'}>
      {props.tags?.map((tag) => (
        <Tag size="md" key="md" variant="subtle" colorScheme="blackAlpha">
          <TagLabel fontWeight={'400'}>#{tag}</TagLabel>
        </Tag>
      ))}
    </Stack>
  );
};
