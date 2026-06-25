import { cacheTag, updateTag } from 'next/cache';
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

async function getCachedEntry(props: { uuid: string }) {
  'use cache';
  cacheTag(`entry:${props.uuid.toUpperCase()}`);
  return await readOne({ uuid: props.uuid });
}

async function getCachedTagHistory() {
  'use cache';
  cacheTag('tags');
  return await readTagList();
}

export default async function ArticlePage(props: {
  params: Promise<{ uuid: string }>;
}) {
  const { uuid } = await props.params;

  const entry = await getCachedEntry({ uuid });
  if (!entry) notFound();
  const tagHistory = await getCachedTagHistory();

  const updateAction = async (props: { entry: Entry }) => {
    'use server';
    await updateOne(props);
    updateTag('entries');
    updateTag(`entry:${props.entry.uuid.toUpperCase()}`);
    updateTag('tags');
  };

  const deleteAction = async () => {
    'use server';
    await deleteOne({ uuid });
    updateTag('entries');
    updateTag(`entry:${uuid.toUpperCase()}`);
    updateTag('tags');
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
