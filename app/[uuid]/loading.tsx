import { ArticleSkelton } from './Article';
import { ArticleHeaderEmpty } from './ArticleHeader';

export default function ArticleLoading() {
  return (
    <>
      <ArticleHeaderEmpty />
      <ArticleSkelton />
    </>
  );
}
