import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const customTheme: Record<
  string,
  (props: {
    children?: React.ReactNode;
    [key: string]: unknown;
  }) => React.ReactElement
> = {
  p: (props) => (
    <p className="pb-2 text-justify indent-0 [p+&]:indent-4">
      {props.children}
    </p>
  ),
  h1: (props) => <h1 className="my-4 text-lg">{props.children}</h1>,
  h2: (props) => <h2 className="my-4 text-lg font-normal">{props.children}</h2>,
  h3: (props) => <h3 className="text-md my-3 font-normal">{props.children}</h3>,
  h4: (props) => <h4 className="my-2 text-sm font-normal">{props.children}</h4>,
  blockquote: (props) => (
    <blockquote className="my-4 ml-2 border-l-4 border-gray-300 pl-3 dark:border-gray-600 [&_p]:mx-0 [&_p]:pb-0 [&_p+p]:indent-0">
      {props.children}
    </blockquote>
  ),
  a: ({ children, ...props }) => (
    <a
      {...props}
      className="text-blue-500 hover:text-blue-600 hover:underline dark:text-sky-500 dark:hover:text-sky-400"
    >
      {children}
    </a>
  ),
  hr: () => (
    <hr className="mx-auto my-4 w-3/5 border-gray-300 dark:border-gray-600" />
  ),
  ul: (props) => (
    <ul className="ml-1 list-disc py-2 pl-6 [&>li>p]:pb-0.5 [&>li>p]:indent-0">
      {props.children}
    </ul>
  ),
};

export const MarkdownText = (props: { children: string }) => {
  return (
    <ReactMarkdown components={customTheme} remarkPlugins={[remarkGfm]}>
      {props.children.replaceAll(/\n/g, '\n\n')}
    </ReactMarkdown>
  );
};
