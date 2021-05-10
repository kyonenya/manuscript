import {
  Box,
  Text,
  Stack,
  Container,
  useColorModeValue,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Entry } from '../app/Entry';

export const PostListItem = (props: { entry: Entry }) => {
  const { entry } = props;
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={6}
      rounded={'xl'}
      align={'left'}
      pos={'relative'}
    >
      <Text
        textAlign={'left'}
        color={useColorModeValue('gray.700', 'gray.300')}
        fontSize={'md'}
      >
        {entry.text}
      </Text>
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
