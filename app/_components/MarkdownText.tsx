import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const customTheme: Record<
  string,
  (props: {
    children?: React.ReactNode;
    [key: string]: unknown;
  }) => React.ReactElement
> = {
  p: (props) => <p className="pb-2 text-justify indent-4">{props.children}</p>,
  h1: (props) => <h1 className="my-4 text-lg">{props.children}</h1>,
  h2: (props) => <h2 className="my-4 text-lg font-normal">{props.children}</h2>,
  h3: (props) => <h3 className="text-md my-3 font-normal">{props.children}</h3>,
  h4: (props) => <h4 className="my-2 text-sm font-normal">{props.children}</h4>,
  blockquote: (props) => (
    <div className="pl-7">
      <blockquote className="my-2 rounded-sm bg-gray-100 px-1 pt-1 dark:bg-gray-700">
        {props.children}
      </blockquote>
    </div>
  ),
  a: ({ children, ...props }) => (
    <a
      {...props}
      className="text-blue-500 hover:text-blue-600 hover:underline dark:text-sky-500 dark:hover:text-sky-400"
    >
      {children}
    </a>
  ),
};

export const MarkdownText = (props: { children: string }) => {
  return (
    <ReactMarkdown components={customTheme} remarkPlugins={[remarkGfm]}>
      {props.children.replaceAll(/\n/g, '\n\n')}
    </ReactMarkdown>
  );
};
