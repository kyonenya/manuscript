import { Auth } from '@supabase/ui';
import { useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PostListPage } from '../components/PostListPage';
import { Spinner } from '../components/Spinner';
import { queryKeys } from '../domain/queryKeys';
import { trpc } from '../hooks/trpc';
import { useCurrentSearch } from '../hooks/useCurrentSearch';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { entriesQueue } from '../infra/queue';
import { supabase } from '../infra/supabase';

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
  } = trpc.getEntries.useInfiniteQuery(
    { limit, ...searchQuery },
    {
      getNextPageParam: (lastPage, pages) => pages.length,
    }
  );

  const { mutate: mutateDeleteAll } = trpc.deleteAllEntries.useMutation({
    onSuccess: () =>
      queryClient.invalidateQueries(
        queryKeys.entries({ limit, ...searchQuery })
      ),
  });
  const {
    mutate: mutateCreate,
    isSuccess: isCreated,
    isLoading: isCreating,
  } = trpc.createEntries.useMutation({
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

  // if (!user) {
  //   return (
  //     <div className="max-w-3xl py-6">
  //       <h2 className="text-2xl font-bold">Sign in manuscript</h2>
  //       <Auth
  //         supabaseClient={supabase}
  //         view="sign_in"
  //         socialLayout="horizontal"
  //         socialButtonSize="xlarge"
  //       />
  //     </div>
  //   );
  // }

  return (
    <>
      <Head>
        <title>manuscript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
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
        <div className="flex justify-center" ref={scrollerRef}>
          {!isPreviewMode && isFetching && <Spinner />}
        </div>
      </div>
    </>
  );
}
