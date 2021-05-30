import { Box, Container, Spinner, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { TopHeaderMenu } from '../components/HeaderMenu';
import { PostList } from '../components/PostList';
import { useSearchEntries } from '../hooks/useSearchEntries';

const limit = 6;

export default function Index() {
  const {
    data,
    fetchNextPage,
    isFetching,
    keyword,
    setKeyword,
  } = useSearchEntries({
    limit,
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
        onSearch={({ keyword }) =>
          setKeyword(keyword === '' ? undefined : keyword)
        }
      />
      <Container maxW="4xl" py={{ base: 6 }}>
        {data && <PostList entries={data.pages.flat()} keyword={keyword} />}
      </Container>
      <Box align="center" ref={ref}>
        {isFetching && <Spinner color="blue.500" />}
      </Box>
    </Box>
  );
}
