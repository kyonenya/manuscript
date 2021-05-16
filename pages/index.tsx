import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { Entry } from '../app/Entry';
import { TopHeaderMenu } from '../components/HeaderMenu';
import { PostList } from '../components/PostList';
import { readMany } from '../infra/entryRepository';

const limit = 3;

export default function Index(props: { entries: Entry[] }) {
  const [keyword, setKeyword] = useState('');
  const { data, fetchNextPage, isFetching } = useInfiniteQuery<Entry>(
    ['search', { keyword }],
    ({ pageParam = 0 }) =>
      fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({
          keyword,
          limit,
          offset: pageParam * limit,
        }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
      }).then((res) => res.json()),
    {
      getNextPageParam: (lastPage, pages) => pages.length,
    }
  );

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
      <Head>
        <title>manuscript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopHeaderMenu onSearch={({ keyword }) => setKeyword(keyword)} />
      <Box align="center">
        <IconButton
          aria-label={'もっと読む'}
          onClick={() => fetchNextPage()}
          icon={<AddIcon />}
          size={'sm'}
        />
      </Box>
      <Container maxW="4xl" py={4}>
        {data && (
          <PostList
            entries={data.pages.flat()}
            keyword={keyword === '' ? undefined : keyword}
          />
        )}
      </Container>
    </Box>
  );
}

export const getStaticProps: GetStaticProps<{
  entries: Entry[];
}> = async () => {
  const entries = await readMany({ limit: 4 });
  return {
    props: { entries },
  };
};
