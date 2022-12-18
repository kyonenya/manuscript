import { Box, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ArticlePage } from '../components/ArticlePage';
import { Preview } from '../components/Preview';
import { trpc } from '../infra/trpc';
import { queryKeys } from '../domain/queryKeys';
import { Entry } from '../domain/Entry';
import { useQueryClient, InfiniteData } from 'react-query';

export default function Article() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { uuid: lowerUUID, preview } = router.query as {
    uuid?: string;
    preview?: string;
  };
  const uuid = lowerUUID?.toUpperCase();
  const isPreview = !!preview;

  const { data: entry } = trpc.useQuery(
    ['getEntry', { uuid: uuid! /* non-null because enabled */ }],
    {
      enabled: !!uuid,
      initialData: queryClient
        .getQueryData<InfiniteData<Entry>>(
          queryKeys.searchedEntries({
            keyword: queryClient.getQueryData(queryKeys.currentSearch),
          })
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
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries(queryKeys.entry(variables.entry.uuid));
        queryClient.invalidateQueries(queryKeys.entries);
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
