import { GetStaticProps } from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Entry } from '../app/Entry';
import { readMany } from '../app/entryRepository';
import { PostList } from '../components/PostList';
import { TopHeaderMenu } from '../components/HeaderMenu';

export default function Index(props: { entries: Entry[] }) {
  const { data } = useQuery(['search', { keyword: '演技' }], () =>
    fetcher(`/api/search?q=${encodeURIComponent('演技')}&limit=3`)
  );
  const fetcher = (url: string) =>
    fetch(url, {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
    }).then((res) => res.json());

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
      <Head>
        <title>manuscript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopHeaderMenu />
      <Container maxW="4xl" py={4}>
        {data && <PostList entries={data} />}
      </Container>
    </Box>
  );
}

export const getStaticProps: GetStaticProps<{
  entries: Entry[];
}> = async () => {
  const entries = await readMany({ limit: 4 });
  return {
    props: { entries: entries },
  };
};
