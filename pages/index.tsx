import { Box, Container, Flex, Heading, Spinner } from '@chakra-ui/react';
import { Auth } from '@supabase/ui';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PostListPage } from '../components/PostListPage';
import { newSearchQuery } from '../domain/SearchQuery';
import {
  useCurrentSearchStr,
  useEntriesQuery,
  useCreateEntriesMutation,
  useDeleteAllEntriesMutation,
} from '../domain/entryUseCase';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { supabase } from '../infra/supabase';

const limit = 40;

export default function Index() {
  const router = useRouter();
  const { preview } = router.query as { preview?: string };
  const isPreviewMode = !!preview;

  const { user } = Auth.useUser();

  const { searchStr, setSearchStr } = useCurrentSearchStr();
  const searchQuery = searchStr ? newSearchQuery(searchStr) : undefined;
  const {
    data: entries,
    fetchNextPage,
    isFetching,
  } = useEntriesQuery({ searchQuery, limit });
  const { mutate: mutateDeleteAll } = useDeleteAllEntriesMutation();
  const {
    mutate: mutateCreate,
    isSuccess: isCreated,
    isLoading: isCreating,
  } = useCreateEntriesMutation();

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
      <Box minHeight="100vh">
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
