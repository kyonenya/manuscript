import {
  Box,
  Text,
  Stack,
  SimpleGrid,
  Tag,
  TagLabel,
  useColorModeValue,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Entry, toSearchedSummary } from '../app/Entry';
import { Link } from './Link';

const Summary = (props: { text: string }) => {
  return (
    <Box>
      <Text color={useColorModeValue('gray.700', 'gray.300')}>
        {props.text.substr(0, 125)}
      </Text>
    </Box>
  );
};

const SearchedSummary = (props: { text: string; keyword: string }) => {
  const summary = toSearchedSummary(props);

  return (
    <Box>
      <Text color={useColorModeValue('gray.700', 'gray.300')} as="span">
        {summary.isBeforeEllipsed && '…'}
        {summary.beforeText}
      </Text>
      <Text as="span" bg="yellow.100" color="orange.800" p={0.5} mx={1}>
        {summary.keyword}
      </Text>
      <Text color={useColorModeValue('gray.700', 'gray.300')} as="span">
        {summary.afterText}
        {summary.isAfterEllipsed && '…'}
      </Text>
    </Box>
  );
};

const ListItem = (props: { entry: Entry; keyword?: string }) => {
  const { entry } = props;
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={6}
      rounded={'xl'}
      align={'left'}
      pos={'relative'}
      as="li"
    >
      <Link href={`/${entry.uuid}`}>
        {props.keyword ? (
          <SearchedSummary text={entry.text} keyword={props.keyword} />
        ) : (
          <Summary text={entry.text} />
        )}
      </Link>
      <Stack direction={'row'} spacing={4}>
        <Box>
          <Text color="gray.500">
            {dayjs(entry.createdAt).format('YYYY-MM-DD')}
          </Text>
        </Box>
        <Stack direction={'row'}>
          {entry.tags?.map((tag) => (
            <Tag size="md" key="md" variant="subtle" colorScheme="blackAlpha">
              <TagLabel fontWeight={'400'}>#{tag}</TagLabel>
            </Tag>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export const PostList = (props: { entries: Entry[]; keyword?: string }) => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 4, lg: 8 }}
      as="ul"
    >
      {props.entries.map((entry) => (
        <ListItem entry={entry} keyword={props.keyword} key={entry.uuid} />
      ))}
    </SimpleGrid>
  );
};
