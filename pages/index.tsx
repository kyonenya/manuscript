import { GetStaticProps } from 'next';
import Head from 'next/head';
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Entry } from '../app/Entry';
import { selectAll } from '../app/entryRepository';
import { PostList } from '../components/PostList';
import { TopHeaderMenu } from '../components/HeaderMenu';

export default function Index(props: { entries: Entry[] }) {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
      <Head>
        <title>manuscript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopHeaderMenu />
      <Container maxW="4xl" py={4}>
        <PostList entries={props.entries} />
      </Container>
    </Box>
  );
}

export const getStaticProps: GetStaticProps<{
  entries: Entry[];
}> = async () => {
  const entries = await selectAll({ limit: 4 });
  return {
    props: { entries: entries },
  };
};
