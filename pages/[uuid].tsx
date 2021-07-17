import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Article } from '../components/Article';
import { ArticleHeaderMenu } from '../components/HeaderMenu';
import { useDeleteEntry } from '../hooks/useDeleteEntry';
import { useGetEntry } from '../hooks/useGetEntry';
import { useUpdateEntry } from '../hooks/useUpdateEntry';
import { selectTagList } from '../infra/entryRepository';

export default function ArticlePage(props: { tagList: string[] }) {
  const uuid = useRouter().query.uuid as string | undefined;
  const { data: entry } = useGetEntry({ uuid });
  const { mutate } = useDeleteEntry({ uuid });
  const { mutate: mutateUpdate } = useUpdateEntry();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
      <Head>
        <title>manuscript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {entry && (
        <ArticleHeaderMenu
          entry={entry}
          tagList={props.tagList}
          onUpdate={({ createdAt, tags }) =>
            mutateUpdate({ ...entry, createdAt, tags })
          }
          onDelete={mutate}
        />
      )}
      <Container maxW="3xl" px={0} py={4}>
        {entry && <Article entry={entry} />}
      </Container>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const tagList = await selectTagList();
  return { props: { tagList } };
};
