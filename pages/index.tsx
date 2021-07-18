import { Box, Container, Spinner, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { PostList } from '../components/PostList';
import { PostListHeader } from '../components/PostListHeader';
import { useCurrentKeyword } from '../hooks/useCurrentKeyword';
import { useSearchEntries } from '../hooks/useSearchEntries';

const limit = 6;

export default function Index() {
  const { keyword, setKeyword } = useCurrentKeyword();
  const {
    data: entries,
    fetchNextPage,
    isFetching,
  } = useSearchEntries({
    limit,
    keyword,
  });
  const [isSelectMode, setIsSelectMode] = useState(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    fetchNextPage();
  }, [inView, fetchNextPage]);

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
      <Head>
        <title>manuscript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostListHeader
        keyword={keyword}
        onSearch={({ keyword }) => setKeyword(keyword)}
        toggleSelectMode={() => setIsSelectMode((prev) => !prev)}
      />
      <Container maxW="4xl" py={{ base: 6 }}>
        {entries && (
          <PostList
            entries={entries.pages.flat()}
            keyword={keyword}
            isSelectMode={isSelectMode}
          />
        )}
      </Container>
      <Box align="center" ref={ref}>
        {isFetching && <Spinner emptyColor="gray.300" speed="0.65s" />}
      </Box>
    </Box>
  );
}
