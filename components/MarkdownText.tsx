/* eslint-disable react/display-name */
import { Text } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';

const customeTheme = {
  p: (props: { children: ReactNode }) => (
    <Text align="justify" mb={2}>
      {props.children}
    </Text>
  ),
};

export const MarkdownText = (props: { children: ReactNode }) => {
  return (
    <ReactMarkdown components={ChakraUIRenderer(customeTheme)}>
      {props.children}
    </ReactMarkdown>
  );
};
