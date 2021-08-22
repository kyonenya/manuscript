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
import { SearchQuery } from '../domain/SearchQuery';
import { newSearchSummary } from '../domain/SearchSummary';
import { Link } from './Link';
import { PostListHeader } from './PostListHeader';
import { Previews } from './Preview';

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

const SearchSummary = (props: { text: string; searchQuery: SearchQuery }) => {
  const summary = newSearchSummary({
    text: props.text,
    keyword: props.searchQuery.keyword,
  });

  return (
    <Box>
      <Text as="span" color={useColorModeValue('gray.700', 'gray.300')}>
        {summary.isBeforeEllipsed && '…'}
        {summary.beforeText}
      </Text>
      <Text as="span" bg="yellow.100" color="orange.800" p={0.5} mx={1}>
        {summary.keyword}
      </Text>
      <Text as="span" color={useColorModeValue('gray.700', 'gray.300')}>
        {summary.afterText}
        {summary.isAfterEllipsed && '…'}
      </Text>
    </Box>
  );
};

const ListItem = (props: {
  entry: Entry;
  searchQuery: SearchQuery | undefined;
  isSelected: boolean;
  isSelectMode: boolean;
  onSelect: () => void;
}) => {
  const { entry } = props;

  return (
    <Stack
      onClick={props.isSelectMode ? props.onSelect : undefined}
      bg={
        props.isSelected
          ? useColorModeValue('yellow.100', 'gray.600')
          : useColorModeValue('white', 'gray.800')
      }
      boxShadow={'lg'}
      p={6}
      rounded={'xl'}
      align={'left'}
      pos={'relative'}
      as="li"
    >
      <Link
        href={`/${entry.uuid.toLowerCase()}`}
        isEnabled={!props.isSelectMode}
      >
        {props.searchQuery ? (
          <SearchSummary text={entry.text} searchQuery={props.searchQuery} />
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

export const PostListPage = (props: {
  entries: Entry[] | undefined;
  searchQuery: SearchQuery | undefined;
  searchStr: string | undefined;
  isPreviewMode: boolean;
  onSearch: (data: { searchStr: string }) => void;
  onSignOut: () => void;
}) => {
  const [selectedEntries, setSelectedEntries] = useState<Entry[]>([]);
  const [isSelectMode, setIsSelectMode] = useState(false);

  return props.isPreviewMode && props.entries ? (
    <Previews
      entries={selectedEntries.length > 0 ? selectedEntries : props.entries}
    />
  ) : (
    <Box>
      <PostListHeader
        searchStr={props.searchStr}
        isSelectMode={isSelectMode}
        onSearch={props.onSearch}
        onSignOut={props.onSignOut}
        toggleSelectMode={() =>
          setIsSelectMode((prevMode) => {
            if (!prevMode) setSelectedEntries([]);
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
          {props.entries &&
            props.entries.map((entry) => (
              <ListItem
                entry={entry}
                searchQuery={props.searchQuery}
                isSelectMode={isSelectMode}
                isSelected={isSelectMode && selectedEntries.includes(entry)}
                onSelect={() =>
                  setSelectedEntries((prevEntries) => {
                    if (prevEntries.includes(entry)) {
                      return prevEntries.filter(
                        (prevEntry) => prevEntry !== entry
                      );
                    }
                    return [entry, ...prevEntries];
                  })
                }
                key={entry.uuid}
              />
            ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
