import { ReactNode, ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';

const customTheme: Record<
  string,
  (props: { children: ReactNode }) => ReactElement
> = {
  p: (props) => (
    <p className="pb-2 text-justify" style={{ textIndent: '1em' }}>
      {props.children}
    </p>
  ),
  h1: (props) => <h1 className="py-4 text-lg">{props.children}</h1>,
  h2: (props) => <h2 className="py-4 text-lg font-normal">{props.children}</h2>,
  h3: (props) => <h3 className="text-md py-3 font-normal">{props.children}</h3>,
  h4: (props) => <h4 className="py-2 text-sm font-normal">{props.children}</h4>,
  blockquote: (props) => (
    <div className="pl-8">
      <blockquote className="bg-gray-100 py-2">{props.children}</blockquote>
    </div>
  ),
};

export const MarkdownText = (props: { children: string }) => {
  const text = props.children.replaceAll(/\n/g, '\n\n');

  return <ReactMarkdown components={customTheme}>{text}</ReactMarkdown>;
};
