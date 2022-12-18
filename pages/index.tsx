import { Box, Container, Flex, Heading, Spinner } from '@chakra-ui/react';
import { Auth } from '@supabase/ui';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PostListPage } from '../components/PostListPage';
import { newSearchQuery } from '../domain/SearchQuery';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useCurrentSearchStr } from '../hooks/useCurrentSearchStr';
import { supabase } from '../infra/supabase';
import { trpc } from '../infra/trpc';

const limit = 40;

export default function Index() {
  const router = useRouter();
  const { preview } = router.query as { preview?: string };
  const isPreviewMode = !!preview;

  const { user } = Auth.useUser();

  const { searchStr, setSearchStr } = useCurrentSearchStr();
  const searchQuery = searchStr ? newSearchQuery(searchStr) : undefined;
  console.log(searchQuery);
  const {
    data: entries,
    fetchNextPage,
    isFetching,
  } = trpc.useInfiniteQuery(['getEntries', { limit, ...searchQuery }], {
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  const { mutate: mutateDeleteAll } = trpc.useMutation(['deleteAllEntries']);
  const {
    mutate: mutateCreate,
    isSuccess: isCreated,
    isLoading: isCreating,
  } = trpc.useMutation(['createEntries']);

  const { scrollerRef } = useInfiniteScroll({ onScroll: fetchNextPage });

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
      <Box>
        <PostListPage
          entries={entries?.pages.flat()}
          searchStr={searchStr}
          searchQuery={searchQuery}
          isPreviewMode={isPreviewMode}
          isImported={isCreated}
          isImporting={isCreating}
          onSearch={({ searchStr }) => setSearchStr(searchStr)}
          onSignOut={() => supabase.auth.signOut()}
          onImport={mutateCreate}
          onDeleteAll={mutateDeleteAll}
        />
        <Flex justifyContent="center" ref={scrollerRef}>
          {!isPreviewMode && isFetching && (
            <Spinner emptyColor="gray.300" speed="0.65s" />
          )}
        </Flex>
      </Box>
    </>
  );
}
