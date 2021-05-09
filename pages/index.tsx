import Head from 'next/head';
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Entry } from '../app/Entry';
import { PostListItem } from '../components/PostListItem';

export default function Index() {
  const entry1 = new Entry({
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.',
    tags: ['タグ'],
  });

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
      <Head>
        <title>manuscript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="4xl" py={8}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, lg: 8 }}>
          <PostListItem entry={entry1} />
          <PostListItem entry={entry1} />
          <PostListItem entry={entry1} />
          <PostListItem entry={entry1} />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
