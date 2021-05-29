import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { TopHeaderMenu, EditorHeaderMenu } from '../components/HeaderMenu';
import { PostList } from '../components/PostList';
import { useSearchEntries } from '../hooks/useSearchEntries';

const limit = 5;

export default function Index() {
  const { data, fetchNextPage, keyword, setKeyword } = useSearchEntries({
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
      {/*<TopHeaderMenu
        keyword={keyword}
        onSearch={({ keyword }) =>
          setKeyword(keyword === '' ? undefined : keyword)
        }
      />*/}
      <EditorHeaderMenu />
      <Container maxW="4xl" py={4}>
        {data && <PostList entries={data.pages.flat()} keyword={keyword} />}
        <Box align="center" ref={ref}>
          <IconButton
            aria-label={'もっと読む'}
            onClick={() => fetchNextPage()}
            icon={<AddIcon />}
            size={'sm'}
          />
        </Box>
      </Container>
    </Box>
  );
}
