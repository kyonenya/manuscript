import {
  Box,
  Text,
  Stack,
  Container,
  SimpleGrid,
  Tag,
  TagLabel,
  useColorModeValue,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Entry } from '../app/Entry';

const ListItemText = (props: { text: string }) => {
  return (
    <Box>
      <Text color={useColorModeValue('gray.700', 'gray.300')}>
        {props.text.substr(0, 125)}
      </Text>
    </Box>
  );
};

const SearchedListItemText = () => {
  const beforeElipsed = true;
  const afterElipsed = true;

  return (
    <Box>
      <Text color={useColorModeValue('gray.700', 'gray.300')} as="span">
        {beforeElipsed && '…'}
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud
      </Text>
      <Text as="span" bg="yellow.100" color="orange.800" p={0.5} mx={1}>
        exercitation
      </Text>
      <Text color={useColorModeValue('gray.700', 'gray.300')} as="span">
        ullamco laboris nisi ut aliquip ex ea commodo consequat
        {afterElipsed && '…'}
      </Text>
    </Box>
  );
};

const ListItem = (props: { entry: Entry }) => {
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
      <SearchedListItemText />
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

export const PostList = (props: { entries: Entry[] }) => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 4, lg: 8 }}
      as="ul"
    >
      {props.entries.map((entry) => (
        <ListItem entry={entry} key={entry.uuid} />
      ))}
    </SimpleGrid>
  );
};
