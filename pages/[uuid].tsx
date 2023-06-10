import { Box, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQueryClient, InfiniteData } from 'react-query';
import { ArticlePage } from '../components/ArticlePage';
import { Preview } from '../components/Preview';
import { Entry } from '../domain/Entry';
import { queryKeys } from '../domain/queryKeys';
import { useCurrentSearch } from '../hooks/useCurrentSearch';
import { trpc } from '../infra/trpc';

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

  const { data: entry } = trpc.useQuery(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ['getEntry', { uuid: uuid! /* non-null because enabled */ }],
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
  const { data: tagList } = trpc.useQuery(['getTagList']);
  const { mutate: mutateDelete } = trpc.useMutation(['deleteEntry']);
  const { mutate: mutateUpdate, isLoading: isUpdateLoading } = trpc.useMutation(
    ['updateEntry'],
    {
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries(queryKeys.entry(variables.entry.uuid));
        queryClient.invalidateQueries(
          queryKeys.entries({ limit, ...searchQuery })
        );
      },
    }
  );

  return (
    <>
      <Head>
        <title>manuscript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isPreview && (
        <Box bg={useColorModeValue('gray.100', 'gray.700')}>
          {entry && (
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
          )}
        </Box>
      )}
      {isPreview && entry && <Preview entry={entry} />}
    </>
  );
}
