import { updateTag } from 'next/cache';
import { notFound, redirect } from 'next/navigation';
import { connection } from 'next/server';
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
  await connection();
  const { uuid } = await props.params;

  const entry = await readOne({ uuid });
  if (!entry) notFound();
  const tagHistory = await readTagList();

  const updateAction = async (props: { entry: Entry }) => {
    'use server';
    await updateOne(props);
    updateTag('entry');
  };

  const deleteAction = async () => {
    'use server';
    await deleteOne({ uuid });
    updateTag('entry');
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
