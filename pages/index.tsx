import { Box, Container, Spinner, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { TopHeaderMenu } from '../components/HeaderMenu';
import { PostList } from '../components/PostList';
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
      <TopHeaderMenu
        keyword={keyword}
        onSearch={({ keyword }) => setKeyword(keyword)}
      />
      <Container maxW="4xl" py={{ base: 6 }}>
        {entries && (
          <PostList entries={entries.pages.flat()} keyword={keyword} />
        )}
      </Container>
      <Box align="center" ref={ref}>
        {isFetching && <Spinner emptyColor="gray.300" speed="0.65s" />}
      </Box>
    </Box>
  );
}
