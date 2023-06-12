import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import { Auth } from '@supabase/ui';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { PostListPage } from '../components/PostListPage';
import { Spinner } from '../components/Spinner';
import { queryKeys } from '../domain/queryKeys';
import { useCurrentSearch } from '../hooks/useCurrentSearch';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { entriesQueue } from '../infra/queue';
import { supabase } from '../infra/supabase';
import { trpc } from '../infra/trpc';

export default function Index() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { preview } = router.query as { preview?: string };
  const isPreviewMode = !!preview;

  const { user } = Auth.useUser();

  const { searchStr, setSearchStr, searchQuery, limit } = useCurrentSearch();

  const {
    data: entries,
    fetchNextPage,
    isFetching,
  } = trpc.useInfiniteQuery(['getEntries', { limit, ...searchQuery }], {
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  const { mutate: mutateDeleteAll } = trpc.useMutation(['deleteAllEntries'], {
    onSuccess: () =>
      queryClient.invalidateQueries(
        queryKeys.entries({ limit, ...searchQuery })
      ),
  });
  const {
    mutate: mutateCreate,
    isSuccess: isCreated,
    isLoading: isCreating,
  } = trpc.useMutation(['createEntries'], {
    onSuccess: () =>
      queryClient.invalidateQueries(
        queryKeys.entries({ limit, ...searchQuery })
      ),
  });

  const { scrollerRef } = useInfiniteScroll({ onScroll: fetchNextPage });

  const onImport = async (input: Parameters<typeof mutateCreate>[0]) => {
    await entriesQueue({
      func: mutateCreate,
      entries: input.entries,
      each: 300,
      concurrency: 4,
    });
    await queryClient.invalidateQueries(
      queryKeys.entries({ limit, ...searchQuery })
    );
  };

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
          onImport={onImport}
          onDeleteAll={mutateDeleteAll}
        />
        <Flex justifyContent="center" ref={scrollerRef}>
          {!isPreviewMode && isFetching && <Spinner />}
        </Flex>
      </Box>
    </>
  );
}
