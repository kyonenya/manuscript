import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { Entry, sampleEntries, tagHistory } from '../../domain/Entry';
import {
  deleteOne,
  readOne,
  readTagList,
  updateOne,
} from '../../infra/entryRepository';
import { Article } from './Article';
import { ArticleHeader } from './ArticleHeader';

export default async function ArticlePage({
  params: { uuid },
}: {
  params: { uuid: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const isLoggedIn = !!session;

  const updateAction = async (props: { entry: Entry }) => {
    'use server';
    await updateOne(props);
    revalidatePath(`/${uuid}`);
    revalidatePath('/');
  };

  const deleteAction = async () => {
    'use server';
    await deleteOne({ uuid });
    revalidatePath('/');
    redirect('/');
  };

  const entry = isLoggedIn
    ? await readOne({ uuid })
    : sampleEntries.find((entry) => entry.uuid === uuid.toUpperCase());

  if (!entry) notFound();

  const tagList = isLoggedIn ? await readTagList() : tagHistory(sampleEntries);

  return (
    <>
      <ArticleHeader
        entry={entry}
        tagList={tagList}
        updateAction={isLoggedIn ? updateAction : undefined}
        deleteAction={isLoggedIn ? deleteAction : undefined}
      />
      <Article entry={entry} />
    </>
  );
}
