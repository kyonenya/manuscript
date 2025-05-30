'use cache';
import { revalidateTag } from 'next/cache';
import { notFound, redirect } from 'next/navigation';
import { Entry } from '../../domain/Entry';
import { deleteOne, updateOne } from '../../infra/entryRepository';
import { Article } from './Article';
import { ArticleHeader } from './ArticleHeader';
import { getEntry } from './getEntry';
import { getTagList } from './getTagList';

export default async function ArticlePage(props: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await props.params;

  const entry = await getEntry(uuid);
  if (!entry) notFound();

  const tagHistory = await getTagList();

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
