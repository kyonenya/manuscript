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
  const { data, error } = useQuery(['search', { keyword: '演技' }], () =>
    fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({
        keyword: '演技',
        limit: 5,
        //        offset: 5,
      }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
    }).then((res) => res.json())
  );

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
