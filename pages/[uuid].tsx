import { Box, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { ArticlePage } from '../components/ArticlePage';
import { Preview } from '../components/Preview';
import {
  useDeleteEntryMutation,
  useUpdateEntryMutation,
  useTagListQuery,
} from '../domain/entryUseCase';
import { useEntryQuery } from '../hooks/useEntryQuery';

export default function Article() {
  const router = useRouter();
  const { uuid: lowerUUID, preview } = router.query as {
    uuid?: string;
    preview?: string;
  };
  const uuid = lowerUUID?.toUpperCase();
  const isPreview = !!preview;

  const queryClient = useQueryClient();
  const { data: entry } = useEntryQuery({ uuid });
  const { data: tagList } = useTagListQuery();
  const { mutate: mutateDelete } = useDeleteEntryMutation(queryClient);
  const { mutate: mutateUpdate, isLoading: isUpdateLoading } =
    useUpdateEntryMutation(queryClient);

  return (
    <>
      {!isPreview && (
        <Box bg={useColorModeValue('gray.100', 'gray.700')}>
          <Head>
            <title>manuscript</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
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
