import { Box, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Article } from '../components/Article';
import { Preview } from '../components/Preview';
import { useDeleteEntry } from '../hooks/useDeleteEntry';
import { useGetEntry } from '../hooks/useGetEntry';
import { useTagListQuery } from '../hooks/useTagListQuery';
import { useUpdateEntry } from '../hooks/useUpdateEntry';

export default function ArticlePage() {
  const router = useRouter();
  const { uuid, preview } = router.query as { uuid: string; preview?: string };
  const { data: entry } = useGetEntry({ uuid });
  const { data: tagList } = useTagListQuery();
  const { mutate: mutateDelete } = useDeleteEntry();
  const { mutate: mutateUpdate, isLoading: isUpdateLoading } = useUpdateEntry();

  const isPreview = !!preview;

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
                mutateUpdate({ ...entry, createdAt, tags })
              }
              onDelete={() => mutateDelete({ uuid })}
              isLoading={isUpdateLoading}
            />
          )}
        </Box>
      )}
      {isPreview && entry && <Preview entry={entry} />}
    </>
  );
}
