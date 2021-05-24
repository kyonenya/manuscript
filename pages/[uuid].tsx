import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Article } from '../components/Article';
import { TopHeaderMenu } from '../components/HeaderMenu';
import { useGetEntry } from '../hooks/useGetEntry';

export default function ArticlePage() {
  const uuid = useRouter().query.uuid as string | undefined;
  const { data } = useGetEntry({ uuid });

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
      <Head>
        <title>manuscript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopHeaderMenu
        // TODO: replace header type
        onSearch={({ keyword }) => null}
      />
      <Container maxW="3xl" px={0} py={4}>
        {data && <Article entry={data} />}
      </Container>
    </Box>
  );
}
