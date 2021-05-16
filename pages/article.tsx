import { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import {
  Box,
  Container,
  IconButton,
  SimpleGrid,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Article } from '../components/Article';
import { TopHeaderMenu } from '../components/HeaderMenu';

export default function () {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
      <Head>
        <title>manuscript</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopHeaderMenu
        // TODO: replace header
        onSearch={({ keyword }) => null}
      />
      <Container maxW="3xl" px={0} py={4}>
        <Article />
      </Container>
    </Box>
  );
}
