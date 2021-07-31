import { Box, Container, Spinner } from '@chakra-ui/react';
import { Auth, Card, Typography, Space, Button, Icon } from '@supabase/ui';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PostList } from '../components/PostList';
import { newSearchQuery } from '../domain/SearchQuery';
import { useCurrentSearchStr } from '../hooks/useCurrentSearchStr';
import { useEntriesQuery } from '../hooks/useEntriesQuery';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { supabase } from '../infra/supabase';

const limit = 6;

export default function Index() {
  const router = useRouter();
  const { preview } = router.query as { preview?: string };
  const isPreviewMode = !!preview;

  const { searchStr, setSearchStr } = useCurrentSearchStr();
  const searchQuery = searchStr ? newSearchQuery(searchStr) : undefined;

  const {
    data: entries,
    fetchNextPage,
    isFetching,
  } = useEntriesQuery({ searchQuery, limit });

  const { scrollerRef } = useInfiniteScroll({ onScroll: fetchNextPage });

  const { user } = Auth.useUser();

  if (!user)
    return (
      <Container maxW="3xl" py={{ base: 6 }}>
        <Typography.Title level={3}>Welcome to Supabase Auth</Typography.Title>
        <Auth
          supabaseClient={supabase}
          providers={['github']}
          view="sign_in"
          socialLayout="horizontal"
          socialButtonSize="xlarge"
        />
      </Container>
    );

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
      <Box align="center" ref={scrollerRef}>
        {!isPreviewMode && isFetching && (
          <Spinner emptyColor="gray.300" speed="0.65s" />
        )}
      </Box>
    </>
  );
}
