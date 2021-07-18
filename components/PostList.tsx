import {
  Box,
  Container,
  Text,
  Stack,
  SimpleGrid,
  Tag,
  TagLabel,
  useColorModeValue,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Entry } from '../domain/Entry';
import { toSearchedSummary } from '../domain/SearchedSummary';
import { Link } from './Link';
import { PostListHeader } from './PostListHeader';

const Summary = (props: { text: string }) => {
  const limit = 120;

  return (
    <Box>
      <Text color={useColorModeValue('gray.700', 'gray.300')}>
        {props.text.length > limit
          ? `${props.text.substr(0, limit)}…`
          : props.text}
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

const ListItem = (props: {
  entry: Entry;
  keyword?: string;
  isSelected: boolean;
  isSelectMode: boolean;
  onSelect: () => void;
}) => {
  const { entry } = props;
  return (
    <Stack
      onClick={props.isSelectMode ? props.onSelect : undefined}
      bg={useColorModeValue(
        props.isSelected ? 'yellow.100' : 'white',
        props.isSelected ? 'gray.600' : 'gray.800'
      )}
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

export const PostList = (props: {
  entries: Entry[];
  keyword?: string;
  onSearch: (data: { keyword: string }) => void;
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);

  return (
    <>
      <PostListHeader
        keyword={props.keyword}
        isSelectMode={isSelectMode}
        onSearch={props.onSearch}
        toggleSelectMode={() =>
          setIsSelectMode((prevMode) => {
            if (!prevMode) setSelectedIds([]);
            return !prevMode;
          })
        }
      />
      <Container maxW="4xl" py={{ base: 6 }}>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 4, lg: 6 }}
          as="ul"
        >
          {props.entries.map((entry) => (
            <ListItem
              entry={entry}
              keyword={props.keyword}
              key={entry.uuid}
              isSelectMode={isSelectMode}
              isSelected={isSelectMode && selectedIds.includes(entry.uuid)}
              onSelect={() =>
                setSelectedIds((prevIds) => {
                  if (prevIds.includes(entry.uuid)) {
                    return prevIds.filter((id) => id !== entry.uuid);
                  }
                  return [entry.uuid, ...prevIds];
                })
              }
            />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};
