import { Box, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { PostList } from '../components/PostList';
import { useCurrentKeyword } from '../hooks/useCurrentKeyword';
import { useSearchEntriesQuery } from '../hooks/useSearchEntriesQuery';

const limit = 6;

export default function Index() {
  const router = useRouter();
  const { preview } = router.query as { preview?: string };
  const { keyword, setKeyword } = useCurrentKeyword();
  const {
    data: entries,
    fetchNextPage,
    isFetching,
  } = useSearchEntriesQuery({
    limit,
    keyword,
  });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    fetchNextPage();
  }, [inView, fetchNextPage]);

  const isPreviewMode = !!preview;

  return (
    <>
      <Head>
        <title>manuscript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {entries && (
        <PostList
          entries={entries.pages.flat()}
          keyword={keyword}
          onSearch={({ keyword }) => setKeyword(keyword)}
          isPreviewMode={isPreviewMode}
        />
      )}
      <Box align="center" ref={ref}>
        {!isPreviewMode && isFetching && (
          <Spinner emptyColor="gray.300" speed="0.65s" />
        )}
      </Box>
    </>
  );
}
