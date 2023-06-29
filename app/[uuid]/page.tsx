import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { sampleEntries } from '../../domain/Entry';
import { readOne } from '../../infra/entryRepository';
import { Article } from './Article';
import { ArticleHeader } from './ArticleHeader';

export default async function ArticlePage({
  params: { uuid: lowerUUID },
}: {
  params: { uuid: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const entry = session
    ? await readOne({ uuid: lowerUUID })
    : sampleEntries.find((entry) => entry.uuid === lowerUUID.toUpperCase());

  if (!entry) notFound();

  return (
    <>
      <ArticleHeader entry={entry} />
      <Article entry={entry} />
    </>
  );
}
