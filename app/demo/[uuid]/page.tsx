import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { extractTagHistory } from '../../../domain/Entry';
import { sampleEntries } from '../../../domain/sampleEntries';
import { Article, ArticleSkelton } from '../../[uuid]/Article';
import { ArticleHeader, ArticleHeaderEmpty } from '../../[uuid]/ArticleHeader';

export default function DemoArticlePage(props: {
  params: Promise<{ uuid: string }>;
}) {
  return (
    <Suspense
      fallback={
        <>
          <ArticleHeaderEmpty />
          <ArticleSkelton />
        </>
      }
    >
      <DemoArticleContent params={props.params} />
    </Suspense>
  );
}

async function DemoArticleContent(props: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await props.params;
  const isDemoMode = true;

  const entry = sampleEntries.find(
    (entry) => entry.uuid === uuid.toUpperCase(),
  );
  if (!entry) notFound();

  const tagHistory = extractTagHistory(sampleEntries);

  return (
    <>
      <ArticleHeader
        entry={entry}
        tagHistory={tagHistory}
        isDemoMode={isDemoMode}
      />
      <Article entry={entry} isDemoMode={isDemoMode} />
    </>
  );
}
