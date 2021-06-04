/* eslint-disable react/display-name */
import { Text } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';

const customTheme = {
  p: (props: { children: ReactNode }) => (
    <Text align="justify" mb={2}>
      {props.children}
    </Text>
  ),
};

export const MarkdownText = (props: { children: string }) => {
  return (
    <ReactMarkdown components={ChakraUIRenderer(customTheme)}>
      {props.children}
    </ReactMarkdown>
  );
};