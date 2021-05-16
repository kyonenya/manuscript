import { Box, Container, useColorModeValue } from '@chakra-ui/react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { Entry } from '../app/Entry';
import { Article } from '../components/Article';
import { TopHeaderMenu } from '../components/HeaderMenu';
import { readOne } from '../infra/entryRepository';

export default function ArticlePage(props: { entry: Entry }) {
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
        <Article entry={props.entry} />
      </Container>
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], // TODO: pre-render latest 30 entries
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<{
  entry: Entry;
}> = async ({ params }) => {
  // 2A730682029A4BBC9D2AB1CB120E7940
  const uuid = params?.uuid as string;
  const entry = await readOne({ uuid });
  return {
    props: { entry },
  };
};
