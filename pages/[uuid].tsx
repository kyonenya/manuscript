import { Box, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { Article } from '../components/Article';
import { Preview } from '../components/Preview';
import {
  useDeleteEntryMutation,
  useUpdateEntryMutation,
  useTagListQuery,
} from '../domain/entryUseCase';
import { useEntryQuery } from '../hooks/useEntryQuery';

export default function ArticlePage() {
  const router = useRouter();
  const { uuid, preview } = router.query as { uuid: string; preview?: string };
  const isPreview = !!preview;

  const { data: entry } = useEntryQuery({ uuid });
  const { data: tagList } = useTagListQuery();
  const { mutate: mutateDelete } = useDeleteEntryMutation();
  const { mutate: mutateUpdate, isLoading: isUpdateLoading } =
    useUpdateEntryMutation();

  const queryClient = useQueryClient();

  return (
    <>
      {!isPreview && (
        <Box bg={useColorModeValue('gray.100', 'gray.700')}>
          <Head>
            <title>manuscript</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {entry && (
            <Article
              entry={entry}
              tagList={tagList ?? []}
              onUpdate={({ createdAt, tags }) =>
                mutateUpdate(
                  { entry: { ...entry, createdAt, tags } },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries([
                        'entry',
                        { uuid: entry.uuid },
                      ]);
                      queryClient.invalidateQueries('entries');
                    },
                  }
                )
              }
              onDelete={() =>
                mutateDelete(
                  { uuid },
                  {
                    onSuccess: () => {
                      router.push('/');
                      queryClient.invalidateQueries('entries');
                    },
                  }
                )
              }
              isLoading={isUpdateLoading}
            />
          )}
        </Box>
      )}
      {isPreview && entry && <Preview entry={entry} />}
    </>
  );
}
