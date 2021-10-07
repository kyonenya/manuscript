/* eslint-disable react/display-name */
import { Box, Heading, Text } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';

const customTheme = {
  p: (props: { children: ReactNode }) => (
    <Text align="justify" pb={2} style={{ textIndent: '1em' }}>
      {props.children}
    </Text>
  ),
  h1: (props: { children: ReactNode }) => (
    <Heading as="h1" size="lg" py={4}>
      {props.children}
    </Heading>
  ),
  h2: (props: { children: ReactNode }) => (
    <Heading as="h2" size="lg" fontWeight="normal" py={4}>
      {props.children}
    </Heading>
  ),
  h3: (props: { children: ReactNode }) => (
    <Heading as="h3" size="md" fontWeight="normal" py={3}>
      {props.children}
    </Heading>
  ),
  h4: (props: { children: ReactNode }) => (
    <Heading as="h4" size="sm" fontWeight="normal" py={2}>
      {props.children}
    </Heading>
  ),
  blockquote: (props: { children: ReactNode }) => (
    <Box pl="2em">
      <Text as="blockquote" py="0.5em" background="gray.100">
        {props.children}
      </Text>
    </Box>
  ),
};

export const MarkdownText = (props: { children: string }) => {
  const text = props.children.replaceAll(/\n/g, '\n\n');

  return (
    <ReactMarkdown components={ChakraUIRenderer(customTheme)}>
      {text}
    </ReactMarkdown>
  );
};
