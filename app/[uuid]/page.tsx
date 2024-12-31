import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';
import { Entry, extractTagHistory } from '../../domain/Entry';
import { sampleEntries } from '../../domain/sampleEntries';
import {
  deleteOne,
  readOne,
  readTagList,
  updateOne,
} from '../../infra/entryRepository';
// import { useLoginStatus } from '../_hooks/useLoginStatus';
import { Article } from './Article';
import { ArticleHeader } from './ArticleHeader';

export default async function ArticlePage({
  params: { uuid },
}: {
  params: { uuid: string };
}) {
  // const { isLoggedIn } = await useLoginStatus();
  const isLoggedIn = true;

  const entry = isLoggedIn
    ? await readOne({ uuid })
    : sampleEntries.find((entry) => entry.uuid === uuid.toUpperCase());

  if (!entry) notFound();

  const tagHistory = isLoggedIn
    ? await readTagList()
    : extractTagHistory(sampleEntries);

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

  return (
    <>
      <ArticleHeader
        entry={entry}
        tagHistory={tagHistory}
        updateAction={isLoggedIn ? updateAction : undefined}
        deleteAction={isLoggedIn ? deleteAction : undefined}
      />
      <Article entry={entry} />
    </>
  );
}
