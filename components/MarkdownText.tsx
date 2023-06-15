/* eslint-disable react/display-name */
import { ReactNode, ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';

const customTheme: Record<
  string,
  (props: { children: ReactNode }) => ReactElement
> = {
  p: (props) => (
    <p className="text-justify pb-2" style={{ textIndent: '1em' }}>
      {props.children}
    </p>
  ),
  h1: (props) => <h1 className="text-lg py-4">{props.children}</h1>,
  h2: (props) => <h2 className="text-lg font-normal py-4">{props.children}</h2>,
  h3: (props) => <h3 className="text-md font-normal py-3">{props.children}</h3>,
  h4: (props) => <h4 className="text-sm font-normal py-2">{props.children}</h4>,
  blockquote: (props) => (
    <div className="pl-8">
      <blockquote className="py-2 bg-gray-100">{props.children}</blockquote>
    </div>
  ),
};

export const MarkdownText = (props: { children: string }) => {
  const text = props.children.replaceAll(/\n/g, '\n\n');

  return <ReactMarkdown components={customTheme}>{text}</ReactMarkdown>;
};
