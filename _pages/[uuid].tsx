// @ts-ignore
import { Auth } from '@supabase/ui';
import { useQueryClient, InfiniteData } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Preview } from '../components/Preview';
import { Spinner } from '../components/Spinner';
import { Entry } from '../domain/Entry';
import { queryKeys } from '../domain/queryKeys';
import { trpc } from '../hooks/trpc';
import { useCurrentSearch } from '../hooks/useCurrentSearch';

export default function Article() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { uuid: lowerUUID, preview } = router.query as {
    uuid?: string;
    preview?: string;
  };
  const uuid = lowerUUID?.toUpperCase();
  const isPreview = !!preview;

  const { searchQuery, limit } = useCurrentSearch();

  const { user } = Auth.useUser();

  // @ts-ignore
  const { data: entry } = trpc.getEntry.useQuery(
    { uuid: uuid! /* non-null because enabled */ },
    {
      enabled: !!uuid,
      initialData: queryClient
        .getQueryData<InfiniteData<Entry>>(
          queryKeys.entries({ limit, ...searchQuery })
        )
        ?.pages.flat()
        .find((entry) => entry.uuid === uuid),
    }
  );
  // @ts-ignore
  const { data: tagList } = trpc.getTagList.useQuery();
  // @ts-ignore
  const { mutate: mutateDelete } = trpc.deleteEntry.useMutation();
  const { mutate: mutateUpdate, isLoading: isUpdateLoading } =
    // @ts-ignore
    trpc.updateEntry.useMutation({
      // @ts-ignore
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries(queryKeys.entry(variables.entry.uuid));
        queryClient.invalidateQueries(
          queryKeys.entries({ limit, ...searchQuery })
        );
      },
    });

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);

  if (user == null) {
    return (
      <div className="mt-8 flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>manuscript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isPreview && (
        <div className="bg-gray-100 dark:bg-gray-700">
          {/* {entry && (
            <ArticlePage
              entry={entry}
              tagList={tagList ?? []}
              onUpdate={({ createdAt, tags }) =>
                mutateUpdate({ entry: { ...entry, createdAt, tags } })
              }
              onDelete={() => {
                if (!uuid) return;
                mutateDelete({ uuid }, { onSuccess: () => router.push('/') });
              }}
              isLoading={isUpdateLoading}
            />
          )} */}
        </div>
      )}
      {isPreview && entry && <Preview entry={entry} />}
    </>
  );
}
