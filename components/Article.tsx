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
import { Entry, toEntry } from '../app/Entry';

export const Article = () => {
  const entry = toEntry({ text: '', tags: ['tag1', 'tag2'] });

  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={6}
      rounded={{ base: 'none', md: 'xl' }} // changed
      align={'left'}
      pos={'relative'}
      as="li"
    >
      <Box>
        <Text color={useColorModeValue('gray.700', 'gray.300')}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text color={useColorModeValue('gray.700', 'gray.300')}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Text color={useColorModeValue('gray.700', 'gray.300')}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </Box>

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
