import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { sampleEntries } from '../../domain/Entry';
import { Preview } from '../_components/Preview';
import { Article } from './Article';
import { ArticleHeader } from './ArticleHeader';

export default async function ArticlePage({
  params: { uuid: lowerUUID },
  searchParams,
}: {
  params: { uuid: string };
  searchParams: { preview?: string };
}) {
  const preview = searchParams.preview;

  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const entry = sampleEntries.find(
    (entry) => entry.uuid === lowerUUID.toUpperCase()
  );

  if (!entry) notFound();

  return (
    <>
      {preview && <Preview entry={entry} />}
      {!preview && (
        <>
          <ArticleHeader entry={entry} />
          <Article entry={entry} />
        </>
      )}
    </>
  );
}
