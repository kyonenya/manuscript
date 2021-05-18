import {
  Box,
  Stack,
  Tag,
  TagLabel,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import { Entry } from '../app/Entry';

export const Article = (props: { entry: Entry }) => {
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
        <ReactMarkdown
          components={{
            h2: ({ node, ...props }) => (
              <Text
                color={useColorModeValue('gray.700', 'gray.300')}
                {...props}
              />
            ),
          }}
        >
          {props.entry.text}
        </ReactMarkdown>
        <Text color={useColorModeValue('gray.700', 'gray.300')}></Text>
      </Box>

      <Stack direction={'row'} spacing={4}>
        <Box>
          <Text color="gray.500">
            {dayjs(props.entry.createdAt).format('YYYY-MM-DD')}
          </Text>
        </Box>
        <Stack direction={'row'}>
          {props.entry.tags?.map((tag) => (
            <Tag size="md" key="md" variant="subtle" colorScheme="blackAlpha">
              <TagLabel fontWeight={'400'}>#{tag}</TagLabel>
            </Tag>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
