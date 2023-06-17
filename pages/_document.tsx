import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { theme } from '../components/theme';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
