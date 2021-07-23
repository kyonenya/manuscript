import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Entry } from '../domain/Entry';
import { ArticleHeader } from './ArticleHeader';
import { MarkdownText } from './MarkdownText';
import { Tags } from './Tags';

export const Article = (props: {
  entry: Entry;
  tagList: string[];
  isLoading: boolean;
  onDelete: () => void;
  onUpdate: (props: { createdAt: string; tags: string[] }) => void;
}) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <ArticleHeader
        entry={props.entry}
        tagList={props.tagList}
        isLoading={props.isLoading}
        onUpdate={props.onUpdate}
        onDelete={props.onDelete}
      />

      <Container maxW="3xl" px={0} py={4} flex={1}>
        <Stack
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'lg'}
          p={6}
          rounded={{ base: 'none', md: 'xl' }}
          align={'left'}
          pos={'relative'}
          as="li"
        >
          <MarkdownText>{props.entry.text}</MarkdownText>
          <Stack direction={'row'} spacing={3}>
            <Text color="gray.500">
              {dayjs(props.entry.createdAt).format('YYYY-MM-DD')}
            </Text>
            <Tags tags={props.entry.tags} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};
