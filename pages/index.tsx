import Head from 'next/head';
import { Box, Container, Stack, useColorModeValue } from '@chakra-ui/react';
import { Entry } from '../app/Entry';
import { PostListItem } from '../components/PostListItem';

export default function Index() {
  const entry1 = new Entry({
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.',
    tags: ['タグ'],
  });

  return (
    <div className="container">
      <Head>
        <title>manuscript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box bg={useColorModeValue('gray.100', 'gray.700')}>
        <Container maxW={'5xl'} py={4} as={Stack} spacing={12}>
          <Stack spacing={{ base: 4, md: 2, lg: 8 }}>
            <PostListItem entry={entry1} />
            <PostListItem entry={entry1} />
          </Stack>
        </Container>
      </Box>
    </div>
  );
}
