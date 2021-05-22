import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useState } from 'react';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { Entry } from '../app/Entry';
import { TopHeaderMenu } from '../components/HeaderMenu';
import { PostList } from '../components/PostList';

const limit = 3;

export default function Index() {
  const queryClient = useQueryClient();
  const [keyword, setKeyword] = useState(
    queryClient.getQueryData<string>('currentKeyword')
  );
  const { data, fetchNextPage } = useInfiniteQuery<Entry>(
    ['entries', { keyword }],
    async ({ pageParam = 0 }) => {
      queryClient.setQueryData('currentKeyword', keyword);
      const res = await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({
          keyword,
          limit,
          offset: pageParam * limit,
        }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
      });
      if (!res.ok) throw new Error(res.statusText);
      return await res.json();
    },
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
