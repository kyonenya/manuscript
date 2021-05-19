import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Entry } from '../app/Entry';
import { Article } from '../components/Article';
import { TopHeaderMenu } from '../components/HeaderMenu';

export default function ArticlePage() {
  const { uuid } = useRouter().query;
  const { data } = useQuery(['entry', { uuid }], () =>
    fetch('/api/getEntry', {
      method: 'POST',
      body: JSON.stringify({ uuid }),
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
