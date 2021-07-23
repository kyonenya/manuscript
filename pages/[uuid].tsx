import { Box, useColorModeValue } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Article } from '../components/Article';
import { Preview } from '../components/Preview';
import { useDeleteEntry } from '../hooks/useDeleteEntry';
import { useGetEntry } from '../hooks/useGetEntry';
import { useUpdateEntry } from '../hooks/useUpdateEntry';
import { selectTagList } from '../infra/entryRepository';

export default function ArticlePage(props: { tagList: string[] }) {
  const router = useRouter();
  const { uuid, preview } = router.query as { uuid?: string; preview?: string };
  const { data: entry } = useGetEntry({ uuid });
  const { mutate: mutateDelete } = useDeleteEntry({ uuid });
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
              tagList={props.tagList}
              onUpdate={({ createdAt, tags }) =>
                mutateUpdate({ ...entry, createdAt, tags })
              }
              onDelete={mutateDelete}
              isLoading={isUpdateLoading}
            />
          )}
        </Box>
      )}
      {isPreview && entry && <Preview entry={entry} />}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tagList = await selectTagList();
  return { props: { tagList } };
};
