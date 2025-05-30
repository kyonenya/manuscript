import { revalidateTag, unstable_cache } from 'next/cache';
import { notFound, redirect } from 'next/navigation';
import { Entry } from '../../domain/Entry';
import {
  deleteOne,
  readOne,
  readTagList,
  updateOne,
} from '../../infra/entryRepository';
import { Article } from './Article';
import { ArticleHeader } from './ArticleHeader';

export default async function ArticlePage(props: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await props.params;

  const getCachedEntry = unstable_cache(
    async (uuid: string) => readOne({ uuid }),
    undefined,
    { tags: ['entry'] }
  );
  const getCachedTagList = unstable_cache(
    async () => readTagList(),
    undefined,
    { tags: ['entry'] }
  );

  const entry = await getCachedEntry(uuid);
  if (!entry) notFound();
  const tagHistory = await getCachedTagList();

  const updateAction = async (props: { entry: Entry }) => {
    'use server';
    await updateOne(props);
    revalidateTag('entry');
  };

  const deleteAction = async () => {
    'use server';
    await deleteOne({ uuid });
    revalidateTag('entry');
    redirect('/');
  };

  return (
    <>
      <ArticleHeader
        entry={entry}
        tagHistory={tagHistory}
        updateAction={updateAction}
        deleteAction={deleteAction}
      />
      <Article entry={entry} />
    </>
  );
}
