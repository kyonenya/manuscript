import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient, InfiniteData } from 'react-query';
import { Entry } from '../app/Entry';
import { Article } from '../components/Article';
import { TopHeaderMenu } from '../components/HeaderMenu';

export default function ArticlePage() {
  const router = useRouter();
  const { uuid } = router.query;
  const queryClient = useQueryClient();
  const { data } = useQuery<Entry>(
    ['entry', { uuid }],
    async () => {
      if (!uuid) return;
      const res = await fetch('/api/getEntry', {
        method: 'POST',
        body: JSON.stringify({ uuid }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
      });
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    },
    {
      initialData: queryClient
        .getQueryData<InfiniteData<Entry>>([
          'entries',
          { keyword: queryClient.getQueryData('currentKeyword') },
        ])
        ?.pages.flat()
        .find((entry) => entry.uuid === uuid),
    }
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
