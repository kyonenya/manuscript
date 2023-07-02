import { ArticleSkelton } from './Article';
import { ArticleHeader, ArticleHeaderEmpty } from './ArticleHeader';

export default function Loading() {
  return (
    <>
      <ArticleHeaderEmpty />
      <ArticleSkelton />
    </>
  );
}
