import {
  Box,
  Container,
  Stack,
  Tag,
  TagLabel,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Entry } from '../domain/Entry';
import { ArticleHeader } from './ArticleHeader';
import { MarkdownText } from './MarkdownText';

export const Article = (props: {
  entry: Entry;
  tagList: string[];
  isLoading: boolean;
  onDelete: () => void;
  onUpdate: (props: { createdAt: string; tags: string[] }) => void;
}) => {
  return (
    <>
      <ArticleHeader
        entry={props.entry}
        tagList={props.tagList}
        isLoading={props.isLoading}
        onUpdate={props.onUpdate}
        onDelete={props.onDelete}
      />

      <Container maxW="3xl" px={0} py={4}>
        <Stack
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'lg'}
          p={6}
          rounded={{ base: 'none', md: 'xl' }}
          align={'left'}
          pos={'relative'}
          as="li"
        >
          <Box>
            <MarkdownText>{props.entry.text}</MarkdownText>
          </Box>

          <Stack direction={'row'} spacing={4}>
            <Box>
              <Text color="gray.500">
                {dayjs(props.entry.createdAt).format('YYYY-MM-DD')}
              </Text>
            </Box>
            <Stack direction={'row'}>
              {props.entry.tags?.map((tag) => (
                <Tag
                  size="md"
                  key="md"
                  variant="subtle"
                  colorScheme="blackAlpha"
                >
                  <TagLabel fontWeight={'400'}>#{tag}</TagLabel>
                </Tag>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};
