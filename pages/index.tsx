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
import { PostListItem } from '../components/PostListItem';
import { TopHeaderMenu } from '../components/HeaderMenu';

export default function Index(props: { entries: Entry[] }) {
  const entry1 = new Entry({
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.',
    tags: ['タグ'],
  });
  const entry2 = new Entry({
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor neque sed imperdiet nibh lectus feugiat nunc sem.',
    tags: null,
  });

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
      <Head>
        <title>manuscript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopHeaderMenu />
      <Container
        maxW="4xl"
        py={4}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, lg: 8 }}>
          <PostListItem entry={props.entries[0]} />
          <PostListItem entry={props.entries[1]} />
          <PostListItem entry={props.entries[2]} />
          <PostListItem entry={entry1} />
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const entries = await selectAll({ limit: 4 });
  return {
    props: { entries: JSON.parse(JSON.stringify(entries)) },
  };
};
