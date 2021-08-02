import {
  Box,
  Container,
  Heading,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { Auth } from '@supabase/ui';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PostList } from '../components/PostList';
import { newSearchQuery } from '../domain/SearchQuery';
import { useCurrentSearchStr } from '../hooks/useCurrentSearchStr';
import { useEntriesQuery } from '../hooks/useEntriesQuery';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { supabase } from '../infra/supabase';

const limit = 20;

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
        <Heading as="h2" size="lg">
          Sign in manuscript
        </Heading>
        <Auth
          supabaseClient={supabase}
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
      <Box minHeight="100vh" bg={useColorModeValue('gray.100', 'gray.700')}>
        <PostList
          entries={entries?.pages.flat()}
          searchStr={searchStr}
          searchQuery={searchQuery}
          isPreviewMode={isPreviewMode}
          onSearch={({ searchStr }) => setSearchStr(searchStr)}
          onSignOut={() => supabase.auth.signOut()}
        />
        <Box align="center" ref={scrollerRef}>
          {!isPreviewMode && isFetching && (
            <Spinner emptyColor="gray.300" speed="0.65s" />
          )}
        </Box>
      </Box>
    </>
  );
}
