import { notFound } from 'next/navigation';
import { extractTagHistory } from '../../../domain/Entry';
import { sampleEntries } from '../../../domain/sampleEntries';
import { Article } from '../../[uuid]/Article';
import { ArticleHeader } from '../../[uuid]/ArticleHeader';

export default async function DemoArticlePage(props: {
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
