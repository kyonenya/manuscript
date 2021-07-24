import { Box, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Article } from '../components/Article';
import { Preview } from '../components/Preview';
import { useDeleteEntryMutation } from '../hooks/useDeleteEntryMutation';
import { useEntryQuery } from '../hooks/useEntryQuery';
import { useTagListQuery } from '../hooks/useTagListQuery';
import { useUpdateEntryMutation } from '../hooks/useUpdateEntryMutation';

export default function ArticlePage() {
  const router = useRouter();
  const { uuid, preview } = router.query as { uuid: string; preview?: string };
  const { data: entry } = useEntryQuery({ uuid });
  const { data: tagList } = useTagListQuery();
  const { mutate: mutateDelete } = useDeleteEntryMutation();
  const { mutate: mutateUpdate, isLoading: isUpdateLoading } =
    useUpdateEntryMutation();

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
