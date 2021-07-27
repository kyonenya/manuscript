import { Box, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { PostList } from '../components/PostList';
import { toSearchQuery } from '../domain/SearchQuery';
import { useCurrentSearchStr } from '../hooks/useCurrentSearchStr';
import { useEntriesQuery } from '../hooks/useEntriesQuery';

const limit = 6;

export default function Index() {
  const router = useRouter();
  const { preview } = router.query as { preview?: string };
  const isPreviewMode = !!preview;

  const { searchStr, setSearchStr } = useCurrentSearchStr();
  const searchQuery = searchStr ? toSearchQuery(searchStr) : undefined;

  const {
    data: entries,
    fetchNextPage,
    isFetching,
  } = useEntriesQuery({ searchQuery, limit });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    fetchNextPage();
  }, [inView, fetchNextPage]);

  return (
    <>
      <Head>
        <title>manuscript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {entries && (
        <PostList
          entries={entries.pages.flat()}
          searchStr={searchStr}
          searchQuery={searchQuery}
          onSearch={({ searchStr }) => setSearchStr(searchStr)}
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
